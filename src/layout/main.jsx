import React from 'react';
import { Outlet } from 'react-router-dom';
import Spacebar from '../components/Spacebar'; 

const MainLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Spacebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
