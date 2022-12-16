import "./Fiends.css"
import { useState, useEffect } from "react"

export const FiendsProfile = ({ name, email, add, fiendId, fetchAll, noEntry, setTest, test, fiendsList }) => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [fiends, setFiends] = useState([])
    const [filterFiends, setFilterFiends] = useState([])
    const [del, setDel] = useState(false)

    // const fetchFiends = async () => {
    //     const fetchData = await fetch(`http://localhost:8088/fiends?usersId=${projectUserObject.id}`)
    //     const fetchJson = await fetchData.json()
    //     setFiends(fetchJson)
    // }

    // useEffect(
    //     () => {
    //         fetchFiends()
    //     }, [, del]
    // )

    useEffect(
        () => {
            if (fiendId !== undefined) {

                const copy = fiendsList.length > 0 ? fiendsList.map(x => ({ ...x })) : <></>
                const filterCopy = copy.length > 0 ? copy.find(x => x.fiendsId === fiendId) : <></>

                setFilterFiends(filterCopy)
            }
        }, [fiendsList]
    )

    const deleteFiend = async () => {
        const fetchFiends = await fetch(`http://localhost:8088/fiends/${filterFiends.id}`, { method: "DELETE" })
        fetchAll()

        // await setTest(!test)
        // await fetchFiends()


    }

    const addFiend = async () => {
        console.log(fiendId)
        if (fiendId !== undefined) {

            const obj = {
                usersId: projectUserObject.id,
                fiendsId: fiendId
            }

            const fetchFiends = await fetch(`http://localhost:8088/fiends`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            })
            await setTest(!test)
            // fetchAll()
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
                                (clickEvent) => {
                                    clickEvent.preventDefault()
                                    deleteFiend()
                                }
                            }
                            className="minus"
                            src={require("../capstone-images/minus.png")} /> </div>

                </section>
            </section>
        </>
    )
}