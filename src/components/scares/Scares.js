import "./Scares.css"
import { useState, useEffect } from "react"

export const Scares = ({ id, name, img, details, type, creatorId, creatorName }) => {

    const [scares, setScares] = useState([])
    const [height, setHeight] = useState(false)

    useEffect(
        () => {
            const fetchScares = async () => {
                const fetchData = await fetch(`http://localhost:8088/scares?_expand=scareTypes&_expand=users`)
                const fetchJson = await fetchData.json()
                setScares(fetchJson)
            }
        }, []
    )
    // document.getElementById(`scareBackground--${id}`).style.backgroundImage = `url(${img})`

    return (
        <>
            <section className="scareContainer">
                <section className="scareHeader" onClick={
                    () => {
                        if (!height) {
                            document.getElementById(`scareBackground--${id}`).style.height = "0px"
                            document.getElementById(`scareBackground--${id}`).style.transitionDelay = "0s"
                            document.getElementById(`scare--${id}`).style.transitionDelay = "1s"
                            document.getElementById(`scare--${id}`).style.height = "360px"
                            setHeight(!height)
                        } else {
                            document.getElementById(`scareBackground--${id}`).style.height = "360px"
                            document.getElementById(`scareBackground--${id}`).style.transitionDelay = "1s"
                            document.getElementById(`scare--${id}`).style.transitionDelay = "0s"
                            document.getElementById(`scare--${id}`).style.height = "0px"
                            setHeight(!height)
                        }



                    }}>
                    <section className="scareNameIcon">
                        <div>{name.toUpperCase()}</div>
                        {type === "film" ? <img className="icon film" src={require("../capstone-images/film-removebg-preview.png")} /> : <></>}
                        {type === "book" ? <img className="icon book" src={require("../capstone-images/book-removebg-preview.png")} /> : <></>}
                        {type === "video game" ? <img className="icon game" src={require("../capstone-images/game-removebg-preview.png")} /> : <></>}
                    </section>
                    <section className="ratings">
                        <div className="userRating">USER RATING:
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                        </div>
                        <div className="avgRating">AVERAGE RATING:
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                            <img className="heart" src={require("../capstone-images/heart.png")} />
                        </div>
                    </section>
                </section>
                <section className="scareBackground" id={`scareBackground--${id}`} style={{ backgroundImage: `url(${img})` }} >

                </section>
                <section className="scare" id={`scare--${id}`}>

                    <div className="scareType"></div>
                    <div className="viewed"></div>

                    <div className="description">{details}</div>

                    <div className="comments">COMMENTS</div>
                    <div className="recommend">RECOMMEND</div>

                </section>
            </section>
        </>
    )
}