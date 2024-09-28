import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { authAxios } from "../../middlewares/AxiosInstance";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [doctors, setDoctors] = useState([]);
  const [doctor,setDoctor] = useState()
  useEffect(() => {
    const getDoctors = async () => {
      try {
        dispatch(showLoading());
        const res = await authAxios.get("/doctor/get-all-doctors");
        dispatch(hideLoading());
        if (res.data) {
          setDoctors(res.data);
        }
      } catch {
        dispatch(hideLoading());
        console.log("failed to load data");
      }
    };
    getDoctors();
  }, [user]);


  useEffect(() => {


    const getDoctorInfo = async() => {
      try {
        dispatch(showLoading());
        const res = await authAxios.get("/doctor/get-doctor-info-by-userId/"+user._id);
        dispatch(hideLoading());
        if (res.data.success) {
          setDoctor(res.data.data);
        }
      } catch {
        dispatch(hideLoading());
        console.log("failed to load data");
      }
    }

    if(user?.isDoctor){
      getDoctorInfo()
    }
  },[user])

  const isUserADoctor = () => {
    if (user?.isDoctor) {

      return <>
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

      </>;
    } else {
      return (
        <>
          <h3>Book appointment</h3>
          <hr />
          <div className="search-wrapper">
            <label>Search by Doctor's name:</label>
            <input
              className="ms-2"
              type="text"
              placeholder="Enter name"
            ></input>
          </div>

          <div className="mt-4">
            {doctors.map((d) => {
              return (
                <div className="card mt-2" key={d.userId}>
                  <div className="card-body">
                    <h5 className="card-title">
                      {d.firstName + " " + d.lastName}
                    </h5>
                    <p className="card-text">{d.specialization}</p>
                    <p className="card-text">
                      {d.address}
                      <br />
                      {d.mobileNumber}
                    </p>

                    <a href={"/doctor/" + d.userId} className="btn btn-primary">
                      Get More Info
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  };

  return <Layout>{isUserADoctor()}</Layout>;
}

export default Home;
