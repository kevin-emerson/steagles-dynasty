import React, {useContext, useEffect, useState} from "react";
import {getAuthUrl} from "../apis/YahooApi";
import {useSearchParams} from "react-router-dom";
import {useAuth} from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [queryParameters] = useSearchParams()
    const [authCode, setAuthCode] = useState('');
    const { authToken, setAuthToken } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        console.log('authtoken useeffect: ' + authToken)
        if (authCode === '') {
            setAuthCode(queryParameters.get("code") ?? '');
        }
    }, [])

    const handleButtonClick = async () => {
        await fetch(`http://localhost:3000/auth/token?code=${authCode}`, {
            method: 'GET',
            }).then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                setAuthToken(data.access_token)
                navigate('/user-details')
            })
    }

    return(
        <>
            { authCode === '' ?
                <div onClick={() => getAuthUrl()}>
                    Login with Yahoo
                </div> :
                <div onClick={handleButtonClick}>
                    <p>access token: {authToken}</p>
                </div>
            }
        </>
    )
}

