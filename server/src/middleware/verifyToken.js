import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  console.log(decoded);

  if (!decoded) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = decoded;
  next();
};
