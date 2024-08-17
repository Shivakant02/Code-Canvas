import { model, Schema } from "mongoose";

const codeSchema = Schema({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
});

export const Code = model("code", codeSchema);
