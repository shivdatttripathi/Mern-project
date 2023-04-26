// require("dotenv").config();// local
const jwt = require("jsonwebtoken");
const User = require("../Model/user");
exports.validUserCheck = async (req, res, next) => {
if(!req.cookies.jwt){
  return res.status(401).json('not valid')
}
 
try {

//console.log('2')
  // console.log(req.cookies.jwt);
    const vaildToken = jwt.verify(req.cookies.jwt, 'MYSECERETMYNAMEWITHID');
 // console.log(vaildToken)
    const token = await req.cookies.jwt ;
    const fullUser =await User.findOne({_id:vaildToken._id, "tokens.token":token })
     if(!fullUser){
      // console.log('3')
     //console.log('2')
      // throw new Error('user not found')
     }
     req.token =token
     req.fullUser = fullUser
     req.UserId = vaildToken._id
  next()
   
} catch (error) {
  res.status(401).send("Unathorize provider")
    console.log(error)
}



};







//     console.log(req.headers.authorization,'authorization')
//   try {

//     if(!req.headers.authorization){
//         return res.json({msg:"notvalio" , status:"401"})
//     }
//     const vaildToken = jwt.verify(req.headers.authorization, 'MYSECERETMYNAMEWITHID');
//   console.log(vaildToken)
//     // console.log(req.cookies)
//     // const token = await req.cookies.jwt ;
//     // console.log(token);
//     //
//     // const fullUser =await User.findOne({_id:vaildToken._id, "tokens.token":token })
// //    console.log(fullUser)
//    next()
// } catch (error) {}

