import { Router } from 'express';
import * as userCtrl from '../controllers/userController.js';
import verifyJwt from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/', verifyJwt, userCtrl.getAll); // RUTA PROTEGIDA

export default router;