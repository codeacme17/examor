import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { profileHandler } from '@/lib/db-handler'
import type { Metadata } from 'next'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { ResizePanel } from '@/components/layout/resize-panel'

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: ['system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'examor | self-improvement',
  description:
    'For students, scholars, interviewees and lifelong learners. Let LLMs assist you in learning 🎓',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const profile = await profileHandler.init()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css"
        />
      </head>

      <body className={cn(poppins.className, 'min-h-screen')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem>
          <ResizePanel>{children}</ResizePanel>
        </ThemeProvider>
      </body>
    </html>
  )
}
