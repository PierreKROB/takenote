import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./layout/main";
import Home from "./page/Home";
import Notes from "./page/NotesPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* <Route index element={<Home />} /> */}
                    <Route index element={<Notes />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
