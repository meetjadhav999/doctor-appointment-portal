import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";

import { authAxios } from "../../middlewares/AxiosInstance";

import { useNavigate } from "react-router-dom";

import { hideLoading, showLoading } from "../../redux/alertSlice";
import toast from "react-hot-toast";
import DoctorForm from "../../components/DoctorForm";

function UserProfile() {
  
    const {user}= useSelector((state)=>state.user)

  return (
    <Layout>
        {user && 
        <>
            <h1>{user.name}</h1>
            <hr />
            <p>
              <strong>Email :</strong>
              {user.email}
            </p>
            <a href="/notification">See notification</a>
            </>
        
        }
      
    </Layout>
  );
}

export default UserProfile;
