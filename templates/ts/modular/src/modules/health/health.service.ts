
export const healthCheck = () => {
  return {
    status: "ok",
    uptime: process.uptime(),
    message: "Service is healthy",
    timestamp: new Date().toISOString(),
  };
}