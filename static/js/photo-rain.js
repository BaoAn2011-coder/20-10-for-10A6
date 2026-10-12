
(() => {
  // Danh sách ảnh trong static/images/
  const photos = [
  "/static/images/flower1.jfif",
  "/static/images/flower2.jfif",
  "/static/images/class1.jfif",
  "/static/images/class2.jfif"
  ];

  // Tạo lớp chứa ảnh rơi
  const layer = document.createElement("div");
  layer.id = "photo-rain";

  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: "10"
  });

  document.body.appendChild(layer);

  // Kiểu ảnh Polaroid màu hồng
  const style = document.createElement("style");
  style.textContent = `
    .rain-photo {
      position: absolute;
      top: -190px;
      width: 105px;
      height: 135px;
      padding: 5px 5px 15px;
      object-fit: cover;
      background: #fff4fa;
      border: 1px solid #ffc4e0;
      border-radius: 7px;
      box-shadow: 0 0 18px #ff8dcc88;
      animation: photoFall linear forwards;
      will-change: transform, opacity;
    }

    @keyframes photoFall {
      0% {
        transform: translateY(-5vh) rotate(-12deg);
        opacity: 0;
      }
      10% { opacity: 1; }
      50% {
        transform: translate(45px, 50vh) rotate(12deg);
      }
      100% {
        transform: translate(-25px, 115vh) rotate(-15deg);
        opacity: 0.2;
      }
    }

    @media (max-width: 600px) {
      .rain-photo {
        width: 72px;
        height: 96px;
        padding: 4px 4px 11px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .rain-photo {
        animation-duration: 15s !important;
      }
    }
  `;
  document.head.appendChild(style);

  function dropPhoto() {
    // Giới hạn số ảnh để tránh làm chậm website
    if (layer.childElementCount >= 16) return;

    const img = document.createElement("img");
    img.className = "rain-photo";
    img.src = photos[Math.floor(Math.random() * photos.length)];
    img.alt = "Kỷ niệm 20/10";

    img.style.left = Math.random() * 85 + "vw";
    img.style.animationDuration = (9 + Math.random() * 6) + "s";
    img.style.animationDelay = Math.random() * 0.5 + "s";

    img.onerror = () => img.remove();

    img.addEventListener("animationend", () => {
      img.remove();
    }, { once: true });

    layer.appendChild(img);
  }

  // Cho một số ảnh xuất hiện ngay lúc đầu
  for (let i = 0; i < 7; i++) {
    setTimeout(dropPhoto, i * 650);
  }

  // Tiếp tục thả ảnh đều đặn
  setInterval(dropPhoto, 1300);
})();
