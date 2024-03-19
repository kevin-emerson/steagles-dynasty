import React, {useEffect, useState} from "react";
import YahooApi from "../apis/yahooApi";
import {useSearchParams} from "react-router-dom";

export default function Home() {
    const [queryParameters] = useSearchParams()
    const [authCode, setAuthCode] = useState('');

    const clientId = import.meta.env.VITE_YAHOO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_YAHOO_REDIRECT_URI;

    useEffect(() => {
        // TODO if accessToken empty or invalid, get code from query param
        //  (if code is empty, auth button will be displayed and they will be redirected back here once they auth)
        //   then get token using code + call 2

        if (authCode === '') {
            setAuthCode(queryParameters.get("code") ?? '');
        }

    //     YahooApi()
    //         .then(res => {
    //             console.log('res 1: ' + JSON.stringify(res))
    //             setAuthCode(res.code);
    //         })
    }, [])

    function authenticateYahoo() {
        window.location = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
    }

    return(
        <>
            { authCode === '' ?
                <div onClick={authenticateYahoo}>
                    Login with Yahoo
                </div> :
                <p>{authCode}</p>
            }
        </>
    )
}

