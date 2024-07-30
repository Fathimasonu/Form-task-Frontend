import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
    const [formTitle, setFormTitle] = useState('');
    const [inputs, setInputs] = useState([]);
    const [inputType, setInputType] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const navigate = useNavigate();

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
            await axios.post('http://localhost:5000/api/forms', { title: formTitle, inputs });
            navigate('/');
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    return (
        <div>
            <h1>Create Form</h1>
            <input
                type="text"
                placeholder="Form Title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
            />
            <div>
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
            <div>
                {inputs.map((input, index) => (
                    <div key={index}>
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

export default CreateForm;
