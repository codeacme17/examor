import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { profileHandler } from '@/lib/db-handler'
import type { Metadata } from 'next'
import './globals.css'

import NextTopLoader from 'nextjs-toploader'
import { ThemeProvider } from '@/components/theme-provider'
import { ResizePanel } from '@/components/layout/resize-panel'
import { Toaster } from '@/components/ui/toaster'

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
  await profileHandler.init()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css"
        />
      </head>

      <body className={cn(poppins.className, 'min-h-screen')}>
        <NextTopLoader
          color="hsl(var(--foreground))"
          showAtBottom={true}
          showSpinner={false}
          crawl={false}
          shadow={false}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem>
          <ResizePanel>{children}</ResizePanel>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
