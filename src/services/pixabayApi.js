import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '24778312-18f63a423fbed9787418fdc16';

function fetchImages(imageName, currentPage) {
  return axios
    .get(
      `?q=${imageName}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
}

export default { fetchImages };
