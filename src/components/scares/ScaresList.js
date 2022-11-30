import "./Scares.css"
import { useState, useEffect } from "react"
import { Scares } from "./Scares"

export const ScaresList = () => {

    const [scares, setScares] = useState([])

    useEffect(
        () => {
            const fetchScares = async () => {
                const fetchData = await fetch(`http://localhost:8088/scares?_expand=scareTypes&_expand=users`)
                const fetchJson = await fetchData.json()
                setScares(fetchJson)
            }
            fetchScares()

        }, []
    )

    return (
        <>
            {scares.length > 0 ?

                <div className="scareList">
                    {scares.map((scare) => (
                        <>
                            <Scares
                                id={scare.id}
                                name={scare.name}
                                img={scare.img}
                                details={scare.details}
                                type={scare.scareTypes.type}
                                creatorId={scare.users.id}
                                creatorName={scare.users.fullName}
                            />
                        </>

                    ))}
                </div>

                : <></>}
        </>)
}