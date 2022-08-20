import React from 'react';
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {LOGIN_ROUTE, PROFILE_ROUTE} from "./routes/consts";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import {useAppSelector} from "./hooks/hooks";



const App = () => {

    const {auth} = useAppSelector(state => state.authReducer)

    return (
        <BrowserRouter>
            <Routes>
                {auth && <Route path={PROFILE_ROUTE} element={<ProfilePage/>}/>}
                <Route path={LOGIN_ROUTE} element={<LoginPage/>}/>
                <Route path={'*'} element={<Navigate to={'/login'} replace/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;