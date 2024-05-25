import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Clubs from "./pages/clubs_new/Clubs";
import ClubsInfo from "./pages/clubs_info_new/ClubsInfo";
import Events from "./pages/events/Events";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Nopage from "./pages/nopage/Nopage";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import MyState from "./context/data/myState";
import EventInfo from "./pages/eventInfo/EventsInfo";
import AddEvent from "./pages/admin/pages/AddEvent";
import UpdateEvent from "./pages/admin/pages/UpdateEvent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "./pages/history/History";
import Visualize from "./pages/admin/visualization/visualize";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubinfo/:id" element={<ClubsInfo />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventinfo/:id" element={<EventInfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={ <ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>}/>
          <Route path="/history" element={<ProtectedRoute> <History /> </ProtectedRoute>}/>
          <Route path="/addevent" element={<ProtectedRouteForAdmin> <AddEvent /> </ProtectedRouteForAdmin>}/>
          <Route path="/updateevent" element={<ProtectedRouteForAdmin> <UpdateEvent /> </ProtectedRouteForAdmin>}/>
          <Route path="*" element={<Nopage />} />
          <Route path="/visualize" element={<ProtectedRouteForAdmin><Visualize /></ProtectedRouteForAdmin>} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
}

export default App;

// User Protected Route

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user != "avrsanand@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

// Admin Protected Route

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (admin.user.email === "avrsanand@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
