const API_KEY = '20766432-b82ef19051876e0d497c4164f';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchGallery() {
        console.log(this);
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&
        page=${this.page}&per_page=12&webformatURL&likes&views&downloads&comments&key=${API_KEY}`;

       const response = await fetch(url);
        const { hits } = await response.json();
        return hits;
    }

    incrementPage () {
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