import React, { useEffect } from 'react'

export default function Logout() {


    useEffect(() => {
        sessionStorage.clear();

    }, [])
    return (
        <div>
            <h1> Succefully Logged out!!</h1>

        </div>
    )
}
