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

export const getMyCodes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "savedCodes",
      options: { sort: { createdAt: -1 } },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user.savedCodes);
  } catch (error) {
    return res.status(500).send({ message: "Error getting codes", error });
  }
};

export const deleteCode = async (req, res) => {
  try {
    const owner = await User.findById(req.user.id);
    if (!owner) {
      return res.status(404).send({ message: "user not found" });
    }

    const { id } = req.params;
    const code = await Code.findById(id);
    if (!code) {
      return res.status(404).send({
        message: "code not found",
      });
    }

    if (owner.username !== code.ownerName) {
      return res.status(400).send({
        success: false,
        message: "you don't have permission to delete the code",
      });
    }

    const delCode = await Code.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "code deleted successfully",
      delCode,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting code",
      error,
    });
  }
};
