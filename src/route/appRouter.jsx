//Dependencies
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Helper
import routes from './routes';

//component

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route key={route?.path} path={route.path} element={route.component}/>
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
