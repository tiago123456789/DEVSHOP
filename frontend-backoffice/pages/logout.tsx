import { useRouter } from "next/router";
import React, { useEffect } from "react"
import AuthService from "../services/AuthService"

const authService = new AuthService();

const Logout = () => {
    const router = useRouter();

    useEffect(() => {
        authService.logout();
        router.push("/login")
    }, [])

    return (
        <></>
    )
}

export default Logout;