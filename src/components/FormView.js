import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewForm = () => {
    const { id } = useParams();
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
                setForm(response.data);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    if (!form) return <div>Loading...</div>;

    return (
        <div>
            <h1>{form.title}</h1>
            <form onSubmit={handleSubmit}>
                {form.inputs.map((input, index) => (
                    <div key={index}>
                        <label>{input.title}</label>
                        <input type={input.type} placeholder={input.placeholder} required />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ViewForm;
