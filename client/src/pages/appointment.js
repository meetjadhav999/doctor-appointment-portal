import Layout from "../components/Layout";
import React,{useEffect, useState} from "react";
import "../App.css";
import { Table } from "antd";
import { authAxios } from "../middlewares/AxiosInstance";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { useDispatch } from "react-redux";

function Appointment() {
  const dispatch = useDispatch()
  const [appointments,setAppointments] = useState([])
  const {user} = useSelector((state => state.user))

  useEffect(()=>{
    getAppointments()

  },[])
  const getAppointments = async() => {
    try{
      const res = await authAxios.get('/appointments/getallappointments')
      if(res.data.success){
        setAppointments(res.data.data)
        console.log(res.data.data)
      }
    }catch(e){
      console.log('something went wrong') 
    }
  }

  const acceptApppointment = async(id) =>{
    try{
      dispatch(showLoading())
      const res = await axios.put('/api/appointments/approved',{
        appointid:id
      },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      })
      dispatch(hideLoading())
      if(res.data.success){
        toast.success(res.data.message)
        getAppointments()
      }
      else{
        toast.error(res.data.message)
      }
  }catch(e){
    dispatch(hideLoading())
    toast.error("something went wrong")
  }
  }

  const completeApppointment = async(id) =>{
    try{
      dispatch(showLoading())
      const res = await axios.put('/api/appointments/completed',{
        appointid:id
      },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      })
      dispatch(hideLoading())
      if(res.data.success){
        toast.success(res.data.message)
        getAppointments()
      }
      else{
        toast.error(res.data.message)
      }
  }catch(e){
    dispatch(hideLoading())
    toast.error("something went wrong")
  }
  }

  const declineApppointment = async(id) =>{
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/appointments/decline',{
        appointid:id
      },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      })
      dispatch(hideLoading())
      if(res.data.success){
        toast.success(res.data.message)
        getAppointments()
      }
      else{
        toast.error(res.data.message)
      }
  }catch(e){
    dispatch(hideLoading())
    toast.error("something went wrong")
  }
  }
  const cancelApppointment = async(id) =>{
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/appointments/cancel',{
        appointid:id
      },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      })
      dispatch(hideLoading())
      if(res.data.success){
        toast.success(res.data.message)
        getAppointments()
      }
      else{
        toast.error(res.data.message)
      }
  }catch(e){
    dispatch(hideLoading())
    toast.error("something went wrong")
  }
  }

  const actionButtons = (record) =>{
    if(!user?.isDoctor){
      return(
        <div>

          {record.status !== 'Completed' && <h1 className="anchor cursorPointer" onClick={()=>cancelApppointment(record._id)}>Cancle</h1>}

        </div>
      )
    }
    else{
      return(
        <div>
        {record.status === 'Pending' && <div className="d-flex align-items-center"><h1 className="anchor cursorPointer" onClick={()=>acceptApppointment(record._id)}>Accept</h1><h1 className="anchor cursorPointer ms-2" onClick={()=>declineApppointment(record._id)}>Decline</h1></div>}
        {record.status === 'Approved' && <div className="d-flex align-items-center"><h1 className="anchor cursorPointer" onClick={()=>completeApppointment(record._id)}>Complete</h1><h1 className="anchor cursorPointer ms-2" onClick={()=>cancelApppointment(record._id)}>Cancle</h1></div>}

        </div>
      )

    }
  }

  const columns = [
    {
      title: user.isDoctor ? "User Name":"Doctor Name",
      dataIndex: "username",
      render: (text, record) => user.isDoctor ? <span className="normal-text">{record.username}</span> : <span className="normal-text">{record.doctorName}</span>
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text, record) => <span className="normal-text">{record.time[0]} to {record.time[1]}</span>
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {actionButtons(record)}
          
        </div>
      ),
    },
  ];
  
  return (
    <Layout>
      <Tabs>
        <items tab='Pending' key={0}>
        <Table columns={columns} dataSource={appointments.pending}></Table>

        </items>
        <items tab='Approved' key={1}>
        <Table columns={columns} dataSource={appointments.approved}></Table>

        </items>
        <items tab='Completed' key={2}>
        <Table columns={columns} dataSource={appointments.completed}></Table>

        </items>
      </Tabs>
    </Layout>
  )
}

export default Appointment
