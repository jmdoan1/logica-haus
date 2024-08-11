function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight;
  const winHeight = window.innerHeight;
  const trueScrollPercent = scrollTop / (docHeight - winHeight);
  const scrollPercent =
    docHeight <= winHeight
      ? 100
      : Math.floor(Math.max(Math.min(trueScrollPercent * 100, 100), 0));

  const progressElement = document.querySelector(".circular-progress");
  progressElement.style.setProperty("--progress", scrollPercent);

  const progressText = document.querySelector(".progress-text");
  progressText.innerHTML = `${scrollPercent}%`;
}

updateProgress();

document.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);

let previousUrl = "";
const observer = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    console.log(`URL changed to ${location.href}`);
    updateProgress();
  }
});
const config = { subtree: true, childList: true };
observer.observe(document, config);
