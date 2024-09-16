import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import AdminPanel from "./components/admin";
import ViewPolicies from "./components/view_policy";  // Importing ViewPolicies component
import LearnPolicies from "./components/learn_policies"; // Importing LearnPolicies component
import Quizzes from "./components/Quizzes"; // Importing Quizzes component

function App() {
    const user = localStorage.getItem("token");

    return (
        <Routes>
            {user && <Route path="/" element={<Main />} />}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/view" element={<ViewPolicies />} />
            <Route path="/learn" element={<LearnPolicies />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;
