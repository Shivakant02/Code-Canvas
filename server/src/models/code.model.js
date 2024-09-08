import { model, Schema } from "mongoose";

const codeSchema = Schema({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
  ownerInfo: { type: Schema.Types.ObjectId, ref: "User" },
  ownerName: String,
});

const Code = model("code", codeSchema);
export default Code;
