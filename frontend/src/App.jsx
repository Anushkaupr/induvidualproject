import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/Loginpage";
import Admindashboard from "./pages/Admindashboard";
import UserDashboard from "./pages/UserDashboard";
import Settings from "./pages/Settings";
import Homepage from "./pages/Homepage";
import SplashScreen from "./pages/Splashscreen";
import ProtectedRoute from "./Protected/ProtectedRoute";
import EditUser from "./pages/Edituser";
import Saving from "./pages/Saving";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
   <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/admindashboard" element={
          <ProtectedRoute allowedRoles={['admin']} element={<Admindashboard/>}
          />} />
       <Route path="/userdashboard" element={
  <ProtectedRoute allowedRoles={['user']} element={<UserDashboard />} />
} />

           <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/homepage" element={<Homepage />} />
         <Route path="/" element={<SplashScreen />} />
           <Route path="/edituser/:id" element={
          <ProtectedRoute allowedRoles={['admin']} element={<EditUser />}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
