const User = require(`../models/user`);
const Contact = require("../models/contact-model");

// get alll the user
const getAllUsers=async(req,res)=>{
    try {
        const users= await User.find({},{password:0})
        if(!users || users.length===0){
            return res.status(404).json({message:"useres not found"})
        }
        return res.status(200).json(users)
    } catch (error) {
       console.log(error);
       res.status(500).send(error)
       
    }
}

// get alll the contact

const getAllContact=async(req,res)=>{
    try {
        const contacts= await Contact.find({},{password:0})
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"useres not found"})
        }
        return res.status(200).json(contacts)
    } catch (error) {
       console.log(error);
       res.status(500).send(error)
       
    }
}
// get the user by id
const getUserById=async(req,res)=>{
    try {
        const id= req.params.id
       const data = await User.findOne({_id:id},{password:0})
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error})
    }
    }
// delete the user by id
const deleteUserById=async(req,res)=>{
try {
    const id= req.params.id
    await User.deleteOne({_id:id})
    res.status(200).json({message:"User Delete Successfully"})
} catch (error) {
    res.status(400).json({message:error})
}
}

module.exports={getAllUsers,getAllContact,deleteUserById,getUserById}