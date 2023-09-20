import { galleryItems } from "./gallery-items";
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"; 

const galleryElement = document.querySelector(".gallery");

const createGalleryMarkup = (item) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>`;
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', 
});

const galleryMarkup = galleryItems.map(createGalleryMarkup).join("");
galleryElement.innerHTML = galleryMarkup;

galleryElement.addEventListener("click", function (event) {
  event.preventDefault();
  const target = event.target;

  if (target.tagName !== "IMG") return;

  const largeImageURL = target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${largeImageURL}" width="800" height="600">
  `);

  instance.show();

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && instance) {
      instance.close();
    }
  });
});
