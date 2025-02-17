import express from 'express';
import { registerUser, loginUser, getCurrentUser, updateUser, deleteUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected Routes (require authMiddleware)
router.get('/current-user', authMiddleware, getCurrentUser);
router.put('/update-user', authMiddleware, updateUser);
router.delete('/delete-user', authMiddleware, deleteUser);

export default router;


// import express from 'express';
// import {
// //   registerUser,
//   loginUser,
   
//   registerUser,
  
// } from '../controllers/userController.js';
 
// const router = express.Router();

// // Public Routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// export default router;
