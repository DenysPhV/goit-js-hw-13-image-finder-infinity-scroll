// https://pixabay.com/api/?key=22979201-d3b88ee555cfd640fb3d2f529&q=yellow+flowers&image_type=photo&pretty=true

const BASE_URL = 'https://pixabay.com/api/';
const KEY_ACC = '22979201-d3b88ee555cfd640fb3d2f529';

class ServiceImage {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImage() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      language: 'en',
      per_page: 9,
      page: this.page,
    });

    const url = `${BASE_URL}?${searchParams}&key=${KEY_ACC}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(({ hits }) => {
        this.getPage();
        return hits;
      });
  }

  getPage() {
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

export default ServiceImage;
