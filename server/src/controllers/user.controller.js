import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  sameSite: "none",
  secure: true,
  httpOnly: true,
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return next(new AppError("All fields are required", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      email: email,
      password: password,
      username: username,
    });

    await user.save();

    const jwtToken = await user.generateJWTToken();

    user.password = undefined;

    res.cookie("token", jwtToken, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!(user && (await user.comparePassword(password)))) {
      return res.status(400).json({
        message: "Email or password incorrect or user does not exists",
      });
    }

    const jwtToken = await user.generateJWTToken();

    user.password = undefined;

    res.cookie("token", jwtToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "user logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging out",
    });
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    return next(new AppError("Can not fetch user details", 500));
  }
};
