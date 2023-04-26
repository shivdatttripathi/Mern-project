const bcrypt = require("bcrypt");
const User = require("../Model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.userget = (req, res) => {
  res.send("hello Hom").end();
};

exports.UserRegister = async (req, res) => {
  const { fullName, phone, email, password } = await req.body;
  if (!fullName || !phone || !email || !password) {
    return res.json({ error: "please field data" }).status(422);
  }
  try {
    const users = await User.findOne({ email: email });
    if (users) {
      return res.json({ error: " Data Alredy Exsist" }).status(422);
    }

    // console.log("hello3");

    const user = new User({ fullName, phone, email, password });
    const userRegister = await user.save();
    if (userRegister) {
      res.json(userRegister).status(201);
    }
  } catch (error) {
    // console.log(error);
    res.end();
  }
};

exports.UserLogin = async (req, res) => {
  const { email, password } = await req.body;
  // console.log(email, password);

  try {
    const users = await User.findOne({ email: email });
    if (!users) {
      return res.json("NotValid");
    }
    const isMatch = bcrypt.compare(password, users.password);

    if (!isMatch) {
      // console.log("user match but password not match");
      return res.json("NotValid");
    }
    const token = await users.generateAuth();

     console.log(token)
    await res.cookie("jwt", token, {
      expires: new Date(Date.now() + 7200000),
      httpOnly: true,
    });

    // const token = jwt.sign({id:users.__id},process.env.JWT_SECRET,{
    //   expiresIn:"1d"

    // })

    res.json({ msg: "Login done", token });
  } catch (error) {
    // console.log(error);
  }
};

exports.DataCheck = async (req, res) => {
  res.send(req.fullUser).end;
};


exports.ContactSave = async (req, res) => {
  const { email, message } = await req.body;

  try {
    const users = await User.findOne({ _id: req.UserId });
    if (!users) {
      return res.json("NotValid");
    }

     const msg = await users.generateSaveMessage(email, message);
    return res.json({msg,code:201})
  } catch (error) {
    // console.log(error);
  }
};

//logout
exports.Logout =async(req,res)=>{
  res.clearCookie('jwt')
  return res.json(202)


}