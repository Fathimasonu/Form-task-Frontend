import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/FormCreate';
import EditForm from './components/FormEdit';
import ViewForm from './components/FormView';

const App = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/form/create" element={<CreateForm />} />
                <Route path="/form/:id/edit" element={<EditForm />} />
                <Route path="/form/:id" element={<ViewForm />} />
            </Routes>
        </div>
    );
};

export default App;

