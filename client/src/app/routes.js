import Base from './base/presentation/Base.jsx';
import HomePage from './base/container/HomePage.jsx';
import DriversPage from './drivers/container/Drivers.jsx';
import CircuitsPage from './circuits/container/CircuitsPage.jsx';
import SearchResults from './search/container/Search.jsx';

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
      path: '/circuits',
      component: CircuitsPage
    }
  ]
}

export default Routes;
