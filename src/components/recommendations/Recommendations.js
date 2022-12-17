
import "./Recommendations.css"

import { useState, useEffect } from "react"
import { Scares } from "../scares/Scares"


export const Recommendations = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [search, setSearch] = useState("")
    const [searchedScares, setSearchedScares] = useState([])
    const [searchMyCreations, setSearchMyCreations] = useState(false)
    const [scares, setScares] = useState([])
    const [filterScares, setFilterScares] = useState([])

    const fetchScares = async () => {
        const fetchData = await fetch(`http://localhost:8088/recommended?_expand=scares&fiends=${projectUserObject.id}`)
        const fetchJson = await fetchData.json()
        setScares(fetchJson)
    }

    useEffect(
        () => {
            fetchScares()
        }, []
    )

    useEffect(
        () => {
            const copy = scares.map(x => ({ ...x }))
            setSearchedScares(copy)
        }, [scares]
    )



    useEffect(
        () => {
            const copy = scares.map(x => ({ ...x }))
            const filterCopy = copy.filter(x => {
                return x.scares.name.toLowerCase().includes(search.toLowerCase())

            })
            setSearchedScares(filterCopy)
        }, [search]
    )

    return (
        <>
            <section className="collections-list scares-list">
                <section className="filter-scares">
                    <div className="scares-list-title">MY <span>RECOMMENDATIONS</span></div>

                    {/* <section className="filter-my-scares">
                        <label htmlFor="myScare">MY CREATIONS</label>
                        <input
                            type="checkbox"
                            id="myScare"
                            name="my-scare"
                            value="Show My Scares"
                            onChange={() => (
                                setSearchMyCreations(!searchMyCreations)
                            )}
                        />
                    </section> */}

                    <input
                        onChange={(changeEvent) => (
                            setSearch(changeEvent.target.value))
                        }
                        type="text"
                        placeholder="Enter A Title"
                    />

                </section>
                {searchedScares.length > 0 ?

                    <div className="collectionsList allScares recommendList">
                        {searchedScares.map((scare) => (
                            <>

                                <div key={`recommended-scare-container--${scare.scaresId}`} className="allScaresItem-bckgrnd" id="collectionItem-bckgrnd" >
                                    <div key={`recommended-scare-item--${scare.scaresId}`} className="collectionItem allScaresItem">
                                        <Scares
                                            key={`recommended--${scare.scaresId}`}
                                            id={scare.scaresId}
                                            name={scare.scares.name}
                                            img={scare.scares.img}
                                            details={scare.scares.details}
                                            typeId={scare.scares.scareTypesId}
                                            creatorId={scare.scares.usersId}
                                            fetchScares={fetchScares}
                                            recommendation={true}
                                            recommendationId={scare.id}
                                        />
                                    </div>
                                </div>
                            </>

                        ))}
                    </div>

                    : <></>}
            </section>
        </>
    )
}