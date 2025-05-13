/*
 * fancybox.js
 * - initialize fancybox library
 * - automatically wrap images
 */

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".markdown-body img:not(figure img, .no-fancybox)")
    .forEach((img) => {
      if (img.closest("figure")) return; // 跳过已经在 <figure> 内的 <img>

      let src = img.getAttribute("src");
      let alt = img.getAttribute("alt") || ""; // 获取 alt 作为 title

      // 创建 <a> 标签包裹 <img>
      let link = document.createElement("a");
      link.setAttribute("href", src);
      link.setAttribute("data-fancybox", "gallery"); // Fancybox 组
      link.setAttribute("data-caption", alt); // 设置 title
      link.setAttribute("aria-label", alt); // 辅助功能优化

      // 创建 <figcaption> 并添加 <h4>
      let figcaption = document.createElement("figcaption");
      let captionTitle = document.createElement("h4");
      captionTitle.textContent = alt;
      figcaption.appendChild(captionTitle);

      // 创建 <figure> 并包裹 <a> + <figcaption>
      let figure = document.createElement("figure");
      figure.appendChild(link);
      figure.appendChild(figcaption);

      // 替换原始 img
      img.parentNode.insertBefore(figure, img);
      link.appendChild(img); // 将 img 插入 <a>
    });
});
Fancybox.bind("[data-fancybox]");
