import bcryptjs from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import mongoose, { model, Schema } from "mongoose";
config();

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      required: [true, "email is required"],
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default:
        "https://th.bing.com/th/id/OIP.vvmpWt0qBu3LeBgZuUfmGAHaFt?rs=1&pid=ImgDetMain",
    },
    savedCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "code" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // const salt = genSalt();
  this.password = await bcryptjs.hashSync(this.password, 10);
});

UserSchema.methods = {
  comparePassword: async function (newPassword) {
    return await bcryptjs.compare(newPassword, this.password);
  },
  generateJWTToken: async function () {
    return await jwt.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.JWT_SECRET_KEY
    );
  },
};

const User = model("User", UserSchema);
export default User;
