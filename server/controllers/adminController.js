const Doctor = require("../models/doctorModel.js")
const User = require("../models/userModel")

const getUsersList = async(req, res) => {
    try {
        const userData = await User.find()
if (userData) {
    
    res.status(200).send({message: 'User List Loaded', success: true, data: userData})
} else {
    
    res.status(200).send({message: 'Failed to load userList - server', success: false})
}


    } catch (error) {
        res.status(500).send({message: 'Error while getting user List', success: false, error})
    }
}
const getDoctorsList = async(req, res) => {
    try {
        const userData = await Doctor.find()
if (userData) {
    
    res.status(200).send({message: 'User List Loaded', success: true, data: userData})
} else {
    
    res.status(200).send({message: 'Failed to load userList - server', success: false})
}


    } catch (error) {
        res.status(500).send({message: 'Error while getting user List', success: false, error})
    }
}


const approveDoctor = async(req,res)=>{
    try{
        if(req.user.isAdmin){
            const doc = await Doctor.findById(req.params.id)
            doc.status = "Approved"
            const user = await User.findById(doc.userId)
            user.isDoctor = true
            await user.save()
            await doc.save()
            res.status(200).send({message:"Doctor approved!"})
        }
        else{
            res.status(400).send({message:"You are not an Admin"})
        }        
    }
    catch(e){
        res.status(400).send({message:'something went wrong'})
    }
}
module.exports = {
    getUsersList,
    getDoctorsList,
    approveDoctor
}