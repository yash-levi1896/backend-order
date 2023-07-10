const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    
        
        name: String,
        email: String,
        password: String,
        address: {
          street: String,
          city: String,
          state: String,
          country: String,
          zip: String
        }
      
})

const UserModel=mongoose.model("user",userschema);

module.exports={UserModel}

