import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Exx Network</title>
      </head>
      <body className={inter.className}>
        <div className='flex h-full'>
          <div className='hidden sm:block '>
            <Sidebar />
          </div>
          <div className='h-full w-full'>
            <Navbar />
            <div>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
