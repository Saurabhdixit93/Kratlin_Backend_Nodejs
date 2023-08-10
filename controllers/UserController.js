const { generateJwtToken } = require("../middlewares/generateToken");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const newAccount = async (req, res) => {
  const { name, password, email, confirmPassword } = req.body;
  // Regular expressions for validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation checks
  if (!name || !password || !email || !confirmPassword) {
    return res.json({
      message: "All fields are required",
      success: false,
    });
  }

  if (!nameRegex.test(name)) {
    const error = new ValidationFailedError("Invalid name format");
    return next(error);
  }

  if (!passwordRegex.test(password)) {
    return res.json({
      message:
        "Password must contain at least 8 characters including uppercase, lowercase, and a digit",
      success: false,
    });
  }
  if (!emailRegex.test(email)) {
    return res.json({
      message: "Invalid email format",
      success: false,
    });
  }
  if (password !== confirmPassword) {
    return res.json({
      message: "Passwords do not match",
      success: false,
    });
  }
  const validEmail = email.toLowerCase();
  try {
    const user = await UserModel.findOne({ email: validEmail });
    if (user) {
      return res.json({
        success: false,
        message: "User Already exists with this email",
      });
    }
    // hashing the password before saving in db
    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = await new UserModel({
      email: validEmail,
      password: hashedPassword,
      name: name,
    });
    // saaving details in db
    await newUser.save();
    // Remove password from the user object
    newUser.password = undefined;
    return res.json({
      success: true,
      message: "Account Created Successfully",
     
    });
  } catch (error) {
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  // Convert email to lowercase for case-insensitive comparison
  const validEmail = email.toLowerCase();
  try {
    const userLogged = await UserModel.findOne({ email: validEmail });
    if (!userLogged) {
      return res.json({
        success: false,
        message:
          "User Email Not Found or User Does Not Exist,Please Create New Account",
      });
    }
    // Verify the password
    const passwordMatch = await bcrypt.compare(password, userLogged.password);
    if (!passwordMatch) {
      return res.json({
        success: false,
        message: "Incorrect Password Try Again !",
      });
    }

    // creaate token here
    const token = await generateJwtToken(
      userLogged._id,
      userLogged.name,
      userLogged.email
    );
    return res.json({
      success: true,
      message: "Logged in successfull",
      token: token,
    });
  } catch (error) {
    console.log("Error in login",error);
    return res.json({
      message: "Internal Server Error !!",
      success: false,
    });
  }
};

module.exports = {
  newAccount,
  logInUser,
};
