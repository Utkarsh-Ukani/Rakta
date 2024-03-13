import jwt from 'jsonwebtoken'

export default async (req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(error,decode)=>{
            if(error){
                return res.status(401).json({
                    success:false,
                    message:'Auth Failed'
                })
            }else{
                req.body.userId = decode.userId
                next()
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Auth Failed'
        })
    }
}