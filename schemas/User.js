const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    fullname:{type:String, required: true },
    username:{type:String, required: true },
    email:{type:String, required: true },
    password:{type:String, required: true },
    // confirmpassword:{type:String, required: true },
    phonenumber:{type:Number, required: true },
    role:{type:String, required: true },
    isBlocked:{type:Boolean, default: false },

    // userImage:{type:String },
    createdOn: {type:Date, default: Date.now},
})



userSchema.pre('save', async function(next) {
    try {
      // Generate a salt to add to the password before hashing it
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
  
      // Replace the plain text password with the hashed password
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
  
  
  
  

module.exports = mongoose.model("User", userSchema)
// fullname:"",
//     username:"",
//     email:"",
//     password:"",
//     confirmpassword:"",
//     phonenumber:"",