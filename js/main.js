/* ==========================================================
   SAKURA KART — interactions
   ========================================================== */
(function () {
  const CFG = window.SITE_CONFIG;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const t = () => window.I18N.t();
  const lang = () => window.I18N.lang;
  const yen = n => "¥" + n.toLocaleString("en-US");
  const pad = n => String(n).padStart(2, "0");
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Header / nav ---------- */
  function initNav() {
    const toggle = $(".menu-toggle");
    const nav = $("#global-nav");
    const close = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", nav).forEach(a => a.addEventListener("click", close));
  }

  /* ---------- Floating CTA / to-top ---------- */
  function initFloating() {
    const toTop = $(".to-top");
    const cta = $(".floating-cta");
    const booking = $("#booking");
    const onScroll = () => {
      toTop.classList.toggle("is-visible", scrollY > 600);
      // 予約セクションが見えている間はフローティングの予約ボタンを隠す
      const r = booking.getBoundingClientRect();
      cta.classList.toggle("is-hidden", r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.4);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Modal ---------- */
  function initModal() {
    let lastFocus = null;
    document.addEventListener("click", e => {
      const opener = e.target.closest("[data-open-modal]");
      if (opener) {
        const m = document.getElementById(opener.dataset.openModal);
        lastFocus = opener;
        m.hidden = false;
        $(".modal__close", m).focus();
        return;
      }
      if (e.target.closest("[data-close-modal]")) closeAll();
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
    function closeAll() {
      $$(".modal").forEach(m => { m.hidden = true; });
      if (lastFocus) lastFocus.focus();
    }
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    $$("[data-tabs]").forEach(root => {
      const tabs = $$('[role="tab"]', root);
      const select = tab => {
        tabs.forEach(t => {
          const on = t === tab;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
          document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
        });
      };
      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => select(tab));
        tab.addEventListener("keydown", e => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!d) return;
          const next = tabs[(i + d + tabs.length) % tabs.length];
          select(next); next.focus();
        });
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = $$(".section-title, .reason, .option-card, .vehicle, .review, .course, .feature-hero, .flow-box, .tour-card");
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -10% 0px" });
    targets.forEach(el => { el.classList.add("reveal"); io.observe(el); });
  }

  /* ---------- Course list (料金表) ---------- */
  function renderCourses() {
    const list = $("#course-list");
    list.innerHTML = CFG.courses.map(c => `
      <article class="course${c.popular ? " is-popular" : ""}">
        ${c.popular ? `<span class="course__badge">${t().popular}</span>` : ""}
        <div class="course__media ph" role="img" aria-label="${escapeHtml(c.name[lang()])}"><span class="ph__label">COURSE PHOTO</span></div>
        <div class="course__body">
          <h3 class="course__name">${escapeHtml(c.name[lang()])}</h3>
          <p class="course__meta">${c.minutes} ${t().min}</p>
          <p class="course__desc">${escapeHtml(c.desc[lang()])}</p>
          <p class="course__price">${yen(c.price)}<small>${t().perDriver}</small></p>
          <a href="#booking" class="btn btn--primary btn--block" data-pick-course="${c.id}">${t().bookThis}</a>
        </div>
      </article>`).join("");
  }

  /* ==========================================================
     Booking widget
     ========================================================== */
  const state = {
    step: 1,
    courseId: CFG.courses[0].id,
    date: null,     // "YYYY-MM-DD"
    time: null,
    drivers: 1,
    view: null      // 表示中の月 (Date, 1日)
  };

  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const lastBookable = () => { const d = today(); d.setDate(d.getDate() + CFG.bookableDaysAhead); return d; };
  const course = () => CFG.courses.find(c => c.id === state.courseId);

  function renderCourseSelect() {
    const sel = $("#bw-course");
    sel.innerHTML = CFG.courses.map(c =>
      `<option value="${c.id}">${escapeHtml(c.name[lang()])} (${c.minutes}${t().min} / ${yen(c.price)})</option>`).join("");
    sel.value = state.courseId;
  }

  function renderDriversSelect() {
    const sel = $("#bw-drivers");
    sel.innerHTML = Array.from({ length: CFG.maxDrivers }, (_, i) => i + 1)
      .map(n => `<option value="${n}">${t().driversOpt(n)}</option>`).join("");
    sel.value = state.drivers;
  }

  function renderCalendar() {
    const el = $("#calendar");
    const v = state.view;
    const y = v.getFullYear(), m = v.getMonth();
    const first = new Date(y, m, 1);
    const days = new Date(y, m + 1, 0).getDate();
    const min = today(), max = lastBookable();
    const canPrev = new Date(y, m, 1) > new Date(min.getFullYear(), min.getMonth(), 1);
    const canNext = new Date(y, m + 1, 1) <= max;

    let cells = t().dow.map(d => `<span class="cal__dow">${d}</span>`).join("");
    cells += "<span></span>".repeat(first.getDay());
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d);
      const key = ymd(date);
      const disabled = date < min || date > max || CFG.closedWeekdays.includes(date.getDay());
      const cls = ["cal__day", +date === +min ? "is-today" : ""].join(" ").trim();
      cells += `<button type="button" class="${cls}" data-date="${key}" aria-pressed="${state.date === key}" ${disabled ? "disabled" : ""}
                 aria-label="${t().date(date)}">${d}</button>`;
    }
    el.innerHTML = `
      <div class="cal__head">
        <button type="button" class="cal__nav" data-cal="-1" aria-label="${t().prevMonth}" ${canPrev ? "" : "disabled"}>‹</button>
        <span class="cal__title">${t().monthTitle(y, m)}</span>
        <button type="button" class="cal__nav" data-cal="1" aria-label="${t().nextMonth}" ${canNext ? "" : "disabled"}>›</button>
      </div>
      <div class="cal__grid">${cells}</div>`;
  }

  function renderSlots() {
    const el = $("#slots");
    if (!state.date) {
      el.innerHTML = `<p class="slots__empty">${window.I18N.lang === "ja" ? "日付を選択してください。" : "Please select a date."}</p>`;
      return;
    }
    // 今日の場合は過ぎた時刻を選べないようにする（空き状況の取得は今後 API 連携で）
    const now = new Date();
    const isToday = state.date === ymd(now);
    el.innerHTML = CFG.timeSlots.map(s => {
      const [hh, mm] = s.split(":").map(Number);
      const past = isToday && (hh * 60 + mm) <= (now.getHours() * 60 + now.getMinutes() + 60);
      return `<button type="button" class="slot" data-time="${s}" aria-pressed="${state.time === s}" ${past ? "disabled" : ""}>${s}</button>`;
    }).join("");
  }

  function renderTotal() {
    $("#bw-total").textContent = yen(course().price * state.drivers);
  }

  function renderSteps() {
    $$(".bw-step").forEach(f => { f.hidden = Number(f.dataset.step) !== state.step; });
    $$(".booking-steps li").forEach((li, i) => {
      li.classList.toggle("is-active", i + 1 === state.step);
      li.classList.toggle("is-done", i + 1 < state.step);
    });
  }

  function renderSummary() {
    const f = $("#booking-form");
    const S = t().sum;
    const permitSel = f.permit;
    const rows = [
      [S.course, course().name[lang()]],
      [S.date, t().date(new Date(state.date + "T00:00:00"))],
      [S.time, state.time],
      [S.drivers, t().driversOpt(state.drivers)],
      [S.name, f.name.value],
      [S.email, f.email.value],
      [S.phone, f.phone.value],
      [S.country, f.country.value],
      [S.permit, permitSel.options[permitSel.selectedIndex].text]
    ];
    $("#bw-summary").innerHTML =
      rows.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd></div>`).join("") +
      `<div class="summary__total"><dt>${S.total}</dt><dd>${yen(course().price * state.drivers)}</dd></div>`;
  }

  function showError(msg) {
    const e = $("#bw-error");
    e.textContent = msg;
    e.hidden = !msg;
  }

  function validateStep2() {
    const f = $("#booking-form");
    const fields = ["name", "email", "phone", "country", "permit"].map(n => f[n]);
    let firstBad = null;
    fields.forEach(el => {
      const bad = !el.value.trim() || (el.type === "email" && !el.checkValidity());
      el.setAttribute("aria-invalid", String(bad));
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      showError(firstBad.type === "email" && firstBad.value ? t().err.email : t().err.required);
      firstBad.focus();
      return false;
    }
    if (!f.agree.checked) { showError(t().err.agree); f.agree.focus(); return false; }
    showError("");
    return true;
  }

  function goTo(step) {
    state.step = step;
    if (step === 3) renderSummary();
    renderSteps();
    const w = $(".booking-widget");
    if (w.getBoundingClientRect().top < 0) w.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function initBooking() {
    const t0 = today();
    state.view = new Date(t0.getFullYear(), t0.getMonth(), 1);

    renderCourseSelect(); renderDriversSelect(); renderCalendar(); renderSlots(); renderTotal(); renderSteps();

    $("#bw-course").addEventListener("change", e => { state.courseId = e.target.value; renderTotal(); });
    $("#bw-drivers").addEventListener("change", e => { state.drivers = Number(e.target.value); renderTotal(); });

    $("#calendar").addEventListener("click", e => {
      const nav = e.target.closest("[data-cal]");
      if (nav) {
        state.view = new Date(state.view.getFullYear(), state.view.getMonth() + Number(nav.dataset.cal), 1);
        renderCalendar();
        return;
      }
      const day = e.target.closest("[data-date]");
      if (day && !day.disabled) {
        state.date = day.dataset.date;
        state.time = null;
        renderCalendar(); renderSlots();
      }
    });

    $("#slots").addEventListener("click", e => {
      const s = e.target.closest("[data-time]");
      if (s && !s.disabled) { state.time = s.dataset.time; renderSlots(); }
    });

    // 料金表の「このコースを予約」
    document.addEventListener("click", e => {
      const pick = e.target.closest("[data-pick-course]");
      if (pick) { state.courseId = pick.dataset.pickCourse; $("#bw-course").value = state.courseId; renderTotal(); goTo(1); }
    });

    $("#booking-form").addEventListener("click", e => {
      if (e.target.closest("[data-prev]")) { showError(""); goTo(state.step - 1); }
      if (e.target.closest("[data-next]")) {
        if (state.step === 1) {
          if (!state.date || !state.time) { alert(t().err.slot); return; }
          goTo(2);
        } else if (state.step === 2) {
          if (validateStep2()) goTo(3);
        }
      }
    });

    $("#booking-form").addEventListener("submit", async e => {
      e.preventDefault();
      const f = e.target;
      const btn = $('button[type="submit"]', f);
      btn.disabled = true;
      btn.textContent = t().redirecting;

      const c = course();
      const booking = {
        courseId: c.id, courseName: c.name.en, minutes: c.minutes,
        date: state.date, time: state.time, drivers: state.drivers,
        total: c.price * state.drivers, currency: CFG.currency,
        name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
        country: f.country.value.trim(), permit: f.permit.value, lang: lang(),
        createdAt: new Date().toISOString()
      };

      const res = await CFG.submitBooking(booking);
      const url = CFG.paymentUrls[c.id] || CFG.paymentUrl;

      if (res.ok && /^https?:\/\//.test(url)) {
        // 決済ページへ予約IDを渡して照合できるようにする（Stripe Payment Links は client_reference_id に対応）
        const u = new URL(url);
        u.searchParams.set("client_reference_id", res.id);
        location.href = u.toString();
        return;
      }
      alert(t().paymentNotSet + (res.id || ""));
      btn.disabled = false;
      btn.textContent = window.I18N.lang === "ja" ? "お支払いへ進む" : "Proceed to Payment";
    });
  }

  /* ---------- Language change: JS で描画した部分を描き直す ---------- */
  document.addEventListener("langchange", () => {
    if (!state.view) return; // 初期化前
    renderCourses(); renderCourseSelect(); renderDriversSelect(); renderCalendar(); renderSlots();
    if (state.step === 3) renderSummary();
  });

  document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();
    initNav(); initFloating(); initModal(); initTabs();
    renderCourses(); initBooking();
    initReveal();
  });
})();
