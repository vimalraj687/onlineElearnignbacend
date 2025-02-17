import express from 'express';
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse
} from '../controllers/courseController.js';
import authMiddleware from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// ✅ Create a new course with image upload
router.post('/', authMiddleware, upload.single('image'), createCourse);

// ✅ Get all courses
router.get('/', getCourses);

// ✅ Get a single course by ID
router.get('/:id', getCourseById);

// ✅ Update a course by ID with image upload
router.put('/:id', authMiddleware, upload.single('image'), updateCourse);

// ✅ Delete a course by ID
router.delete('/:id', authMiddleware, deleteCourse);

export default router;
