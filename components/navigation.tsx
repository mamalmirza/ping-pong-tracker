'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/useAuth'

const publicNavigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Leaderboard', href: '/leaderboard' },
]

const adminNavigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Games', href: '/games' },
  { name: 'Players', href: '/players' },
  { name: 'Leaderboard', href: '/leaderboard' },
]

export function Navigation() {
  const pathname = usePathname()
  const { isAuthenticated, isLoading, logout } = useAuth()

  const navigation = isAuthenticated ? adminNavigation : publicNavigation

  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🏓 Ping Pong Tracker
              </h1>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                🏓 Ping Pong Tracker
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated && pathname !== '/login' && (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
