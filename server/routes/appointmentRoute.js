const express = require("express");
const auth = require("../middlewares/auth");
const appointmentController = require("../controllers/appointmentController");

const appointRouter = express.Router();

appointRouter.get(
  "/getallappointments",
  auth,
  appointmentController.getallappointments
);

appointRouter.post(
  "/bookappointment",
  auth,
  appointmentController.bookappointment
);

appointRouter.put("/completed", auth, appointmentController.completed);
appointRouter.put("/approved", auth, appointmentController.approved);
appointRouter.post("/decline", auth, appointmentController.decline);
appointRouter.post("/cancel", auth, appointmentController.cancel);


module.exports = appointRouter;