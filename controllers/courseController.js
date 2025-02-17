import Course from '../models/Course.js';
import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Create a new course with price, courseType & videoUrl
export const createCourse = async (req, res) => {
  let { title, description, instructor, lessons, price, courseType } = req.body;
  const image = req.file ? req.file.path : null; // Store image path if uploaded

  try {
    // Ensure lessons are parsed correctly
    if (typeof lessons === 'string') {
      lessons = JSON.parse(lessons);
    }

    const newCourse = new Course({
      title,
      description,
      instructor,
      lessons: lessons.map(lesson => ({
        title: lesson.title,
        content: lesson.content,
        videoUrl: lesson.videoUrl, // Include video URL
      })),
      price,
      // courseType,
      image,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'name');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update a course by ID
export const updateCourse = async (req, res) => {
  let { title, description, instructor, lessons, price } = req.body;
  const image = req.file ? req.file.path : req.body.image; // Keep old image if not updated

  try {
    // Ensure lessons are parsed correctly
    if (typeof lessons === "string") {
      lessons = JSON.parse(lessons);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        instructor,
        lessons: lessons.map(lesson => ({
          title: lesson.title,
          content: lesson.content,
          videoUrl: lesson.videoUrl, // Ensure video URL is updated
        })),
        price,
        // courseType,
        image
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    console.log("Deleting course with ID:", courseId);

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    console.log("Deleted course:", deletedCourse);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ message: err.message });
  }
};

export const uploadMiddleware = upload.single('image');
