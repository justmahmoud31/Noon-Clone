import {User} from '../../database/models/user.js';
import { AppError } from '../utils/AppError.js';
export const checkMail = async (req, res, next) => {
  const isFound = await User.findOne({ where: { email: req.body.email } })
  if (isFound) return next(new AppError("Email Already Exists",409));
  next();
}
