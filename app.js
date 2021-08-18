const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const markupContainer = document.querySelector('.js-gallery');

const readyMarkup = createMySuperGallaryMarkup(galleryItems);

const mySuperGalleryModalWindow = document.querySelector('.js-lightbox');

const LightBoxContainerImage = document.querySelector('.lightbox__image');

const mySuperGalleryModalWindowCloseButton = document.querySelector('.lightbox__button');

const mySuperGalleryModalWindowOverlay = document.querySelector('.lightbox__overlay');

mySuperGalleryModalWindowOverlay.addEventListener('click', removeClassOperation);

mySuperGalleryModalWindowCloseButton.addEventListener('click', removeClassOperation);

window.addEventListener('keydown', onEscapeKeyPress);

window.addEventListener('keydown', onArrowLeftKeyPress);

markupContainer.insertAdjacentHTML('beforeend', readyMarkup);

markupContainer.addEventListener('click', onMySuperGalaryItemClick);

function createMySuperGallaryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
     
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
    })
    .join('');
}
const allImages = document.querySelector('.gallery');

const myImages = document.querySelectorAll('.gallery__image');

myImages[0].setAttribute('data-picture-name', '1');
myImages[1].setAttribute('data-picture-name', '2');
myImages[2].setAttribute('data-picture-name', '3');
myImages[3].setAttribute('data-picture-name', '4');
myImages[4].setAttribute('data-picture-name', '5');
myImages[5].setAttribute('data-picture-name', '6');
myImages[6].setAttribute('data-picture-name', '7');
myImages[7].setAttribute('data-picture-name', '8');
myImages[8].setAttribute('data-picture-name', '9');

allImages.addEventListener('keydown', onArrowRightKeyPress, onArrowLeftKeyPress);

function onMySuperGalaryItemClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  mySuperGalleryModalWindow.classList.add('is-open');

  LightBoxContainerImage.src = event.target.dataset.source;
  LightBoxContainerImage.alt = event.target.alt;
}

function removeClassOperation(event) {
  mySuperGalleryModalWindow.classList.remove('is-open');
  LightBoxContainerImage.src = '';
  LightBoxContainerImage.alt = '';
}

function onEscapeKeyPress(event) {
  if (event.code === 'Escape') {
    removeClassOperation();
  }
}

// // При попытке реализовать функционал из дополнительного задания все получилось
//  кроме листания стрелками, раньше листало только один раз вправо и один раз влево,
// теперь листает нормально и вперед и назад если открывать галерею с первой картинки(синий цветок)
// если с третей, например, то перелистывание буксует - нужно нажимать листание несколько раз(чем дальше картинка
//  от первой - тем больше раз нужно нажимать на стрелку пока начнет перелистывать)

let number = 0;
function onArrowRightKeyPress(event) {
  let nextPicture = Number(event.target.childNodes[0].nextElementSibling.dataset.pictureName);
  if (event.code === 'ArrowRight') {
    number += 1;

    if (number > 8) {
      number = 0;
    }
    LightBoxContainerImage.src = myImages[nextPicture - 1 + number].dataset.source;
  }
}

function onArrowLeftKeyPress(event) {
  let prewPicture = Number(event.target.childNodes[0].nextElementSibling.dataset.pictureName);

  if (event.code === 'ArrowLeft') {
    number -= 1;

    if (number < 0) {
      number = 8;
    }
    LightBoxContainerImage.src = myImages[prewPicture - 1 + number].dataset.source;
  }
}
