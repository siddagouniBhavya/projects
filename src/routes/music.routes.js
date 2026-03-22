const express=require("express")
const musicController=require("../controller/music.controller")
const  multer=require("multer")

const upload =multer({
    storage:multer.memoryStorage()
})
const router=express.Router()
router.post("/createmusic",upload.single("music"),musicController.createMusic)



module.exports=router;