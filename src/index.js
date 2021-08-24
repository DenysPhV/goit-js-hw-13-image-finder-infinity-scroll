import * as basicLightbox from 'basiclightbox';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import ServiceImage from './js/apiService';
import refs from './js/refs';
import imageCardTpl from './templates/image-card.hbs';

const apiService = new ServiceImage();
// обработка данных из сервера
function onInputChange(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.query.value.trim();
  apiService.resetPage();
  clearGallery();

  apiService.fetchImage().then(data => {
    if (data.length === 0 || apiService.query.trim() === '') {
      error({
        title: 'NOT FOUND',
        text: 'Please enter a more specific query',
        addClass: 'error',
        delay: 2000,
      });
    } else {
      appendImagesMarkup(data);
      refs.loadMoreBtn.classList.remove('hide');
    }
  });
}
// переписать на  бесконечный скролл
function onMoreLoad(event) {
  apiService
    .fetchImage()
    .then(appendImagesMarkup)
    .then(() => {
      scrollGallery();
    });
}

function onImageClick(event) {
  const imageItem = event.target;

  if (!imageItem.classList.contains('gallery-image')) {
  }

  const instance = basicLightbox.create(
    `<img src="${imageItem.dataset.source}" width="800" height="600">`,
    {
      closable: true,
    },
  );

  instance.show();
}

function appendImagesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearGallery() {
  refs.galleryList.innerHTML = '';
  refs.loadMoreBtn.classList.add('hide');
}

function scrollGallery() {
  refs.loadMoreBtn.scrollIntoView({
    top: refs.galleryList.scrollHeight,
    behavior: 'smooth',

    // block: 'end',
  });
}

refs.formInput.addEventListener('submit', onInputChange);
refs.loadMoreBtn.addEventListener('click', onMoreLoad);
refs.galleryList.addEventListener('click', onImageClick);
