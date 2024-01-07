const router = require("express").Router();
const bcrypt = require("bcrypt");



const User = require("../models/user.js");

//signUp

router.post("/register", async (req,res)=>{

    try {

        const{email,username,password} = req.body;

        const user1 = await User.findOne({email:email});
        


        if(user1)
        {

            res.status(200).json({
                message: "User already exists !"
            })


        }
        else{
        const hashpass = bcrypt.hashSync(password,3);
        const user =  await new User({ email ,username, password:hashpass});
        await user.save().then(()=>
            
            res.status(200).json({
                user:user 
            })
        );

        }

        
    } catch (error) {

        

        res.status(400).json({
        
           
            message : "User already exists !",
            
        })

        // console.log(error);
         }

});

//signIN

router.post("/Login", async (req,res)=>{

    try {

        const user = await User.findOne({email: req.body.email});
        // console.log(user);
        
        if(!user){
            return res.status(200).json({
           
                message : "please register first !"
                
            });

        }

         const cpass = bcrypt.compareSync(req.body.password, user.password);
        if(!cpass){
            return res.status(200).json({
           
                 message : "invalid password !"
                    
            })
        }

        const { password , ...other} = user._doc;
        return res.status(200).json({other})

    } 
    catch (error) {

        return res.status(400).json({
           
            message : "User already exists !",
            
        })

        // console.log(error);
         }

})

module.exports = router;
