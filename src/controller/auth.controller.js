const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")

async function registerUser(req,res)
{
    const {username,email,password,role="user"}=req.body;

    const isUserAlreadtExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadtExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hash,
        role
    })
    const token=jwt.sign({id:user._id,role:user.role},"767d0465d901b6abc333efe8b30b65c0")
    res.cookie("token",token)
    res.status(201).json({
        message:"User account created succesfully",
        user
    })

    
}

async function loginUser(req,res){
        const {username,email,password}=req.body;
        const user=await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })
        
        if(!user)
        {
            return res.status(401).json({
                message:"Invalid credentials"
            })

        }

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid password"
            })
        }
        const token = jwt.sign({id:user._id,role:user.role},"767d0465d901b6abc333efe8b30b65c0")
        res.cookie("token",token)

        res.status(201).json({
            message:"User login succesfully",
            user
        })

}


async function logout(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out "
    })
}




module.exports={registerUser,loginUser,logout}


