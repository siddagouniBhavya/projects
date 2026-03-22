const mongoose=require("mongoose")


async function connectDb(){
    try{
            await mongoose.connect("mongodb://Database_backend:bhavya005@ac-iy8bmth-shard-00-00.jdsnfex.mongodb.net:27017,ac-iy8bmth-shard-00-01.jdsnfex.mongodb.net:27017,ac-iy8bmth-shard-00-02.jdsnfex.mongodb.net:27017/?ssl=true&replicaSet=atlas-csoe9g-shard-0&authSource=admin&appName=DbTutorial")
            console.log("database connected successfully")

    }
    catch(err){
        console.log("Error caught ",err)
    }
}

module.exports=connectDb;