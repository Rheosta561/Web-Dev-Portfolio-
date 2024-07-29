const { name } = require('ejs');
const mongoose=require('mongoose');
// connecting the database 

mongoose.connect(`mongodb://127.0.0.1:27017/authenticapp`);

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    image: String,
    password: String
});

module.exports=mongoose.model("user", userSchema);