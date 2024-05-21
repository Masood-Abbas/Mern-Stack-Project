const Service=require("../models/service-model")

const services=async(req,res)=>{
    const resp=await Service.find()
    if(!resp){
        res.status(404).json({msg:"No Services found"})
    }
    return res.status(200).json({msg:"services found", data:resp})
}
module.exports=services