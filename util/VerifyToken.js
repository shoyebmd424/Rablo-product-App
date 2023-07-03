import JWT from "jsonwebtoken";
export const verifyUser = async (req, res, next) => {
  try {
    const isToken = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = isToken;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(403)
      .send({ success: false, message: "You are not autheticated" });
  }
};
