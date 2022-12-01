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

    const rate = (num) => {

        const rate = document.getElementById(`heart${num}--${id}`)

        const heart1 = document.getElementById(`heart1--${id}`)
        const heart2 = document.getElementById(`heart2--${id}`)
        const heart3 = document.getElementById(`heart3--${id}`)
        const heart4 = document.getElementById(`heart4--${id}`)
        const heart5 = document.getElementById(`heart5--${id}`)

        rate.addEventListener("click", (event) => {

            if (num > 4) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
                heart5.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 3) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 2) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 1) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 0) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
            }

        })
    }

    const rateUp = (num) => {

        const rate = document.getElementById(`heart${num}--${id}`)

        const heart1 = document.getElementById(`heart1--${id}`)
        const heart2 = document.getElementById(`heart2--${id}`)
        const heart3 = document.getElementById(`heart3--${id}`)
        const heart4 = document.getElementById(`heart4--${id}`)
        const heart5 = document.getElementById(`heart5--${id}`)

        rate.addEventListener("mouseover", (event) => {

            if (num > 4) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
                heart5.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 3) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 2) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 1) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 0) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
            }

        })
    }

    const rateDown = (num) => {

        const rate = document.getElementById(`heart${num}--${id}`)

        const heart1 = document.getElementById(`heart1--${id}`)
        const heart2 = document.getElementById(`heart2--${id}`)
        const heart3 = document.getElementById(`heart3--${id}`)
        const heart4 = document.getElementById(`heart4--${id}`)
        const heart5 = document.getElementById(`heart5--${id}`)

        rate.addEventListener("mouseout", (event) => {

            if (num > 4) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
                heart3.style.filter = " grayscale(100%) brightness(10%)"
                heart4.style.filter = " grayscale(100%) brightness(10%)"
                heart5.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 3) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
                heart3.style.filter = " grayscale(100%) brightness(10%)"
                heart4.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 2) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
                heart3.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 1) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 0) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
            }

        })
    }


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

                </section>
                <section className="scareBackground" id={`scareBackground--${id}`} style={{ backgroundImage: `url(${img})` }} >

                </section>
                <section className="scare" id={`scare--${id}`}>

                    <div className="scareType"></div>
                    <div className="viewed"></div>

                    <div className="description" id={`description--${id}`}>{details}</div>
                    <section className="ratings">
                        <div className="userRating">USER RATING:
                            <div className="heartRating">
                                <img className="heart heart1" id={`heart1--${id}`} src={require("../capstone-images/heart.png")}
                                    onMouseOver={document.getElementById(`heart1--${id}`) ? rateUp(1) : ""}
                                    onMouseOut={document.getElementById(`heart1--${id}`) ? rateDown(1) : ""} />

                                <img className="heart heart2" id={`heart2--${id}`} src={require("../capstone-images/heart.png")}
                                    onMouseOver={document.getElementById(`heart2--${id}`) ? rateUp(2) : ""}
                                    onMouseOut={document.getElementById(`heart2--${id}`) ? rateDown(2) : ""} />

                                <img className="heart heart3" id={`heart3--${id}`} src={require("../capstone-images/heart.png")}
                                    onMouseOver={document.getElementById(`heart3--${id}`) ? rateUp(3) : ""}
                                    onMouseOut={document.getElementById(`heart3--${id}`) ? rateDown(3) : ""} />

                                <img className="heart heart4" id={`heart4--${id}`} src={require("../capstone-images/heart.png")}
                                    onMouseOver={document.getElementById(`heart4--${id}`) ? rateUp(4) : ""}
                                    onMouseOut={document.getElementById(`heart4--${id}`) ? rateDown(4) : ""} />
                                <img
                                    className="heart heart5"
                                    id={`heart5--${id}`}
                                    src={require("../capstone-images/heart.png")}
                                    onMouseOver={document.getElementById(`heart5--${id}`) ? rateUp(5) : ""}
                                    onMouseOut={document.getElementById(`heart5--${id}`) ? rateDown(5) : ""} />
                            </div>
                        </div>
                        <div className="avgRating">AVERAGE RATING:
                            <div>
                                <img className="heart" src={require("../capstone-images/heart.png")} />
                                <img className="heart" src={require("../capstone-images/heart.png")} />
                                <img className="heart" src={require("../capstone-images/heart.png")} />
                                <img className="heart" src={require("../capstone-images/heart.png")} />
                                <img className="heart" src={require("../capstone-images/heart.png")} />
                            </div>
                        </div>
                    </section>
                    <div className="comments">COMMENTS</div>
                    <div className="recommend">RECOMMEND</div>

                </section>
            </section>
        </>
    )
}