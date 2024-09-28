import React, { useEffect, useState } from "react";
import { authAxios } from "../middlewares/AxiosInstance";
import axios from "axios";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import Layout from "../components/Layout";
import { Table } from "antd";

function DoctorsList() {
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await authAxios.get("/admin/get-doctor-list");

      dispatch(hideLoading());
      if (res.data.data) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log("failed to laod doctor list");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const approveDoctor = async(id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/approve-doctor/"+id,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.status === 200) {
        toast.success(response.data.message);
        getUserData()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => <span className="normal-text">{record.firstName} {record.lastName}</span>
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
            {record.status === 'Pending' && <h1 className="anchor cursorPointer" onClick={()=>approveDoctor(record._id)}>Approve</h1>}
            {record.status === 'Approved' && <h1 className="anchor cursorPointer">Block</h1>}
          
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-title">Doctor's List</h1>
      <Table columns={columns} dataSource={doctor} />
    </Layout>
  );
}

export default DoctorsList;
