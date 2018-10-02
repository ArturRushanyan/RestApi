
import Item from './item/item';
import User from './user/user';
import Authentication from './authentication/authentication';

const getItemRoutes = (app) => {

    app.use('/api/V1/item', Item);
    app.use('/api/V1/user', User);
    app.use('/authentication', Authentication);
    
};

export default getItemRoutes;
