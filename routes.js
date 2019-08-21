import Home from './components/Home/Home';
import Cases from './components/Cases/Cases';
import { getCases } from './components/Cases/services/cases';

/**
 * List of all the routes in the application
 * @type {{path: string, component: *}[]}
 */
const routes = [
  {
    path     : '/home',
    component: Home
  }, {
    path      : `/cases`,
    components: Cases,
    fetchData : getCases
  }
];

export default routes;
