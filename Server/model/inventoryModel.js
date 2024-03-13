import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        inventoryType:{
            type:String,
            required:[true,'Inventory type required'],
            enum:['in','out']
        },
        bloodGroup:{
            type:String,
            required:[true,'Blood Group is required'],
            enum:['O+','O-','AB+','AB-','A+','A-','B+','B-']
        },
        quantity:{
            type:Number,
            required:[true,'Blood Quantity is required']
        },
        organisation:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:[true,'Organisation is required']
        },
        hospital:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:function(){
                return this.inventoryType === "out"
            }
        },
        donor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:function(){
                return this.inventoryType === "in"
            }
        }
    },
    {
        timestamps:true
    }
)

export default mongoose.model('Inventory',inventorySchema)