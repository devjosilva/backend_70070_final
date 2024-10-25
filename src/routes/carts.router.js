import { Router } from 'express';
import cartService from '../services/cart.service.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/:cid/purchase', authenticate, cartService.purchase);

export default router;
