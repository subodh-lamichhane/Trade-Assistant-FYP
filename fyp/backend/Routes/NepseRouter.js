import express from 'express';
import getNepseStock from '../Controllers/NepseController.js';

const router = express.Router();

router.get('/:symbol', getNepseStock);

export default router;
