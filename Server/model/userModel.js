import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role:{
            type:String,
            required:[true,'Role is required'],
            enum:['admin','organisation','donor','hospital']
        },
        name:{
            type:String,
            required:function(){
                if(this.role === 'donor' || this.role === 'admin'){
                    return true
                }
                return false
            }
        },
        organisation:{
            type:String,
            required:function(){
                if(this.role === 'organisation'){
                    return true
                }
                return false
            }
        },
        hospitalName:{
            type:String,
            required:function(){
                if(this.role === 'hospital'){
                    return true
                }
                return false
            }
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:true
        },
        password:{
            type:String,
            required:[true,'Password is required']
        },
        address:{
            type:String,
            required:[true,'Address is required']
        },
        phone:{
            type:String,
            required:[true,'Phone number is required']
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model('User',userSchema)