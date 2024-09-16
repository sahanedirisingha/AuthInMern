import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css"; 
import image from "./sahan2.jpg";

const Main = () => {
    const [fullName, setFullName] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        const isAdmin = localStorage.getItem("isAdmin");

        // Redirect to admin panel if the user is an admin
        if (token && isAdmin === "true") {
            navigate('/admin');
        } else if (token && firstName && lastName) {
            setFullName(`${firstName} ${lastName}`);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("isAdmin");
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>SignArts</h1>
                <div className={styles.user_info}>
                    {fullName && <span className={styles.user_name}>Hi {fullName}!</span>}
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className={styles.content_container}>
                {/* Left side for image */}
                <div className={styles.image_container}>
                    <img src={image} alt="Placeholder" className={styles.image} />
                </div>

                {/* Right side for buttons */}
                <div className={styles.button_container}>
                    <Link to="/view" className={styles.action_btn}>View Policies</Link>
                    <Link to="/learn" className={styles.action_btn}>Learn Policies</Link>
                    <Link to="/quizzes" className={styles.action_btn}>Quizzes</Link>
                </div>
            </div>
        </div>
    );
};

export default Main;
