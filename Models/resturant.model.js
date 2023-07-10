const mongoose=require('mongoose');

const restschema=mongoose.Schema({
    
        
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      name: String,
      description: String,
      price: Number,
      image: String
    }]
      
})

const ResturantModel=mongoose.model("resturant",restschema);

module.exports={ResturantModel}