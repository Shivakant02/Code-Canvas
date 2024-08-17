import Code from "../models/code.model.js";

export const saveCode = async (req, res) => {
  try {
    const { fullCode } = req.body;
    const newCode = await Code.create({
      fullCode: fullCode,
    });

    return res.status(201).send({ url: newCode._id, status: "saved" });
  } catch (error) {
    return res.status(500).send({ message: "Error saving code", error });
  }
};
