import "./Preview.css"
import { useState, useEffect } from "react"

export const Preview = ({ title, img, scareTypesId, details }) => {

    const [height, setHeight] = useState(false)
    console.log(height)

    return (
        <>
            <h1 id="preview-h1">PREVIEW</h1>
            <section className="form-preview">
                <h2>COVER</h2>
                <section className="preview-container">
                    <section className="header" onClick={
                        () => {
                            //     if (!height) {
                            //         document.getElementById(`background`).style.height = "0px"
                            //         document.getElementById(`background`).style.transitionDelay = "0s"
                            //         document.getElementById(`details`).style.transitionDelay = "1s"
                            //         document.getElementById(`details`).style.height = "85%"
                            //         // heightSTDdetails()
                            //         setHeight(!height)
                            //     } else {
                            //         document.getElementById(`background`).style.height = "85%"
                            //         document.getElementById(`background`).style.transitionDelay = "1s"
                            //         document.getElementById(`details`).style.transitionDelay = "0s"
                            //         document.getElementById(`details`).style.height = "0px"
                            //         // heightSTDcover()
                            //         setHeight(!height)
                            //     }

                            // }
                            setHeight(!height)
                        }
                    }>
                        <div>{title.toUpperCase()}</div>
                        <div>
                            {parseInt(scareTypesId) === 1 ? <img className="prev-icon prev-film" src={require("../capstone-images/film-removebg-preview.png")} /> : <></>}
                            {parseInt(scareTypesId) === 3 ? <img className="prev-icon prev-book" src={require("../capstone-images/book-removebg-preview.png")} /> : <></>}
                            {parseInt(scareTypesId) === 2 ? <img className="prev-icon prev-game" src={require("../capstone-images/game-removebg-preview.png")} /> : <></>}</div>
                    </section>
                    <section className="cover scarePreview" >

                        <section className="background" id="background" style={{ backgroundImage: `url(${img})` }}></section>
                    </section>
                </section>

                <h2>DETAILS</h2>
                <section className="preview-container">
                    <section className="header" >
                        <div>{title.toUpperCase()}</div>
                        <div>
                            {parseInt(scareTypesId) === 1 ? <img className="prev-icon prev-film" src={require("../capstone-images/film-removebg-preview.png")} /> : <></>}
                            {parseInt(scareTypesId) === 3 ? <img className="prev-icon prev-book" src={require("../capstone-images/book-removebg-preview.png")} /> : <></>}
                            {parseInt(scareTypesId) === 2 ? <img className="prev-icon prev-game" src={require("../capstone-images/game-removebg-preview.png")} /> : <></>}</div>
                    </section>
                    <section className="details scarePreview" id="details">
                        <div className="prev-description" >
                            SYNOPSIS:<div>{details}</div></div>
                    </section>

                </section>
            </section>
        </>
    )
}