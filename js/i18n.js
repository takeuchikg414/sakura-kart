/* ==========================================================
   多言語対応
   - 英語の文言は index.html に直接書いてある（デフォルト言語）
   - 日本語訳は下の JA に data-i18n のキーごとに書く
   - JS で描画する部分の文言は UI に en / ja 両方書く
   ========================================================== */
(function () {
  const JA = {
    "brand.sub": "東京ストリートカートツアー",
    "header.open": "営業 9:00–21:00",

    "nav.top": "トップ", "nav.about": "概要", "nav.vehicles": "車両", "nav.reviews": "口コミ",
    "nav.courses": "コース・料金", "nav.access": "アクセス", "nav.faq": "FAQ", "nav.company": "会社情報",
    "nav.book": "予約する",

    "hero.eyebrow": "TOKYO STREET GO-KART TOUR",
    "hero.title": "東京の街を、<br>カートで駆け抜けろ。",
    "hero.lead": "本物の東京の公道を走るガイド付きカートツアー。世界中の旅行者のためのアクティビティです。",
    "cta.book": "予約する", "cta.courses": "コースを見る",

    "news.label": "NEWS",
    "news.item": "🌸 春の「桜コース」受付開始 — 満開の桜の下を走ろう（3〜4月）",

    "booking.sub": "ツアーを予約する",
    "tour.title": "SAKURA KART 東京ツアー",
    "tour.caution": "注意",
    "tour.cautionText": "ツアー参加には日本で運転できる免許証が必要です。予約前に「必要書類」タブをご確認ください。",
    "tab.overview": "概要", "tab.req": "必要書類", "tab.flow": "当日の流れ", "tab.faq": "FAQ",
    "tab.overviewText": "ガイドが東京タワー、レインボーブリッジ、渋谷などの名所へご案内します。コースと衣装を選んで、運転席から東京の街を楽しみましょう。",
    "spec.duration": "所要時間", "spec.durationVal": "60 / 90 / 120分",
    "spec.group": "人数", "spec.groupVal": "1〜8名",
    "spec.lang": "ガイド言語", "spec.langVal": "英語 / 日本語",
    "spec.meet": "集合場所", "spec.meetVal": "SAKURA KART 東京店",

    "req.lead": "当日は以下の<strong>いずれか</strong>の組み合わせをお持ちください：",
    "req.a": "国際運転免許証（IDP）", "req.aNote": "1949年ジュネーブ条約のみ ＋ 本国の免許証 ＋ パスポート",
    "req.b": "本国の免許証 ＋ 公式日本語翻訳文", "req.bNote": "対象国（スイス・ドイツ・フランス・台湾など）＋ パスポート",
    "req.c": "日本の運転免許証", "req.cNote": "普通免許または中型免許",
    "req.d": "米国SOFA免許証", "req.dNote": "SOFA免許 ＋ 米国州免許 ＋ 軍ID",

    "flow.1": "ツアー開始30分前までにお店にお越しください。",
    "flow.2": "受付で予約名・免許証・パスポートをご提示ください。",
    "flow.3": "参加同意書にサインし、お好きな衣装を選びます。",
    "flow.4": "荷物をロッカーに預けます。",
    "flow.5": "ガイドによる安全説明と練習走行。",
    "flow.6": "出発！ツアーを楽しみましょう。",

    "faqm.q1": "雨の日は？",
    "faqm.a1": "小雨なら実施します（レインコートあり）。荒天の場合はこちらからご連絡し、日程変更または返金いたします。",
    "faqm.q2": "同乗はできますか？",
    "faqm.a2": "カートは1人乗りです。参加者全員に有効な免許証が必要です。",

    "bstep.1": "日時", "bstep.2": "お客様情報", "bstep.3": "確認", "bstep.4": "お支払い",
    "bw.course": "コース", "bw.time": "出発時刻", "bw.pickDate": "日付を選択してください。",
    "bw.drivers": "運転する人数", "bw.total": "合計", "bw.next": "次へ", "bw.back": "戻る",
    "bw.name": "氏名（パスポート表記）", "bw.email": "メールアドレス", "bw.phone": "電話番号 / WhatsApp",
    "bw.country": "国", "bw.permit": "免許証の種類", "bw.select": "選択してください",
    "bw.agree": "参加者全員が有効な免許証を持参すること、利用規約に同意します。",
    "bw.payNote": "決済ページへ移動して予約を完了します。",
    "bw.pay": "お支払いへ進む",

    "about.sub": "SAKURA KARTとは？",
    "about.h": "東京の公道を走る、リアルなカート体験",
    "about.p": "SAKURA KARTは訪日旅行者向けのガイド付き公道カートツアーです。ネオン街、名所、ベイエリアを駆け抜け、ここでしか得られない思い出と写真を持ち帰ってください。",
    "about.whyH": "選ばれる理由",
    "why.1h": "道路から見る東京", "why.1p": "観光バスでは味わえない目線で、名所のすぐそばを走ります。",
    "why.2h": "英語対応のガイド", "why.2p": "多言語対応のガイドが先導し、安全をサポートします。",
    "why.3h": "衣装と写真", "why.3p": "無料の衣装レンタルと、ガイドによる走行写真付き。",
    "why.4h": "かんたんオンライン予約", "why.4p": "時間を選んでオンライン決済、当日は来るだけ。",
    "about.optH": "オプション",
    "opt.1h": "衣装レンタル", "opt.free": "無料", "opt.2h": "アクションカメラ動画", "opt.3h": "フォトパッケージ",
    "about.resH": "予約の流れ",
    "res.1": "コースと時間を選ぶ", "res.2": "お客様情報を入力", "res.3": "オンライン決済", "res.4": "確認メールを受け取る",

    "veh.sub": "車両紹介",
    "veh.1h": "スタンダードカート", "veh.1p": "運転しやすく公道走行可能。初めての方に最適です。",
    "veh.2h": "サクラエディション", "veh.2p": "看板のピンクカート。写真映えで一番人気。",
    "veh.3h": "プレミアムカート", "veh.3p": "快適性アップ＆Bluetoothスピーカー付き。",

    "social.sub": "SNSで最新情報をチェック",
    "rev.sub": "お客様の声", "rev.note": "サンプルの口コミです（実際の口コミに差し替え）",
    "rev.1": "「日本旅行で一番の思い出！ガイドがとても親切で、ルートも最高でした。」",
    "rev.2": "「夜の東京タワーの横を走るのは現実離れした体験。予約もすぐ終わりました。」",
    "rev.3": "「写真も衣装もスタッフも最高。また参加したい！」",

    "course.sub": "コースと料金",
    "course.note": "料金は1名あたり・税込。サンプル価格です（後日更新）。",

    "faq.sub": "よくある質問",
    "faq.q1": "運転には何が必要ですか？",
    "faq.a1": "日本で有効な免許証（1949年ジュネーブ条約の国際運転免許証など）が必要です。予約欄の「必要書類」タブをご確認ください。",
    "faq.q2": "年齢制限はありますか？",
    "faq.a2": "日本で有効な免許証が必要なため、実質18歳以上となります。",
    "faq.q3": "キャンセル・変更はできますか？",
    "faq.a3": "ツアー3日前までは無料で変更できます。詳しくはキャンセルポリシーをご覧ください。",
    "faq.q4": "服装は？",
    "faq.a4": "つま先が覆われた靴が必要です。衣装は店舗で無料レンタルできます。",

    "access.sub": "店舗情報",
    "access.addr": "住所", "access.addrVal": "（住所未定）東京都",
    "access.station": "最寄駅", "access.stationVal": "（未定）",
    "access.hours": "営業時間", "access.tel": "電話", "access.gmap": "Googleマップで開く",

    "company.sub": "会社情報",
    "company.name": "会社名", "company.rep": "代表者", "company.addr": "所在地",
    "company.biz": "事業内容", "company.bizVal": "公道カートツアーの運営", "company.contact": "お問い合わせ",

    "footer.terms": "利用規約", "footer.privacy": "プライバシーポリシー",
    "footer.cancel": "キャンセルポリシー", "footer.law": "特定商取引法に基づく表記",

    "float.chat": "スタッフに相談", "float.book": "予約",
    "chat.title": "スタッフに相談", "chat.lead": "予約前のご質問は、お使いのアプリからお気軽にどうぞ。",
    "chat.email": "メール"
  };

  const UI = {
    en: {
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      monthTitle: (y, m) => `${UI.en.months[m]} ${y}`,
      dow: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      prevMonth: "Previous month", nextMonth: "Next month",
      min: "min", perDriver: "/ driver", popular: "POPULAR", bookThis: "Book this course",
      driversOpt: n => `${n} ${n === 1 ? "driver" : "drivers"}`,
      date: d => d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }),
      sum: { course: "Course", date: "Date", time: "Time", drivers: "Drivers", name: "Name", email: "Email", phone: "Phone", country: "Country", permit: "Permit", total: "Total" },
      err: { slot: "Please select a date and time.", required: "Please fill in all required fields.", email: "Please enter a valid email address.", agree: "Please check the confirmation box." },
      redirecting: "Redirecting to payment…",
      paymentNotSet: "The payment page is not connected yet. (Booking saved as a test.)\nBooking ID: "
    },
    ja: {
      months: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      monthTitle: (y, m) => `${y}年${m + 1}月`,
      dow: ["日","月","火","水","木","金","土"],
      prevMonth: "前の月", nextMonth: "次の月",
      min: "分", perDriver: "/ 1名", popular: "人気No.1", bookThis: "このコースを予約",
      driversOpt: n => `${n}名`,
      date: d => d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric", weekday: "short" }),
      sum: { course: "コース", date: "日付", time: "時刻", drivers: "人数", name: "氏名", email: "メール", phone: "電話", country: "国", permit: "免許証", total: "合計" },
      err: { slot: "日付と時刻を選択してください。", required: "必須項目をすべて入力してください。", email: "正しいメールアドレスを入力してください。", agree: "確認のチェックを入れてください。" },
      redirecting: "決済ページへ移動しています…",
      paymentNotSet: "決済ページはまだ接続されていません（テストとして予約を保存しました）。\n予約ID: "
    }
  };

  const STORAGE_KEY = "sakura-kart:lang";
  const SUPPORTED = ["en", "ja"];
  let current = "en";

  function detectInitial() {
    const q = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED.includes(q)) return q;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED.includes(saved)) return saved;
    } catch (e) {}
    return "en"; // インバウンド向けなので英語をデフォルトにする
  }

  function apply(lang) {
    current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML; // 英語原文を保持
      const key = el.dataset.i18n;
      el.innerHTML = lang === "ja" && JA[key] !== undefined ? JA[key] : el.dataset.en;
    });
    document.querySelectorAll("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  window.I18N = {
    get lang() { return current; },
    t: () => UI[current],
    apply
  };

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-lang]");
    if (btn) apply(btn.dataset.lang);
  });

  current = detectInitial();
  document.addEventListener("DOMContentLoaded", () => apply(current));
})();
