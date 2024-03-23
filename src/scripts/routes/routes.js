import Detail from '../../components/pages/detail';
import Favorites from '../../components/pages/favorite';
import Home from '../../components/pages/home';

const routes = {
  '/': Home,
  '/detail/:id': Detail,
  '/favorite': Favorites,
};

export default routes;
