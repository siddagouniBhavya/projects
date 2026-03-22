const musicModel = require("../models/music.model")
const jwt=require("jsonwebtoken")
const {musicUpload, uploadFile}=require("../servicces/storage.service")

async function createMusic(req,res){
    const token=req.cookies.token;  
    if(!token){
        return res.status(401).json({
            message:"Token not found"
        })
    }
    try{
        const decoded=jwt.verify(token,"767d0465d901b6abc333efe8b30b65c0")
        if(decoded.role!=="artist"){
            return res.status(403).json({
                messgae:"Not have access to create music"
            })
        }
    
 


    const {title}=req.body;
    const file=req.file;

    const result =await uploadFile(file.buffer.toString("base64"))

    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })

    res.status(201).json({
        message:"Music created successfully",
        music :{
            id :music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist,
            
        }
    })
}
       catch(err){
        console.log(err);
    }
}

module.exports={createMusic}