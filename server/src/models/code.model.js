import { model, Schema } from "mongoose";

const codeSchema = Schema(
  {
    fullCode: {
      html: String,
      css: String,
      javascript: String,
    },
    title: { type: String, required: true },
    ownerInfo: { type: Schema.Types.ObjectId, ref: "User" },
    ownerName: String,
  },
  { timestamps: true }
);

const Code = model("code", codeSchema);
export default Code;
