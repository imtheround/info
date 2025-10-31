
export default {
  default: {
    runtime: "cloudflare",
    function: {
      // valid wrappers: "aws", "cloudflare", "vercel"
      wrapper: "cloudflare",
      // valid converters: "default", "edge", etc.
      converter: "default"
    }
  }
};
