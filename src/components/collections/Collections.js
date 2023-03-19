import "../scares/Scares.css"
import "./Collections.css"
import { useEffect, useState } from "react"
import { Scares } from "../scares/Scares"

export const Collections = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [search, setSearch] = useState("")
    const [searchedScares, setSearchedScares] = useState([])
    const [searchMyCreations, setSearchMyCreations] = useState(false)
    const [scares, setScares] = useState([])
    const [filterScares, setFilterScares] = useState([])

    const fetchScares = async () => {
        const fetchData = await fetch(`http://localhost:8088/finished?_expand=users&_expand=scares`)
        const fetchJson = await fetchData.json()
        const sortData = fetchJson.sort((a, b) => a.scares.name.localeCompare(b.scares.name))
        setScares(sortData)
    }

    useEffect(
        () => {
            fetchScares()
        }, []
    )

    useEffect(
        () => {
            const copy = filterScares.map(x => ({ ...x }))
            const filterCopy = copy.filter(x => {
                return x.scares.name.toLowerCase().includes(search.toLowerCase())

            })
            setSearchedScares(filterCopy)
        }, [search]
    )

    useEffect(
        () => {
            const copy = filterScares.map(x => ({ ...x }))
            setSearchedScares(copy)
        }, [filterScares]
    )

    useEffect(
        () => {
            const copy = scares.map(x => ({ ...x }))
            const filteredCopy = copy.filter(x => x.users.id === projectUserObject.id)
            setFilterScares(filteredCopy)

        }, [scares]
    )

    useEffect(
        () => {
            const copy = filterScares.map(x => ({ ...x }))

            if (searchMyCreations) {
                const filterCopy = copy.filter(x => x.scares.usersId === projectUserObject.id)
                setSearchedScares(filterCopy)
            } else {
                setSearchedScares(copy)
            }

        }, [searchMyCreations]
    )

    return (
        <>
            <section className="collections-list scares-list">
                <section className="filter-scares">
                    <div className="scares-list-title">MY <span>SCARES</span></div>
                    <section className="filter-my-scares">
                        <div className="my-creations"
                            style={searchMyCreations ? { backgroundColor: "white", color: "rgb(156,4,4)" } :
                                { backgroundColor: "rgb(23,23,23)" }}
                            onClick={
                                () => {
                                    setSearchMyCreations(!searchMyCreations)
                                }
                            }>MY CREATIONS {searchMyCreations ? <span>ON</span> : <span>OFF</span>}</div>


                        <input
                            onChange={(changeEvent) => (
                                setSearch(changeEvent.target.value))
                            }
                            type="text"
                            placeholder="Enter A Title"
                        />
                    </section>
                </section>
                {searchedScares.length > 0 ?

                    <div className="collectionsList allScares">
                        {searchedScares.map((scare) => (
                            <>
                                <div key={`collected-scare-container--${scare.scaresId}`} className="allScaresItem-bckgrnd" id="collectionItem-bckgrnd" >
                                    <div key={`collected-scare-item--${scare.scaresId}`} className="collectionItem allScaresItem">
                                        <Scares
                                            key={`collected-scare--${scare.scaresId}`}
                                            id={scare.scaresId}
                                            name={scare.scares.name}
                                            img={scare.scares.img}
                                            details={scare.scares.details}
                                            typeId={scare.scares.scareTypesId}
                                            creatorId={scare.scares.usersId}
                                            fetchScares={fetchScares}
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