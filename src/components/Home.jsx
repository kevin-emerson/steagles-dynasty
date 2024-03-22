import React, {useEffect, useState} from "react";
import {getAccessToken, getAuthUrl} from "../apis/YahooApi";
import {useSearchParams} from "react-router-dom";

export default function Home() {
    const [queryParameters] = useSearchParams()
    const [authCode, setAuthCode] = useState('');

    useEffect(() => {
        // TODO if accessToken empty or invalid, get code from query param
        //  (if code is empty, auth button will be displayed and they will be redirected back here once they auth)
        //   then get token using code + call 2

        if (authCode === '') {
            setAuthCode(queryParameters.get("code") ?? '');
        }
    }, [])

    return(
        <>
            { authCode === '' ?
                <div onClick={() => getAuthUrl()}>
                    Login with Yahoo
                </div> :
                <div onClick={() => getAccessToken(authCode)}>
                    <p>{authCode}</p>
                </div>
            }
        </>
    )
}

