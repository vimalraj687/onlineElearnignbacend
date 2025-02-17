import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    console.log(user, "user");
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove(); 
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};


// import User from '../models/User.js';
  // import bcrypt from 'bcryptjs';
  // import jwt from 'jsonwebtoken';
  // export const registerUser = async (req, res) => {
  //   const { name, email, password } = req.body;

  //   try {
  //     const userExists = await User.findOne({ email });
  //     if (userExists) return res.status(400).json({ message: 'User already exists' });

  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);

  //     const user = new User({ name, email, password: hashedPassword });
  //     await user.save();

  //     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  //     res.json({ token });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };

  // export const loginUser = async (req, res) => {
  //   const { email, password } = req.body;

  //   try {
  //     const user = await User.findOne({ email });
  //     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  //     const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  //     res.json({ token });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };

 
 

 

 