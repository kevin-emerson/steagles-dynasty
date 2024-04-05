import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import Home from "./components/Home";
import UserDetails from "./components/User/UserDetails";
import {AuthProvider} from "./AuthContext";
import LeaguePage from "./components/League/LeaguePage";
import TrustTheProcess from './components/PlayerPoc/TrustTheProcess';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>/
                    <Route path="/" element={<Home   />} />
                    <Route path="/user-details" element={<UserDetails />} />
                    <Route path="/league-details/:gameKey/:leagueId" element={<LeaguePage />} />
                    <Route path="/trust-the-process" element={<TrustTheProcess  />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
