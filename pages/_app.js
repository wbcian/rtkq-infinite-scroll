import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  // Initialize MSW server in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Server-side rendering won't need MSW
      if (typeof window === 'undefined') return
      
      const startMsw = async () => {
        try {
          if (typeof window !== 'undefined') {
            const { worker } = await import('../lib/api/browser')
            if (worker) {
              worker.start({
                onUnhandledRequest: 'bypass', // Don't warn for unhandled requests
              })
              console.log('[MSW] Mock Service Worker started')
            }
          }
        } catch (error) {
          console.error('[MSW] Failed to start:', error)
        }
      }
      
      startMsw()
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp