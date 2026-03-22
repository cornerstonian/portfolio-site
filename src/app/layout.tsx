import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lavoisier Cornerstone | Systems & Infrastructure',
  description: 'IT professional specializing in systems administration, cloud infrastructure, and network operations. Security+, AZ-900, Google IT certified.',
  keywords: ['sysadmin', 'IT', 'cloud', 'Azure', 'AWS', 'Active Directory', 'ServiceNow', 'CCNA'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
