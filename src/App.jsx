import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import {AuthProvider} from "./AuthContext";
import FreeAgents from "./components/FreeAgents";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>/
                    <Route path="/" element={<Home   />} />
                    <Route path="/user-details" element={<UserDetails />} />
                    <Route path="/league-details/:leagueId" element={<FreeAgents />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
