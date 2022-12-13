import "./Forms.css"
import "../welcome/Welcome.css"
import { Preview } from "./Preview"
import { useState, useEffect } from "react"
import { Scares } from "../scares/Scares"

export const AddNew = ({ fetchWelcome }) => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [scaresLength, setScaresLength] = useState([])
    const [callTypes, setCallTypes] = useState(false)

    useEffect(
        () => {
            const fetchScareLength = async () => {
                const fetchData = await fetch(`http://localhost:8088/scares`)
                const fetchJson = await fetchData.json()
                setScaresLength(fetchJson)
            }
            fetchScareLength()
        }, []
    )



    const [scareDetails, setScareDetails] = useState({
        name: "",
        img: "",
        details: "",
        scareTypesId: "",
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
                hideHands()
                fetchWelcome()
            }
            addScare()
        } else {
            form.reportValidity()
        }
    }

    const hideHands = () => {
        const form = document.getElementById("form")
        form.style.bottom = "-1000px"

    }

    console.log(scaresLength.length > 0 ? scaresLength.length + 1 : 1)


    return (
        <>

            <img className="skeletonHands" src={require("../capstone-images/skeleton-hands-2.png")} />
            <section className="preview allScares">
                <section className="formTitles">
                    <div className="formTitle creation-form-label"><span>CREATION FORM</span></div>
                    <section className="formSubTitles">
                        <div className="formSubTitle">ITEM WILL BE ADDED TO:</div>
                        <section className="subTitle-details">
                            <div className="formSubTitle"> + ALL <span>SCARES</span></div>
                            <div className="formSubTitle"> + MY <span>SCARES</span></div>
                        </section>
                    </section>
                </section>
                <form id="scareForm">
                    <section className="title-and-image">
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
                    </section>
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
                    <section className="type-and-button">
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
                                        setCallTypes(!callTypes)
                                    }
                                }
                            >
                                <option value="">PLEASE SELECT A TYPE</option>
                                {scareType.map(x => <>
                                    <option value={x.id}>{x.type.toUpperCase()}</option>
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
                    </section>
                </form>

                <section className="allScaresItem preview-item">
                    <Scares
                        id={scaresLength.length > 0 ? scaresLength.length + 1 : 1}
                        name={scareDetails.name === "" ? "TITLE" : scareDetails.name}
                        img={scareDetails.img === "" ?
                            "https://www.lonestarpark.com/wp-content/uploads/2019/04/image-placeholder-500x500.jpg" : scareDetails.img}
                        details={scareDetails.details === "" ? "SYNOPSIS DETAILS" : scareDetails.details}
                        typeId={scareDetails.scareTypesId === "" ? 1 : scareDetails.scareTypesId}
                        creatorId={scareDetails.usersId}
                        creatorName={scareDetails.userName}
                        callTypes={callTypes}
                    />
                </section>
            </section>
        </>
    )

}