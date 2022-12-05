import "./Forms.css"
import "../welcome/Welcome.css"
import { Preview } from "./Preview"
import { useState, useEffect } from "react"

export const AddNew = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [scareDetails, setScareDetails] = useState({
        name: "",
        img: "",
        details: "",
        scareTypesId: 0,
        usersId: projectUserObject.id
    })

    const [scareType, setScareType] = useState([])

    useEffect(
        () => {
            const fetchScareType = async () => {
                const fetchData = await fetch(`http://localhost:8088/scareTypes`)
                const fetchJson = await fetchData.json()
                setScareType(fetchJson)
            }
            fetchScareType()
        }, []
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = document.getElementById("scareForm")

        if (form.checkValidity()) {



            const addScare = async () => {
                const fetchData = await fetch(`http://localhost:8088/scares`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(scareDetails),
                })
                const fetchJson = await fetchData.json()

                console.log(fetchJson.id)

                const fetchData2 = await fetch(`http://localhost:8088/finished`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usersId: projectUserObject.id,
                        scaresId: fetchJson.id
                    }
                    )
                })
                const fetchJson2 = await fetchData2.json()

            }
            addScare()

        } else {
            form.reportValidity()
        }
    }

    const hideHands = () => {
        const hands = document.querySelectorAll(".skeletonHands")
        hands.forEach(hand => {
            hand.style.right = "-650px"
        })
        const display = document.getElementById("handsScareContainer")
        display.style.right = "-400px"

        const form = document.getElementById("form")
        form.style.right = "-600px"

    }


    return (
        <>
            <section className="addForm">
                <section className="formTitles">
                    <div className="formTitle">ADD AN ITEM TO YOUR COLLECTION</div>
                    <div className="formTitle">&</div>
                    <div className="formTitle">TO THE SCARES PAGE</div>
                </section>
                <form id="scareForm">
                    <fieldset>
                        <label htmlFor="name">Title:</label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="form-field"
                            placeholder="Please enter a title"
                            value={scareDetails.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...scareDetails }
                                    copy.name = evt.target.value
                                    setScareDetails(copy)
                                }
                            }
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="img">Image:</label>
                        <input
                            required
                            autoFocus
                            type="text"
                            className="form-field"
                            placeholder="Please enter an image URL"
                            value={scareDetails.img}
                            onChange={
                                (evt) => {
                                    const copy = { ...scareDetails }
                                    copy.img = evt.target.value
                                    setScareDetails(copy)
                                }
                            }
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="synopsis">Synopsis:</label>
                        <textarea
                            required
                            autoFocus
                            className="form-field"
                            placeholder="Please enter a breif description"
                            value={scareDetails.details}
                            onChange={
                                (evt) => {
                                    const copy = { ...scareDetails }
                                    copy.details = evt.target.value
                                    setScareDetails(copy)
                                }
                            }
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="type">Type:</label>
                        <select
                            required
                            autoFocus
                            className="form-field"
                            value={scareDetails.scareTypesId}
                            onChange={
                                (evt) => {
                                    const copy = { ...scareDetails }
                                    copy.scareTypesId = evt.target.value
                                    setScareDetails(copy)
                                }
                            }
                        >
                            <option value="">Please select a type</option>
                            {scareType.map(x => <>
                                <option value={x.id}>{x.type}</option>
                            </>)}
                        </select>
                    </fieldset>
                    <button
                        type="submit"
                        className="submit-btn"
                        onClick={(click) => {
                            document.getElementById("createNew").style.display = "none"
                            handleSubmit(click)
                            hideHands()
                        }}>Submit</button>
                </form>
            </section>
            <img className="skeletonHands" src={require("../capstone-images/skeleton-hands-2.png")} />
            <section className="preview">
                {<Preview
                    title={scareDetails.name}
                    img={scareDetails.img}
                    scareTypesId={scareDetails.scareTypesId}
                    details={scareDetails.details} />}
            </section>
        </>
    )

}