const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight;
  const winHeight = window.innerHeight;
  const trueScrollPercent = scrollTop / (docHeight - winHeight);
  const scrollPercent = Math.floor(
    Math.max(Math.min(trueScrollPercent * 100, 100), 0)
  );

  const progressElement = document.querySelector(".circular-progress");
  progressElement.style.setProperty("--progress", scrollPercent);

  const progressText = document.querySelector(".progress-text");
  progressText.innerHTML = `${scrollPercent}%`;
};

updateProgress();

document.addEventListener("scroll", updateProgress);
