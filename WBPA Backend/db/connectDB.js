import mongoose from 'mongoose';

const connectDB = async()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI)

        if(res){
            console.log('Database connected');
        } else {
            console.log('Something went wrong');
        }
    } catch (error) {
        console.error('ERROR ',error.message);
        process.exit(1);
    }
}

export default connectDB