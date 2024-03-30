import React, {useEffect, useState} from "react";
import {getAccessToken, getAuthUrl} from "../apis/YahooApi";
import {useSearchParams} from "react-router-dom";
import {useAuth} from "../AuthContext";
import { useNavigate } from "react-router-dom";

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
        <>
            <div onClick={() => getAuthUrl()}>
                Login with Yahoo
            </div>
        </>
    )
}

