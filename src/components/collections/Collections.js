import "../scares/Scares.css"
import { useEffect, useState } from "react"
import { Scares } from "../scares/Scares"

export const Collections = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [scares, setScares] = useState([])
    const [filterScares, setFilterScares] = useState([])

    useEffect(
        () => {
            const fetchScares = async () => {
                const fetchData = await fetch(`http://localhost:8088/finished?_expand=users&_expand=scares`)
                const fetchJson = await fetchData.json()
                setScares(fetchJson)
            }
            fetchScares()

        }, []
    )

    useEffect(
        () => {
            const copy = scares.map(x => ({ ...x }))
            const filteredCopy = copy.filter(x => x.users.id === projectUserObject.id)
            setFilterScares(filteredCopy)

        }, [scares]
    )


    return (
        <>
            <h1>Collections</h1>
            {filterScares.length > 0 ?

                <div className="collectionsList">
                    {filterScares.map((scare) => (
                        <>
                            <div className="collectionItem">
                                <Scares
                                    id={scare.scaresId}
                                    name={scare.scares.name}
                                    img={scare.scares.img}
                                    details={scare.scares.details}
                                    typeId={scare.scares.scareTypesId}
                                    creatorId={scare.usersId}
                                    creatorName={scare.users.fullName}
                                />
                            </div>
                        </>

                    ))}
                </div>

                : <></>}
        </>
    )
}