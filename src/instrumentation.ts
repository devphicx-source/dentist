export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL;

    if (RENDER_URL) {
      console.log(`[Anti-Sleep] Initializing keep-alive for ${RENDER_URL}`);
      
      const ping = async () => {
        try {
          const response = await fetch(`${RENDER_URL}/api/ping`);
          if (response.ok) {
            console.log(`[Anti-Sleep] Ping successful: ${new Date().toISOString()}`);
          } else {
            console.warn(`[Anti-Sleep] Ping failed (Status ${response.status}): ${new Date().toISOString()}`);
          }
        } catch (error) {
          console.error("[Anti-Sleep] Ping error:", error instanceof Error ? error.message : error);
        }
      };

      // Initial ping on startup
      ping();

      // Recurring ping every 10 minutes
      setInterval(ping, PING_INTERVAL);
    } else {
      console.warn("[Anti-Sleep] RENDER_EXTERNAL_URL not set. Keep-alive disabled.");
    }
  }
}
