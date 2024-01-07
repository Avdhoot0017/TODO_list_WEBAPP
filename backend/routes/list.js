const router = require("express").Router();

const User = require("../models/user");
const List = require("../models/list");
const list = require("../models/list");

//create
router.post("/addTask", async(req,res)=>{
    try {

    const {title,body,id} = req.body;
    const userExist = await User.findById(id);
    if(userExist)
    {
        const list = new List({title,body,user: userExist});
        await list.save().then(()=>

         res.status(200).json({list}));
         
        userExist.list.push(list);
        userExist.save();
        
    }
        
    } catch (error) {

        return res.status(400).json({
           
            message : "User already exists !",
            
        })

        // console.log(error);
         
        
    }

});


//update

router.put("/updateTask/:id", async(req,res)=>{
    try {

        const {title,body,email} = req.body;
    const userExist = await User.findOne({email});
    if(userExist)
    {
       const list = await List.findByIdAndUpdate(req.params.id, {title,body});
       list.save().then(()=> res.status(200).json({messsage: "list updated sucessfully>>>"}));

        
    }
        
    } catch (error) {

        return res.status(400).json({
           
            message : "User already exists !",
            
        })

        // console.log(error);
         
        
    }

});


//delete
router.delete("/deleteTask/:id", async(req,res)=>{
    try {

        // console.log("i am inside delete");

    const { id } = req.body;
    // console.log(id);
    const userExist = await User.findByIdAndUpdate(id, {$pull: {list:req.params.id}});

    if(userExist)
    {
        await List.findByIdAndDelete(req.params.id)
       .then(()=> res.status(200).json({messsage: "list deleted sucessfully>>>"}));

        
    }
        
    } catch (error) {

        return res.status(400).json({
           
            message : "User already exists !",
            
        })

        // console.log(error);
         
        
    }

});

//read
router.get("/gettasks/:id" , async(req,res)=>{
    try {

        const list = await List.find({user: req.params.id}).sort({createdAt: -1});

       if(list.length !== 0)
       {
        return res.status(200).json({list});
       }
       else
       {
        return res.status(200).json({ message : "no task found>>>" });
       }
        
    } catch (error) {

        return res.status(400).json({
           
            message : "User already exists !",
            
        })

        // console.log(error);
         
        
    }

})





module.exports = router