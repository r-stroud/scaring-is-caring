import "./Fiends.css"
import { useState, useEffect } from "react"
import { json } from "react-router-dom"

export const FiendsProfile = ({ name, email, add, fiendId, fetchAll, noEntry, setTest, test, fiendsList, }) => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [fiends, setFiends] = useState([])
    const [filterFiends, setFilterFiends] = useState([])
    const [del, setDel] = useState(false)


    const deleteFiend = async () => {

        const fiendFunction = () => {
            if (fiendsList.length > 0) {
                const copy = fiendsList.map(x => ({ ...x }))
                console.log(copy)
                const filterCopy = copy.find(x => x.fiends === fiendId)
                console.log(filterCopy)
                console.log(filterCopy.id)
                return filterCopy.id
            }
        }
        const fetchId = await fiendFunction()

        const fetchFiends = await fetch(`http://localhost:8088/fiends/${fetchId}`, {
            method: "DELETE",
        })
        fetchAll()
    }



    console.log(fiendId)
    const addFiend = async () => {

        if (fiendId !== undefined) {

            const obj = {
                usersId: projectUserObject.id,
                fiends: fiendId
            }

            const fetchFiends = await fetch(`http://localhost:8088/fiends`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            })
            fetchAll()
        }
    }
    return (
        <>
            <section className="fiend-profile">
                <section className="fiend-profile-header">

                    <div className="fiend-name">{name}</div>
                    <div className="fiend-email">{email}</div>

                    <div className="fiend-add"
                        onClick={
                            (clickEvent) => {
                                clickEvent.preventDefault()
                                deleteFiend()
                            }
                        }> REMOVE FIEND
                    </div>

                </section>
            </section>
        </>
    )
}