export const testController = (req,res) => {
    res.status(200).send({
        success:true,
        message:'Welcome to test route'
    })
}