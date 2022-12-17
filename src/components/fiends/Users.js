import "./Fiends.css"
import { useState, useEffect } from "react"

export const Users = ({ name, email, add, fiendId, fetchAll, noEntry, setTest, test }) => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [fiends, setFiends] = useState([])
    const [filterFiends, setFilterFiends] = useState([])
    const [del, setDel] = useState(false)

    const fetchFiends = async () => {
        const fetchData = await fetch(`http://localhost:8088/fiends?usersId=${projectUserObject.id}`)
        const fetchJson = await fetchData.json()
        setFiends(fetchJson)
    }

    useEffect(
        () => {
            fetchFiends()
        }, [, del]
    )



    useEffect(
        () => {
            if (fiendId !== undefined) {
                const copy = fiends.length > 0 ? fiends.map(x => ({ ...x })) : <></>
                const filterCopy = copy.length > 0 ? copy.filter(x => x.fiendsId === fiendId) : <></>

                setFilterFiends(filterCopy)
            }
        }, [fiends]
    )

    const addFiend = async () => {
        console.log(fiendId)
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
                    <div className="fiend-add">
                        <img
                            onClick={
                                () => {
                                    addFiend()
                                }
                            }
                            className="plus"
                            src={require("../capstone-images/plus.png")} />
                    </div>

                </section>
            </section>
        </>
    )
}