const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* 1. 入场动画：同一组元素按顺序错落出现 */
$$(".hero-copy > *").forEach((el, i) => {
  el.classList.add("reveal");
  el.style.setProperty("--d", i * 90 + "ms");
});
$(".portrait-wrap")?.style.setProperty("--d", "250ms");
[".facts > div", ".skill-grid > *", ".project-list > *", ".timeline > *", ".contact-list > *"].forEach(sel =>
  $$(sel).forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--d", Math.min(i, 5) * 80 + "ms");
  })
);
$$(".section-label, .section-head h2, .lead, .contact h2").forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("visible");
    io.unobserve(el);
    const d = parseInt(el.style.getPropertyValue("--d")) || 0;
    // 入场结束后清掉延迟，避免影响之后的悬停 / 按压反馈
    setTimeout(() => el.style.removeProperty("--d"), d + 900);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
$$(".reveal").forEach(el => io.observe(el));

/* 2. 导航：当前章节高亮、滚动阴影、手机端菜单 */
const nav = $(".nav"), menuBtn = $(".menu-btn");
const links = $$(".nav nav a");
const sections = $$("main section[id]");

const onScroll = () => {
  nav.classList.toggle("scrolled", scrollY > 8);
  let cur = "";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 180) cur = s.id; });
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = "contact";
  links.forEach(a => {
    const on = a.hash === "#" + cur;
    a.classList.toggle("active", on);
    on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
  });
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const setMenu = open => {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
links.forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("click", e => { if (!nav.contains(e.target)) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
addEventListener("resize", () => { if (innerWidth > 800) setMenu(false); });

/* 3. 点击复制联系方式 + 提示 */
const toast = $(".toast");
let toastTimer;
const showToast = msg => {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2000);
};
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  // 兜底：非 https 或微信内置浏览器等环境
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;opacity:0;top:0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch {}
  ta.remove();
  return ok;
}
$$(".copy-btn").forEach(btn => btn.addEventListener("click", async () => {
  const { copy, label } = btn.dataset;
  if (!(await copyText(copy))) return showToast(`复制失败，请手动复制：${copy}`);
  showToast(`已复制${label}：${copy}`);
  btn.textContent = "已复制";
  btn.classList.add("copied");
  setTimeout(() => { btn.textContent = "复制"; btn.classList.remove("copied"); }, 1600);
}));

/* 4. 项目卡片：点击时箭头飞出再回位 */
$$(".project-card").forEach(card => {
  const arrow = $(".arrow", card);
  card.addEventListener("click", () => card.classList.add("go"));
  arrow.addEventListener("animationend", () => card.classList.remove("go"));
});
