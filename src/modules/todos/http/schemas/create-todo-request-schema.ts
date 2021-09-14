import { Joi } from 'celebrate';

export default Joi.object({
  body: Joi.string().min(5).max(150).required(),
});
