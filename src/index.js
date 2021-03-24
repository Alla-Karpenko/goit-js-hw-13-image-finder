
import './styles.css';
import NewsApiService from './js/apiService';
import hitsTpl from './hits.hbs';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    //loadMoreBtn: document.querySelector('[data-action="load-more"]')
    sentinel: document.querySelector('#sentinel'),
}

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('input',onSearch)
//refs.loadMoreBtn.addEventListener('click', onloadMore);


function onSearch(e) {
    e.preventDefault();

   newsApiService.query = e.currentTarget.query.value;
   newsApiService.resetPage();
   newsApiService.fetchGallery().then(hits => {
    clearGalleryContainer();
    appendHitsMarkup(hits);
    newsApiService.incrementPage();
   });
  
    if (newsApiService.query === '') {
      return alert('🌸Введи что-то хорошее🌸 🙃😉');
    }
  
}

function onloadMore() {
    newsApiService.fetchGallery().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits))
}

function clearGalleryContainer() {
    refs.gallery.innerHTML = '';
}

const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && newsApiService.query !== '') {
       
        newsApiService.fetchGallery().then(hits => {
            appendHitsMarkup(hits);
            newsApiService.incrementPage();
        });
      }
    });
};
const options = {
    rootMargin: '150px',
}
const observer = new IntersectionObserver (onEntry, options);
observer.observe(refs.sentinel);





