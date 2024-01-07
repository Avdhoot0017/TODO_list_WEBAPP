const mongoose = require("mongoose")

const conn = async(req,res)=>{


    try {
    
        await mongoose.connect("mongodb+srv://avdhoot2550:Avdhoot@cluster0.at83lxo.mongodb.net/?retryWrites=true&w=majority").then(()=>{
            console.log("connectd to mongoose");
           });

        
    } catch (error) {

        throw error;
        // console.log(error);

    }

        
    


};


conn();




