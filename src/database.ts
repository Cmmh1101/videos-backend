import mongoose from 'mongoose'
import config from './config'

(async () => {
    try
    {
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
        // const newdb = await mongoose.connect(`mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
        console.log('videos database is connected to:', db.connection.name)
    } catch (error) 
    {
        console.log(error)
    }
    
    
})()




