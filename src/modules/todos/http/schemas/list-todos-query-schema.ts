import { Joi } from 'celebrate';

export default Joi.object({
  page: Joi.number().min(0).default(0),
});
