// const jwt = require('jsonwebtoken');
// const secret ="EXPEXPEXP";
// const generateToken = (payload) => {

//     const token = jwt.sign(payload,secret,{
//         //1 min
//         expiresIn: '7d'

//     })
//     console.log(token)
//     return token
// }



// const validateToken =  (req,res,next)=>{

    
//     try{

//         var token = req.headers.authorization
//         if(token != undefined){

//             if(token.startsWith("Bearer")){
//                 token = token.split(" ")[1]
//                 //verify token
//                 constpayload = jwt.verify(token,secret)
//                 console.log("payload",payload)
//                 next()
                
//             }
//             else{
//                 res.status(401).json({
//                     message:"Token is not valid"
//                 })
//             }
//         }
//         else{
//             res.status(401).json({
//                 message:"User is not authorized to access this route"
//             })
//         }
         

//     }catch(err){
//         //console.log("error",err)

//         res.status(500).json({
//             message:"User is not authorized to access this route",
//             error:err
//         })

//     }


// }


// module.exports = {
//     generateToken,
//     validateToken
// }
