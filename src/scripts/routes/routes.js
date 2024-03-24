import Detail from '../../components/pages/detail';
import Favorite from '../../components/pages/favorite';
import Home from '../../components/pages/home';

const routes = {
  '/': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
