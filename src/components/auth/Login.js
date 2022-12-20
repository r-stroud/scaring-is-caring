import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("scary_user", JSON.stringify({
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    useEffect(
        () => {
            const timer1 = setTimeout(
                () => {
                    document.getElementById(`scaring`).style.display = "none"
                }, 800
            )
            const timer2 = setTimeout(
                () => {
                    document.getElementById(`is`).style.display = "none"
                }, 1600
            )
            const timer3 = setTimeout(
                () => {
                    document.getElementById(`caring`).style.display = "none"
                }, 2400
            )

            // return () => clearTimeout(timer)
        }, []
    )

    return (
        <>
            <section id="scaring"><div><span>SCARING</span></div></section>
            <section id="is"><div><span>IS</span></div></section>
            <section id="caring"><div><span>CARING</span></div></section>
            <main className="container--login">
                <section className="login-flex">
                    <div className="login-title">SCARING IS CARING</div>
                    <form className="form--login" onSubmit={handleLogin}>

                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <button
                                className="login-bttn"
                                type="submit">
                                Sign in
                            </button>
                        </fieldset>
                    </form>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main>
        </>
    )
}