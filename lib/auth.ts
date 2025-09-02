import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin-auth')
  return authCookie?.value === 'true'
}

export async function authenticate(password: string): Promise<boolean> {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return true
  }
  return false
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin-auth')
}

export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    redirect('/login')
  }
}
