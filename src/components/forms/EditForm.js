import "./EditForm.css"
import { Scares } from "../scares/Scares"


export const EditForm = ({
    editId, editName, editImg, editDetails, editTypeId, editCreatorId, editCreatorName

}) => {

    console.log(editId)
    console.log(editName)
    console.log(editImg)
    console.log(editDetails)
    console.log(editTypeId)
    console.log(editCreatorId)
    console.log(editCreatorName)

    return (
        <>
            <section className="edit-container">

                <div className="edit-form edit-current">
                    <span>CURRENT SCARE</span>
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
                <div className="edit-form edit-edit">EDIT SCARE</div>
                <div className="edit-form edit-preview">PREVIEW</div>
            </section>
        </>
    )
}