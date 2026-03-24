import Signup from "../../models/signup.model.js";
import bcrypt from "bcrypt";

export const getSignin = async (req, res) => {
    console.log("🔍 Signin Attempt:", req.body);
  try {
    const { email, password } = req.body;

    console.log("📩 Request Body:", req.body);

    const user = await Signup.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("📩 Password Match:", isMatch);
    

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("✅ Login Success:", user.email);

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error("🔥 SERVER ERROR:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};