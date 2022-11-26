import "./Welcome.css"
import { useNavigate } from "react-router-dom"

export const Welcome = () => {
    const navigate = useNavigate()
    return (
        <>
            <section className="homePage">
                <section className="selections">
                    <div onClick={
                        () => {
                            navigate("/collections")
                        }
                    }>COLLECTIONS</div>
                    <div>RECOMMENDATIONS</div>
                    <div>QUEUE</div>
                </section>
                <div>WELCOME</div>
                <div></div>
            </section>
        </>
    )
}