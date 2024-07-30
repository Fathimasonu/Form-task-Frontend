import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../EditForm.css';

const EditForm = () => {
    const { id } = useParams();
    const [formTitle, setFormTitle] = useState('');
    const [inputs, setInputs] = useState([]);
    const [inputType, setInputType] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
                setFormTitle(response.data.title);
                setInputs(response.data.inputs);
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [id]);

    const addInput = () => {
        if (inputs.length < 20) {
            setInputs([...inputs, { type: inputType, title: inputTitle, placeholder }]);
            setInputType('');
            setInputTitle('');
            setPlaceholder('');
        }
    };

    const removeInput = (index) => {
        setInputs(inputs.filter((_, i) => i !== index));
    };

    const saveForm = async () => {
        try {
            await axios.put(`http://localhost:5000/api/forms/${id}`, { title: formTitle, inputs });
            navigate('/');
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    return (
        <div className="edit-form-container">
            <h1 className="form-title">Edit Form</h1>
            <input
                className="form-title-input"
                type="text"
                placeholder="Form Title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
            />
            <div className="input-container">
                <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
                    <option value="">Select Input Type</option>
                    <option value="email">Email</option>
                    <option value="text">Text</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                </select>
                <input
                    type="text"
                    placeholder="Input Title"
                    value={inputTitle}
                    onChange={(e) => setInputTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Placeholder"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                />
                <button onClick={addInput}>Add Input</button>
            </div>
            <div className="inputs-list">
                {inputs.map((input, index) => (
                    <div key={index} className="input-item">
                        <label>{input.title}</label>
                        <input type={input.type} placeholder={input.placeholder} readOnly />
                        <button onClick={() => removeInput(index)}>Delete</button>
                    </div>
                ))}
            </div>
            <button onClick={saveForm}>Save Form</button>
        </div>
    );
};

export default EditForm;

