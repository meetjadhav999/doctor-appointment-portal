const express   = require('express');
const route = express.Router()
const admin = require('../controllers/adminController')
const auth = require('../middlewares/auth')

route.get('/get-user-list', auth, admin.getUsersList)
route.get('/get-doctor-list', auth, admin.getDoctorsList)
route.post('/approve-doctor/:id',auth, admin.approveDoctor)

module.exports = route;
