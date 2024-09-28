import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import ProtectedComponents from "./components/ProtectedComponents";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import Appointment from "./pages/appointment";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import DoctorsList from "./pages/DoctorsList";
import UsersList from "./pages/UsersList";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorPage from "./pages/Home/doctorPage";
import UserProfile from "./pages/Home/userProfile"
function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedComponents>
              <Home />
            </ProtectedComponents>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedComponents>
              <UserProfile />
            </ProtectedComponents>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedComponents>
              <Appointment />
            </ProtectedComponents>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedComponents>
              <ApplyDoctor />
            </ProtectedComponents>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedComponents>
              <Notification />
            </ProtectedComponents>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedComponents>
              <DoctorsList />
            </ProtectedComponents>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedComponents>
              <UsersList />
            </ProtectedComponents>
          }
        />
        <Route 
          path="/doctor/profile/:id"
          element={
            <ProtectedComponents>
              <DoctorProfile />
            </ProtectedComponents>
          }
        />
        <Route 
          path="/doctor/:id"
          element={
            <ProtectedComponents>
              <DoctorPage />
            </ProtectedComponents>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
