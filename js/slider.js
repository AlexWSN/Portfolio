try {
  document.addEventListener("DOMContentLoaded", () => {
    // --- SLIDER ---
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    let index = 0;

    function updateSlider() {
      if (!images.length || !slides) return;
      const width = images[0].clientWidth;
      slides.style.transform = `translateX(${-index * width}px)`;
    }

    if (next && prev && slides) {
      next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateSlider();
      });

      prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateSlider();
      });

      window.addEventListener("resize", updateSlider);
      window.addEventListener("load", updateSlider);
    }

    // --- TOGGLE GALERIE ---
    function toggleGallery(id) {
      const galleries = document.querySelectorAll(".gallery");
      galleries.forEach((gallery) => {
        if (gallery.id === id) {
          const wasHidden = gallery.classList.contains("hidden");
          gallery.classList.toggle("hidden");

          if (wasHidden) {
            // Imaginile vor fi ascultate global prin event delegation, deci nu trebuie aici listeneri
          }
        } else {
          gallery.classList.add("hidden");
        }
      });
    }
    window.toggleGallery = toggleGallery;

    // --- LIGHTBOX ---
    let currentGallery = [];
    let currentIndex = 0;

    // Folosim event delegation pe body pentru click pe imagini din galeriile vizibile
    document.body.addEventListener("click", (event) => {
      if (
        event.target.tagName === "IMG" &&
        event.target.closest(".gallery") &&
        !event.target.closest(".gallery").classList.contains("hidden")
      ) {
        const gallery = event.target.closest(".gallery");
        const images = Array.from(
          gallery.querySelectorAll(".gallery-item img")
        );
        currentGallery = images.map((img) => img.src);
        currentIndex = images.indexOf(event.target);
        openLightbox(currentGallery[currentIndex]);
      }
    });

    function openLightbox(src) {
      const lightbox = document.getElementById("lightbox");
      const lightboxImg = document.getElementById("lightbox-img");
      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.remove("hidden");
        lightbox.classList.add("active");
      }
    }

    function closeLightbox() {
      const lightbox = document.getElementById("lightbox");
      if (lightbox) {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("active");
      }
    }

    function nextImage() {
      if (currentGallery.length === 0) return;
      currentIndex = (currentIndex + 1) % currentGallery.length;
      document.getElementById("lightbox-img").src =
        currentGallery[currentIndex];
    }

    function prevImage() {
      if (currentGallery.length === 0) return;
      currentIndex =
        (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      document.getElementById("lightbox-img").src =
        currentGallery[currentIndex];
    }

    // Expunem funcțiile global pentru HTML (onclick în butoane)
    window.closeLightbox = closeLightbox;
    window.nextImage = nextImage;
    window.prevImage = prevImage;

    console.log("Script loaded!");
  });
} catch (e) {
  console.error("Eroare la execuție:", e);
}
