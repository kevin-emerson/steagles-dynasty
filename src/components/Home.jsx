import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useAuth} from "../AuthContext";
import { useNavigate } from "react-router-dom";
import './Home.scss'
import {getAccessToken, getAuthUrl} from "../apis/AuthApi";

export default function Home() {
    const [queryParameters] = useSearchParams()
    const [authCode, setAuthCode] = useState('');
    const { setAuthToken } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        if (authCode === '') {
            setAuthCode(queryParameters.get("code") ?? '');
        } else {
            getAccessToken(authCode).then(res => {
                res.json().then(data => {
                    setAuthToken(data.access_token)
                    navigate('/user-details')
                })
            })
        }
    }, [authCode])

    return(
        <div className="container">
            <button onClick={() => getAuthUrl()}>
                Login with Yahoo
            </button>
        </div>
    )
}

