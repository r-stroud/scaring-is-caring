import "./EditForm.css"
import { Scares } from "../scares/Scares"
import { useState, useEffect } from "react"



export const EditForm = ({
    editId, editName, editImg, editDetails, editTypeId, editCreatorId, editCreatorName, editFetchScares, setShowEdit,
    showEdit

}) => {



    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [scareDetails, setScareDetails] = useState({
        name: editName,
        img: editImg,
        details: editDetails,
        scareTypesId: editTypeId,
        usersId: projectUserObject.id,
        userName: projectUserObject.fullName
    })

    const [scareType, setScareType] = useState([])

    const [callTypes, setCallTypes] = useState(false)

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

    const handleUpdate = (e) => {
        e.preventDefault()
        const form = document.getElementById("editForm")
        if (form.checkValidity()) {

            const editScare = async () => {
                const fetchData = await fetch(`http://localhost:8088/scares/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(scareDetails)
                })
                const fetchJson = await fetchData.json()
            }

            editScare()
            editFetchScares()
            setShowEdit(!showEdit)

        } else {
            form.reportValidity()
        }
    }



    return (
        <>
            <section className="edit-container">

                <div className="edit-form edit-current">
                    <div className="edit-form-content">
                        <span>CURRENT SCARE</span>
                    </div>
                    <div className="edit-form-scare">
                        <Scares
                            id={editId}
                            name={editName}
                            img={editImg}
                            details={editDetails}
                            typeId={editTypeId}
                            creatorId={editCreatorId}
                            creatorName={editCreatorName}
                        />
                    </div>
                </div>
                <div className="edit-form edit-edit">
                    <div className="edit-form-content">
                        <span>EDIT SCARE</span>



                        <form id="editForm">
                            <fieldset>
                                <label htmlFor="name">Title:</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    className="edit-form-field"
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
                                    className="edit-form-field"
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
                                    className="edit-form-field"
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
                                    className="edit-form-field"
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
                                    <option value="">Please select a type</option>
                                    {scareType.map(x => <>
                                        <option value={x.id}>{x.type}</option>
                                    </>)}
                                </select>
                            </fieldset>
                            <button
                                type="submit"
                                className="edit-submit-btn"
                                onClick={(click) => {
                                    handleUpdate(click)

                                }}>Submit</button>
                        </form>

                    </div>

                </div>
                <div className="edit-form edit-preview">
                    <div className="edit-form-content">
                        <span>SCARE PREVIEW</span>
                    </div>
                    <div className="edit-scare-preview edit-form-scare">
                        {scareDetails ?
                            <Scares
                                id={`${editId}--preview`}
                                name={scareDetails.name}
                                img={scareDetails.img}
                                details={scareDetails.details}
                                typeId={scareDetails.scareTypesId}
                                creatorId={scareDetails.usersId}
                                creatorName={scareDetails.userName}
                                callTypes={callTypes}
                            /> : <></>
                        }
                    </div>

                </div>
            </section>
        </>
    )
}