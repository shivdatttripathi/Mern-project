const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
// require("dotenv").config(); use for local
const userSecma = new mongoose.Schema({
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
  },
  date:{
    type:Date,
    default: Date.now()

  },
  messages: [
    {
      email: {
        type: String,
        
      },
      message:{
        type: String,
        

      },
    },
  ],

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSecma.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
// for token comment for not store token cookies method
userSecma.methods.generateAuth = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
   
    this.tokens = await this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    // res.send(error)
    // console.log("this is error page" + error);
  }

   token =await jwt.sign({_id:this._id},process.env.JWT_SECRET);
   this.tokens =await this.tokens.concat({token:token})
   await this.save()
   return token
};

//save contact message+



userSecma.methods.generateSaveMessage = async function (email,message) {
  // console.log(email,message);
  try {
    this.messages = await this.messages.concat({ email,message });
    await this.save();
    return this.messages;
  } catch (error) {
    // res.send(error)
    // console.log("this is error page" + error);
  }

};

const User = mongoose.model("user", userSecma);
module.exports = User;
