import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

const Home = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/forms');
                setForms(response.data);
            } catch (error) {
                console.error('Error fetching forms:', error);
            }
        };

        fetchForms();
    }, []);

    const deleteForm = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/forms/${id}`);
            setForms(forms.filter((form) => form.id !== id));
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };
    return (
        <div className="home-container">
            <h1 className="home-title">Form Builder</h1>
            <Link to="/form/create" className="create-form-button">Create Form</Link>
            <div className="form-list">
                {forms.map((form) => (
                    <div key={form.id} className="form-item">
                        <Link to={`/form/${form.id}`} className="form-link">{form.title}</Link>
                        <Link to={`/form/${form.id}/edit`} className="edit-link">Edit</Link>
                        <button onClick={() => deleteForm(form.id)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default Home;
