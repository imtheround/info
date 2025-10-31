export default {
  default: {
    runtime: "cloudflare",
    // 這是為了解決 undefined.includes 的必要配置
    // open-next 3.x 會在 validateConfig 裡面檢查 converter 與 wrapper 的相容性
    // 給它一個明確的設定可以避免 crash
    function: {
      wrapper: "cloudflare",   // 告訴 open-next 你使用 Cloudflare runtime
      converter: "default"     // 指定轉換器，預設即可
    }
  },
};
