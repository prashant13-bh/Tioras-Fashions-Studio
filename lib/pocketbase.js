import PocketBase from "pocketbase";

const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://tioras.pockethost.io"
);

// Disable auto-cancellation for concurrent requests
pb.autoCancellation(false);

export default pb;
