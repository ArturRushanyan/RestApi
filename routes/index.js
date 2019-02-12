import Item from './item/item';
import User from './user/user';
import Authentication from './authentication/authentication';
import Search from './search/search';
import Buy from './buy/buy';
import Reset from './resetDebt/resetDebt';

const getItemRoutes = (app) => {
  app.use('/api/v1/item', Item);
  app.use('/api/V1/user', User);
  app.use('/api/v1/buy', Buy);
  app.use('/api/v1/reset', Reset);
  app.use('/authentication', Authentication);
  app.use('/search', Search);
};

export default getItemRoutes;
