import axios from 'axios';
import ItemEntity from './entity';

class ItemService {
  static getItems() {
    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response =>
        response.data.slice(0, 20).map(item => new ItemEntity(item.id, item.title, item.body)),
      );
  }
}

export default ItemService;
