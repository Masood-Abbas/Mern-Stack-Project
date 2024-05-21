const mongoose=require(`mongoose`)

const URL=process.env.MONGO_URL
 const connectdb=(async()=>{
    try {
        await mongoose.connect(URL)
        console.log(`connection successfully`);
    } catch (error) {
        console.log(`connection error`+ error)
        process.exit(0)
    }
 })
module.exports=connectdb