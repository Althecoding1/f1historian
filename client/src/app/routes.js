import Base from './base/presentation/Base.jsx';
import HomePage from './base/container/HomePage.jsx';
import DriversPage from './drivers/container/Drivers.jsx';
import CircuitsPage from './circuits/container/CircuitsPage.jsx';
import SearchResults from './search/container/Search.jsx';
import News from './base/container/NewsPage.jsx';

const Routes = {
  component: Base,
  childRoutes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/drivers',
      component: SearchResults
    },
    {
      path: '/news',
      component: News
    }
  ]
}

export default Routes;
