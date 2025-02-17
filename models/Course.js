import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lessons: [
    {
      title: String,
      content: String,
      videoUrl: String, // Added video URL for each lesson
    },
  ],
  price: { type: Number, required: true }, // Added price field
  // courseType: { type: String, enum: ["Free", "Paid"], required: true }, // Added course type
  image: { type: String, required: true }, // Image field remains the same
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
