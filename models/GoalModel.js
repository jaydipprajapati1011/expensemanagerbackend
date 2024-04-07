const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GoalSchema = new Schema({
 
  User:{
    type: Schema.Types.ObjectId,
    ref:"User",
},

goalName:{
    type:String
},

goalAmount:{
    type:Number
},

startDate:{
    type:Date
},

endDate:{
    type:Date
},

})

module.exports = mongoose.model("Goal", GoalSchema);