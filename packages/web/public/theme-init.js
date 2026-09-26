// Applies the saved theme before the first paint, so returning dark-mode
// visitors never see a flash of the light page. Kept as a file (not inline)
// so the Content-Security-Policy can stay script-src 'self'.
try {
  if (localStorage.getItem("9meses.theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
