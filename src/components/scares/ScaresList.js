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

    const blankFunction = () => { return "" }

    return (
        <>
            {scares.length > 0 ?

                <div className="allScares">
                    {scares.map((scare) => (
                        <>
                            <section>
                                <div className="allScaresItem-bckgrnd" id="allScaresItem-bckgrnd" >

                                    <div className="allScaresItem">

                                        <Scares
                                            id={scare.id}
                                            name={scare.name}
                                            img={scare.img}
                                            details={scare.details}
                                            typeId={parseInt(scare.scareTypes.id)}
                                            creatorId={scare.users.id}
                                            creatorName={scare.users.fullName}

                                        />

                                    </div>
                                </div>
                            </section>
                        </>

                    ))}
                </div>

                : <></>}
        </>)
}