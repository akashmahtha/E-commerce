import Signup from "../../models/signup.model.js";
import bcrypt from "bcrypt";

// ✅ SIGNUP
export const createSignup = async (req, res) => {
  try {
    const { email, firstName, lastName, phoneNO, password, confirmPassword } = req.body;

    // check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // check existing user
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const createdUser = await Signup.create({
      email,
      firstName,
      lastName,
      phoneNO,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      data: createdUser
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
};


