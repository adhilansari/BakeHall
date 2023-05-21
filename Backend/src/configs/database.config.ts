import  {connect,ConnectOptions} from 'mongoose';

export const dbConnect=()=>{
    connect(process.env.MONGO_URL!,{
        useNewUrlParser: true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=> console.log("connected successfully"),
        (error)=>console.log(error)
        
        
    )
}


    // mongoose.connect(process.env.MONGO_URL!,{
    //     useNewUrlParser: true,
    //     useUnifiedTopology:true
    // } as ConnectOptions)

    // export const db= mongoose.connection;

