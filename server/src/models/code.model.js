import { model, Schema } from "mongoose";

const codeSchema = Schema({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
});

const Code = model("code", codeSchema);
export default Code;
