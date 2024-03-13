import userModel from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{
    try {
        const {email} = req.body
        const existingUser = await userModel.findOne({email})
        // validation
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User Is Already Exist'
            })
        }
        // hashing of password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        req.body.password = hashedPassword

        const user = new userModel(req.body)
        await user.save()

        user.password = undefined
        return res.status(201).json({
            success:true,
            message:'Registered successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error while register',
            error
        })
    }
}

const login = async (req,res)=>{
    try {
        const {email,password,role} = req.body
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:'Email or Password or role required',
            })
        }
        const user = await userModel.findOne({email})
        // validation
        if(!user){
            return res.status(404).json({
                success:false,
                message:'User Not Found'
            })
        }
        if(user.role!=role){
            return res.status(500).json({
                success:false,
                message:'Role does not match',
            })
        }
        // compare password
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(500).json({
                success:false,
                message:'Invalid Credentials'
            })
        }

        const token = jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )

        user.password = undefined
        return res.status(201).json({
            success:true,
            message:'Login successfully',
            token,
            user
        })
 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error while login',
            error
        })
    }
}

const currentUser = async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId}).select('-password')
        
        return res.status(200).json({
            success:true,
            message:'User fetched successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Error while Getting Current user',
            error
        })
    }
}

export {
    register,
    login,
    currentUser
}