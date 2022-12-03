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

    const test = () => { if (scares.length > 0) { console.log(scares[0].scareTypes.id) } }
    test()

    return (
        <>
            {scares.length > 0 ?

                <div className="allScares">
                    {scares.map((scare) => (
                        <>
                            <div className="allScaresItem">
                                <Scares
                                    id={scare.id}
                                    name={scare.name}
                                    img={scare.img}
                                    details={scare.details}
                                    typeId={scare.scareTypes.id}
                                    creatorId={scare.users.id}
                                    creatorName={scare.users.fullName}
                                />
                            </div>
                        </>

                    ))}
                </div>

                : <></>}
        </>)
}