import inventoryModel from "../model/inventoryModel.js";
import userModel from "../model/userModel.js";

const createInventory = async(req,res)=>{
    try {
        const {email,inventoryType} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error('User not found')
        }

        if(inventoryType === "in" && user.role!=='donor'){
            throw new Error('Not a donor account')
        }

        if(inventoryType === "out" && user.role!=='hospital'){
            throw new Error('Not a donor account')
        }

        const inventory = new inventoryModel(req.body)
        await inventory.save()

        return res.status(201).json({
            success:true,
            message:'New Blood Record Addded'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error While Creating Inventory',
            error
        })
    }
}

const getInventory = async(req,res)=>{
    try {
       const inventory = await inventoryModel.find({organisation:req.body.userId}).populate('donor').populate('hospital').sort({createdAt:-1}) 
       return res.status(200).json({
        success:true,
        message:"Get All Records successfully",
        inventory
       })
    } catch (error) {
        return console.log(error);
        res.status(500).json({
            success:false,
            message:'Error While Getting Inventory',
            error
        })
    }
}

export {
    createInventory,
    getInventory
}