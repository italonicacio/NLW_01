import express from 'express'
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/points_controller';
import ItemsController from './controllers/items_controller';


// index, show, create, update, delete
const routes = express.Router();
const upload = multer(multerConfig);

const points_controller = new PointsController();
const items_controller = new ItemsController();



routes.get('/items', items_controller.index);
routes.get('/points', points_controller.index);
routes.get('/points/:id', points_controller.show);

routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),

        })
    }, {
        abortEarly: false
    }),
    points_controller.create
);





export default routes;