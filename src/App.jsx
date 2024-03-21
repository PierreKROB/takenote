import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./layout/main";
import Home from "./page/Home";
import Notes from "./page/Note";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="notes" element={<Notes />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
