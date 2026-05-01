import PocketBase from "pocketbase";

const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://tioras.pockethost.io"
);

// Disable auto-cancellation for concurrent requests
pb.autoCancellation(false);

// Optional: Health check to debug connection in browser console
if (typeof window !== "undefined") {
  pb.collection("users").getList(1, 1)
    .then(() => console.log("✅ PocketBase Connected Successfully"))
    .catch((err) => console.warn("⚠️ PocketBase Connection Warning:", err.message));
}

export default pb;
