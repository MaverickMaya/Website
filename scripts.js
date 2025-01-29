// Function to add the dark blurred overlay
function addBlurredOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('blurred-overlay');
  document.body.appendChild(overlay);

  // Remove the overlay after 3 seconds
  setTimeout(() => {
    overlay.remove();
  }, 3000);
}

// Function to add a giant watermark
function addWatermark() {
  const watermark = document.createElement('div');
  watermark.classList.add('watermark');
  watermark.textContent = 'CONFIDENTIAL FAN CONTENT';
  document.body.appendChild(watermark);
}

// Listen for keydown events to block screenshot attempts
document.addEventListener('keydown', (e) => {
  if (e.key === "PrintScreen" || (e.ctrlKey && e.key === "p")) {
    e.preventDefault(); // Block the key action
    addBlurredOverlay();
    addWatermark();
    alert("Screenshots are disabled on this page.");
  }
});

// Prevent content copying
document.addEventListener('copy', (e) => {
  e.preventDefault();
  alert("Copying content is not allowed.");
});

// Detect screen recording for mobile devices
function detectScreenRecording() {
  // Check for Android using visibilitychange event
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      addBlurredOverlay();
      addWatermark();
      alert("Screen recording is not allowed.");
    }
  });

  // Check for iOS using resize event
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isiOS) {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    window.addEventListener('resize', () => {
      if (window.innerWidth !== initialWidth || window.innerHeight !== initialHeight) {
        addBlurredOverlay();
        addWatermark();
        alert("Screen recording is not allowed.");
      }
    });
  }
}

detectScreenRecording();
