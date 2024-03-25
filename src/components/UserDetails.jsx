import React, {useEffect} from "react";
import {useAuth} from "../AuthContext";

export default function UserDetails() {
    const { authToken } = useAuth();

    useEffect( () => {
        console.log('user details auth token: ' + authToken)
    }, [authToken])

    return(
        <p>
            auth token: {authToken}
        </p>
    )
}
