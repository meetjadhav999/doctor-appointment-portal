import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { authAxios } from "../../middlewares/AxiosInstance";
import Layout from "../../components/Layout";
import { convertLegacyProps } from "antd/es/button/button";
import 'react-datepicker/dist/react-datepicker.css'
import { TimePicker,DatePicker } from "antd";
import toast from "react-hot-toast";
import axios from "axios";

function DoctorPage() {
  const dispatch = useDispatch();

  const queryParams = window.location.href.split("/");
  const id = queryParams[queryParams.length - 1];

  const [doctor, setDoctor] = useState();

  const [date,setDate] = useState(new Date())
  const [time,setTime] = useState([])

  useEffect(() => {
    const getDocInfo = async () => {
      try {
        dispatch(showLoading());
        const res = await authAxios.get(
          "/doctor/get-doctor-info-by-userId/" + id
        );
        setDoctor(res.data.data);

        dispatch(hideLoading());
        console.log(res.data.data);
      } catch (e) {
        dispatch(hideLoading());
        console.log("eror");
      }
    };
    getDocInfo();
  }, []);


  const bookAppointment = async() =>{
    try {

      dispatch(showLoading());
      const firstTimeInst = new Date(time[0])
      const secondTimeInst = new Date(time[1])
      const dateInst = new Date(date)
      console.log(dateInst.getDate())
      const response = await axios.post(
        "/api/appointments/bookappointment",
        { 
          time:[
            firstTimeInst.getHours()+":"+firstTimeInst.getMinutes()+":"+firstTimeInst.getSeconds(),
            secondTimeInst.getHours()+":"+secondTimeInst.getMinutes()+":"+secondTimeInst.getSeconds(),
          ],
          date:dateInst.getDate()+"/"+dateInst.getMonth()+"/"+dateInst.getFullYear(),
          doctorId:doctor._id,
          doctorName:doctor.firstName+" "+doctor.lastName
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  }


  const toggleModal = () =>{
    const modal = document.getElementById('confirm-modal')
    if(modal.style.display === "block"){
        modal.style.display = "none"
    } 
    else{
        modal.style.display = "block"
    }
  }

  return (
    <Layout>
      <h1>{doctor?.firstName + " " + doctor?.lastName}</h1>
      <hr />
      <p>
        <strong>Specialization :</strong>
        {doctor?.specialization}
      </p>
      <p>
        <strong>Experience :</strong>
        {doctor?.experience + " " + "years"}
      </p>
      <hr />
      <p>
        <strong>Address :</strong>
        {doctor?.address}
      </p>
      <p>
        <strong>Phone No :</strong>
        {doctor?.mobileNumber}
      </p>
      <hr />
      <p>
        <strong>Fee per Consultation :</strong>
        {doctor?.feePerConsultation}
      </p>
      <hr />




      <div className="modal" tabIndex="-1" id="confirm-modal" style={{backgroundColor:"69696980",display:"none"}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Appointment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleModal}
              ></button>
            </div>
            <div className="modal-body">
                <label>Select date</label>
                <br/>
                <DatePicker 
                    selected={date}
                    onChange={(date)=>{setDate(date)}}
                    minDate={new Date()}
                    
                >

                </DatePicker><br/>
              <label className="mt-2">Select time</label><br/>
                <TimePicker.RangePicker onChange={(time)=>setTime(time)}/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={bookAppointment}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal"
        onClick={toggleModal}
      >
        Get Appointment
      </button>
    </Layout>
  );
}

export default DoctorPage;
