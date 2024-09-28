const  Doctor = require("../models/doctorModel");

    
const doctorInfo = async (req, res) => {
  try {
      const doctor = await Doctor.findOne({ userId: req.params.id });

      if (!doctor) {
        return res
          .status(200)
          .send({ message: `can't load Doctor details `, success: false });
      } else {
        return res
          .status(200)
          .send({ message: "fetched doctor details successfully", success: true, data: doctor });
      }
    } catch (error) {
      res
        .status(401)
        .send({ message: "failed to get Doctor info", success: false, error });
    }
  };
const updateDoctorInfo = async (req, res) => {
console.log(req.body.userId);
  try {
      const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body, {new: true});

      if (!doctor) {
        return res
          .status(200)
          .send({ message: `Failed to Update Details `, success: false });
      } else {
        return res
          .status(200)
          .send({ message: "Updated ", success: true, data: doctor });
      }
    } catch (error) {
      res
        .status(401)
        .send({ message: "failed to update doctor details", success: false, error });
    }
  };

  const getAllDoctors = async(req,res)=>{
    try{
      const doctors = await Doctor.find({status:'Approved'})
      res.status(200).send(doctors)
    }
    catch(e){
      res.status(400).send({message:"Something went wrong"})
    }
  }

  module.exports = {
    getAllDoctors,
    doctorInfo,
    updateDoctorInfo
  }
