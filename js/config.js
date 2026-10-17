/* ==========================================================
   サイト設定 — 料金・時間枠・決済先はここだけ編集すればOK
   ========================================================== */
window.SITE_CONFIG = {
  currency: "JPY",

  // コース（料金表と予約フォームの両方に使われる）※サンプル値
  courses: [
    {
      id: "short",
      minutes: 60,
      price: 10000,
      name: { en: "Sakura Short Course", ja: "さくらショートコース" },
      desc: {
        en: "Tokyo Tower and the city center — perfect for your first ride.",
        ja: "東京タワーと都心をめぐる、はじめての方にぴったりのコース。"
      }
    },
    {
      id: "bay",
      minutes: 90,
      price: 14000,
      popular: true,
      name: { en: "Tokyo Bay Course", ja: "東京ベイコース" },
      desc: {
        en: "Rainbow Bridge and the bay area. Our most popular route.",
        ja: "レインボーブリッジとベイエリアを走る、一番人気のコース。"
      }
    },
    {
      id: "grand",
      minutes: 120,
      price: 18000,
      name: { en: "Grand Tokyo Course", ja: "グランド東京コース" },
      desc: {
        en: "Shibuya, Tokyo Tower and the bay — the full Tokyo experience.",
        ja: "渋谷・東京タワー・ベイエリアを満喫するフルコース。"
      }
    }
  ],

  // 出発時刻
  timeSlots: ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"],

  maxDrivers: 8,
  bookableDaysAhead: 90, // 何日先まで予約可能か
  closedWeekdays: [],    // 定休日 (0=日 … 6=土) 例: [2]

  // 決済ページ（Stripe Payment Links などが決まったら差し替え）
  // コースごとに分けたい場合は paymentUrls を使う
  paymentUrl: "#payment-url-not-set",
  paymentUrls: {
    // short: "https://buy.stripe.com/xxxx",
  },

  /**
   * 予約データの送信先（現在は仮実装：ブラウザ内に保存するだけ）
   * GAS 等が決まったらここを fetch(...) に置き換える。
   * @param {object} booking
   * @returns {Promise<{ok: boolean, id?: string, message?: string}>}
   */
  submitBooking: async function (booking) {
    const id = "SK" + Date.now().toString(36).toUpperCase();
    try {
      localStorage.setItem("sakura-kart:last-booking", JSON.stringify({ id, ...booking }));
    } catch (e) { /* storage unavailable */ }
    return { ok: true, id };
  }
};
