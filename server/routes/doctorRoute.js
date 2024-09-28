const route = require('express').Router()
const doctor = require('../controllers/doctorController')
const auth = require('../middlewares/auth')

route.get('/get-doctor-info-by-userId/:id', auth, doctor.doctorInfo)

route.post('/update-doctor-info', auth, doctor.updateDoctorInfo)

route.get('/get-all-doctors',auth,doctor.getAllDoctors)

module.exports  = route;