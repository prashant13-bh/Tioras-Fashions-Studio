import PocketBase from "pocketbase";

const url = process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://tioras.pockethost.io";

// Use default store for users, but a named store for admins to avoid session collision
const pb = new PocketBase(url);
const adminPb = new PocketBase(url);

// In a browser environment, we can set custom keys for the LocalAuthStore if needed, 
// but for now, having two instances will at least keep them separate in memory during the session.
// To truly separate them in LocalStorage:
if (typeof window !== "undefined") {
  // We can manually set the storage key for one of them
  adminPb.authStore.save(adminPb.authStore.token, adminPb.authStore.model);
  // However, the simplest way is to just use two different PB instances and let the dev decide if they want persistence.
}

// Disable auto-cancellation
pb.autoCancellation(false);
adminPb.autoCancellation(false);

// Health check
if (typeof window !== "undefined") {
  pb.collection("users").getList(1, 1)
    .then(() => console.log("✅ User PocketBase Connected"))
    .catch((err) => console.warn("⚠️ User PB Warning:", err.message));
    
  // Admin store is separate, it won't have a valid model initially
}

export { pb, adminPb };
export default pb;
