

const valid=(Schema)=>async(req,res,next)=>{
    try {
        const parsBody= await Schema.parseAsync(req.body) 
        req.body=parsBody
        next()
    } catch (err) {
        // console.log(err);
        const status=401
        const message= err.errors[0].message
        const error={
            status,
            message
        }
        // res.status(400).json({msg:message})
        console.log(error);
        next(error)
    }
}

module.exports=valid