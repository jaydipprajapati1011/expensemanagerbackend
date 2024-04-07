const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyParser = require('body-parser');
const app = express()
app.use(cors());
const PORT = 4000;

app.use(express.json());
 //to enable data exchange betweem two different PORTS in localhost
// app.use(bodyParser.json());//to accept data in json formate from the body of the request

// connecting to db
// var db = mongoose.connect("mongodb://127.0.0.1:27017/expensemanager1011");
var db=mongoose.connect("mongodb+srv://jaydip1011:expenseexpenseexpense@cluster1.wqdhuli.mongodb.net/expensemanager1011");
db.then(() => {
  console.log("connected to mongodb");
}).catch((err) => {
  console.log(err);
});



// requiring all routes
const accountRoutes = require("./routes/AccountRoutes");
const userRoutes = require("./routes/UserRoutes");
const roleRoutes = require("./routes/RoleRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const subcategoryRoutes = require("./routes/SubCategoryRoutes");
const payeeRoutes = require("./routes/PayeeRoutes");
const transcationRoutes = require("./routes/TransactionRoutes");
const goalRoutes = require("./routes/GoalRoutes");
const groupRoutes = require("./routes/GroupRoutes");
const groupExpenseRoutes = require("./routes/GroupExpenseRoutes");
// const mailRoutes = require("./routes/MailRoutes");



// providing to server all routes
app.use("/accounts", accountRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/payees", payeeRoutes);
app.use("/transactions", transcationRoutes);
app.use("/goals", goalRoutes);
app.use("/groups",groupRoutes);
app.use("/groupexp",groupExpenseRoutes);
// app.use("/mail", mailRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});