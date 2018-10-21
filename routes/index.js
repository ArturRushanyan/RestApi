
import Item from './item/item';
import User from './user/user';
import Authentication from './authentication/authentication';
import Search from './search/search';

const getItemRoutes = (app) => {
  app.use('/api/V1/item', Item);
  app.use('/api/V1/user', User);
  app.use('/authentication', Authentication);
  app.use('/search', Search);
};

export default getItemRoutes;
