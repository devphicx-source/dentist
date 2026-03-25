export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL;

    if (RENDER_URL) {
      console.log(`[Anti-Sleep] Starting self-ping interval for ${RENDER_URL}`);
      
      setInterval(async () => {
        try {
          const response = await fetch(`${RENDER_URL}/api/ping`);
          if (response.ok) {
            console.log(`[Anti-Sleep] Self-ping successful: ${new Date().toISOString()}`);
          } else {
            console.warn(`[Anti-Sleep] Self-ping failed with status: ${response.status}`);
          }
        } catch (error) {
          console.error("[Anti-Sleep] Error during self-ping:", error);
        }
      }, PING_INTERVAL);
    } else {
      console.warn("[Anti-Sleep] RENDER_EXTERNAL_URL not found. Self-ping disabled.");
    }
  }
}
