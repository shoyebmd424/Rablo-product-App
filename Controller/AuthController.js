import UserSchame from "../Model/UserSchame.js";
import userschema from "../Model/UserSchame.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const user = new userschema({
      ...req.body,
      password: hash,
    });
    await user.save();
    res
      .status(200)
      .send({ success: true, message: "user register successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong pleae try again",
    });
  }
};

// login
export const login = async (req, res) => {
  try {
    //check user
    const user = await UserSchame.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registerd",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// forget password
export const forgotpassword = async (req, res) => {
  const { username, answer, newPassword } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(newPassword, salt);
  try {
    //check
    const user = await UserSchame.findOne({ username, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    await UserSchame.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// check
export const check = (req, res) => {
  res.send("protected routes");
};
