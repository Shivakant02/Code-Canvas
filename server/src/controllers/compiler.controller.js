import Code from "../models/code.model.js";
import User from "../models/user.model.js";

export const saveCode = async (req, res) => {
  try {
    const { fullCode, title } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    let ownerName = user?.username;
    let ownerInfo = user._id;

    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
      return res.status(400).send({
        message: "Code cannot be blank",
      });
    }
    const newCode = await Code.create({
      fullCode: fullCode,
      ownerName: ownerName,
      ownerInfo: ownerInfo,
      title: title,
    });

    user?.savedCodes.push(newCode._id);
    await user.save();

    // console.log(user);

    return res.status(201).send({ url: newCode._id, status: "saved" });
  } catch (error) {
    return res.status(500).send({ message: "Error saving code", error });
  }
};

export const loadCode = async (req, res) => {
  const { urlId } = req.body;
  try {
    const existingCode = await Code.findById(urlId);
    // console.log(existingCode);

    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }

    return res.status(200).send({ fullCode: existingCode.fullCode });
  } catch (error) {
    return res.status(500).send({ message: "Erro loading code", error });
  }
};
