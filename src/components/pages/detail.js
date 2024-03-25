import fetchData from '../../api/api';
import { apiEndpoint } from '../../scripts/const';
import UrlParser from '../../scripts/routes/url-parser';
import '../organisms/item-detail';
import '../organisms/detail-skeleton';

const Detail = {
  async render() {
    return `
      <div id="detail-element"></div>
    `;
  },

  async afterRender() {
    const detailElement = document.querySelector('#detail-element');
    const skeletonElement = document.createElement('detail-skeleton');
    detailElement.appendChild(skeletonElement);

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const movie = await fetchData({ url: `${apiEndpoint.getDetail}/${url?.id}` });
      const restaurantDetailElement = document.createElement('item-detail');
      restaurantDetailElement.datas = movie?.restaurant;
      detailElement.innerHTML = '';
      detailElement.appendChild(restaurantDetailElement);
    } catch (error) {
      detailElement.innerHTML = `
        <div>
        <img 
          src='./images/vector/404.jpg'
          width="100"
          alt="404"
        />
      </div>
      `;
    }
  },
};

export default Detail;
