const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://dbmohib:mohib123@mohib1.ukqz2.mongodb.net/?retryWrites=true&w=majority&appName=mohib1")
const userSchema=mongoose.Schema({
    name:String,
    age:Number,
    degree:String
});
module.exports=mongoose.model("user",userSchema);