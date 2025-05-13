/**
 * lazyload.js
 * - implement native `loading="lazy"` method
 * - replace placeholders
 */

document.addEventListener("DOMContentLoaded", () => {
  const allImages = document.querySelectorAll("img");
  const images = document.querySelectorAll("img[data-src]");

  // if there is a low-res temporary image placeholder
  // replace it with real image afterwords
  const loadImage = (image) => {
    const loadingImage = image.src; // Store current loading image (if any)
    const realImage = image.dataset.src; // Get the real image URL from data-src
    image.src = loadingImage; // Optionally, reset the src to the placeholder
    image.onload = () => {
      image.classList.add("fade-in"); // Optional: Apply fade-in effect after loading
    };
    image.src = realImage; // Now, load the actual image
    image.removeAttribute("data-src"); // Clean up after lazy loading
  };

  // observe view port change
  // load image when scrolled into view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target); // Stop observing once the image has loaded
        }
      });
    },
    { threshold: 0.1 },
  );

  // initialize native lazyloading
  allImages.forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  // lazy load
  images.forEach((image) => {
    observer.observe(image); // Start observing each image
  });
});
