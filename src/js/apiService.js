const API_KEY = '20766432-b82ef19051876e0d497c4164f';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 12;
    }

    fetchGallery() {
        
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}
        &per_page=${this.per_page}&page=${this.page}&webformatURL&likes&views&downloads&comments&key=${API_KEY}`;

       return fetch(url)
       .then(response => response.json())
       .then(({hits}) => {
        this.incrementPage();
        return hits;
       });
        
    }

    incrementPage() {
        this.page += 1;
    }
    
    resetPage() {
       this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}