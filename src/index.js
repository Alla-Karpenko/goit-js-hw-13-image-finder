
import './styles.css';
import NewsApiService from './js/apiService';
import hitsTpl from './hits.hbs';
import LoadMoreBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    galleryContainer: document.querySelector('.js-gallery-container'),
    //loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn ({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit',onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchGallery);


function onSearch(e) {
    e.preventDefault();
   
   newsApiService.query = e.currentTarget.query.value;

   if (newsApiService.query === '') {
    return alert('Введи что-то хорошее 🙃😉');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearGalleryContainer();
  fetchGallery();
}

function fetchGallery(){
    loadMoreBtn.disable();
    newsApiService.fetchGallery().then(hits => {
        appendHitsMarkup(hits);
        loadMoreBtn.enable();
    });
}

function appendHitsMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', hitsTpl(hits))
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}








