import "./Navbar.css"
import { useNavigate, Link } from "react-router-dom"

export const Navbar = () => {

    const navigate = useNavigate()

    return <>
        <nav>
            <section className="appTitle"><span>SCARING IS CARING</span></section>
            <section className="navflex">
                <section className="navLinks">
                    <div className="nav-item" onClick={
                        () => { navigate("/") }
                    }>HOME</div>
                    <div className="nav-item" onClick={
                        () => { navigate("/scares") }
                    }>SCARES</div>
                    <div className="nav-item"
                        onClick={
                            () => { navigate("/fiends") }
                        }>FIENDS</div>
                    {/* <div className="nav-item" >TBD4</div> */}

                    <section className="profileAndLogout">
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
                </section>
            </section>
        </nav>
    </>
}