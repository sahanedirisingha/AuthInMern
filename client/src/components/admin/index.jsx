import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'; // You can create a separate CSS file for admin styling

const AdminPanel = () => {
    const navigate = useNavigate();
    const [policies, setPolicies] = useState([]);
    const [form, setForm] = useState({ name: '', description: '' });
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/policies');
            setPolicies(response.data);
        } catch (err) {
            setError('Error fetching policies');
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`http://localhost:8080/api/policies/edit/${editing._id}`, form);
            } else {
                await axios.post('http://localhost:8080/api/policies/add', form);
            }
            fetchPolicies();
            setForm({ name: '', description: '' });
            setEditing(null);
        } catch (err) {
            setError('Error saving policy');
        }
    };

    const handleEdit = (policy) => {
        setForm({ name: policy.name, description: policy.description });
        setEditing(policy);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/policies/delete/${id}`);
            fetchPolicies();
        } catch (err) {
            setError('Error deleting policy');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("isAdmin");
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div className={styles.admin_container}>
            <nav className={styles.navbar}>
                <h1>SignArts</h1>
                <h1>Hi Admin</h1>
                <button className={styles.logout_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <div className={styles.content}>
                <h2>Manage Policies</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <button type="submit" className={styles.submit_btn}>
                        {editing ? 'Update Policy' : 'Add Policy'}
                    </button>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Policy Name"
                        required
                    />
                    <textarea
                        className={styles.textarea}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Policy Description"
                    />
                    
                </form>
                <ul className={styles.policy_list}>
                    {policies.map((policy) => (
                        <li key={policy._id} className={styles.policy_item}>
                            <h3>{policy.name}</h3>
                            <p>{policy.description}</p>
                            <button onClick={() => handleEdit(policy)} className={styles.edit_btn}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(policy._id)} className={styles.delete_btn}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
