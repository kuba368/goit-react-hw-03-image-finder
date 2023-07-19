import axios from 'axios';

const fetchImages = async (query, page) => {
  const API_KEY = '35276142-2bb78ec39400a28f997862a5f';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
  });
  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default fetchImages;
