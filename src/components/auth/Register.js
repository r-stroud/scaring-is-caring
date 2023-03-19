import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [users, setUsers] = useState({
        email: "",
        fullName: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("scary_user", JSON.stringify({
                        id: createdUser.id,
                        fullName: createdUser.fullName,
                        email: createdUser.email
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${users.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...users }
        copy[evt.target.id] = evt.target.value
        setUsers(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <div className="login-title">SCARING IS CARING</div>
            <form className="form--login" onSubmit={handleRegister}>
                <fieldset>
                    <label class="label-login" htmlFor="fullName"> Full Name </label>
                    <input onChange={updateUser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label class="label-login" htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button
                        className="login-bttn"
                        type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}