// Photo frames are rendered directly within the 3D scene (home.js) using MeshBasicMaterial
// matching coordinates, natural brightness, and 2D planar alignment.
(() => {
  // Enforce natural photo clarity & clean box-shadow in CSS if any DOM elements are used
  const style = document.createElement("style");
  style.id = "photo-rain-clarity-styles";
  style.textContent = `
    .rain-photo, [class*="photo"], .photo-frame {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
    }
    .rain-photo img, [class*="photo"] img, img.rain-photo {
      filter: brightness(1) !important;
    }
  `;
  if (!document.getElementById("photo-rain-clarity-styles")) {
    document.head.appendChild(style);
  }
})();
