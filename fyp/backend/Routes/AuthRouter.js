import { Router } from 'express';
import { signupValidation, loginValidation } from '../Middlewares/AuthValidation.js';
import { signup, login, updateUserProfile } from '../Controllers/AuthController.js'; // Added updateUserProfile import
import authenticate, { protect } from '../Middlewares/AuthMiddleware.js'; // Updated import

const router = Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.route('/profile').post(protect,updateUserProfile)

export default router;
