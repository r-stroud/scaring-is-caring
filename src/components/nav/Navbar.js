import "./Navbar.css"
import { useNavigate, Link } from "react-router-dom"

export const Navbar = () => {

    const navigate = useNavigate()

    return <>
        <nav>
            <section className="appTitle">SCARING IS CARING</section>
            <section className="navLinks">
                <div>TBD1</div>
                <div>TBD2</div>
                <div>TBD3</div>
                <div>TBD4</div>
            </section>
            <section className="profileAndLogout">
                <section className="profile">
                    <div>username</div>
                    <div>notifications</div>
                </section>
                <section className="logout">
                    {localStorage.getItem("scary_user")
                        ?
                        <div><Link to="" onClick={
                            () => {
                                localStorage.removeItem("scary_user")
                                navigate("/", { replace: true })
                            }
                        }>Logout</Link></div>
                        : ""}

                </section>
            </section>
        </nav>
    </>
}