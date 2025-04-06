import express from 'express';
import {
  loginUser,
  registerAdmin,
  deleteAdmin,
} from '../controllers/auth.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Public Routes
router.post('/auth/login', loginUser);

// Admin Routes
router.post('/admin/add', /*authenticate, authorize('admin'),*/ registerAdmin);
router.delete('/admin/delete', authenticate, authorize('admin'), deleteAdmin);

export default router;
