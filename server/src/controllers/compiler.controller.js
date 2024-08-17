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

export const loadCode = async (req, res) => {
  const { urlId } = req.body;
  try {
    const existingCode = await Code.findById(urlId);
    console.log(existingCode);

    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }

    return res.status(200).send({ fullCode: existingCode.fullCode });
  } catch (error) {
    return res.status(500).send({ message: "Erro loading code", error });
  }
};
