import { useEffect } from "react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Initialize MSW server in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // Server-side rendering won't need MSW
      if (typeof window === "undefined") return;

      const startMsw = async (): Promise<void> => {
        try {
          if (typeof window !== "undefined") {
            const { worker } = await import("../lib/api/browser");
            if (worker) {
              worker.start({
                onUnhandledRequest: "bypass" // Don't warn for unhandled requests
              });
              console.log("[MSW] Mock Service Worker started");
            }
          }
        } catch (error) {
          console.error("[MSW] Failed to start:", error);
        }
      };

      startMsw();
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
