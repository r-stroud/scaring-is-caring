import "./Scares.css"
import { useState, useEffect } from "react"
import { Scares } from "./Scares"

export const ScaresList = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [scares, setScares] = useState([])
    const [search, setSearch] = useState("")
    const [searchedScares, setSearchedScares] = useState([])
    const [searchMyCreations, setSearchMyCreations] = useState(false)


    const fetchScares = async () => {
        const fetchData = await fetch(`http://localhost:8088/scares?_expand=scareTypes&_expand=users`)
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
            const searchResults = copy.filter(x => {
                return x.name.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedScares(searchResults)

        }, [search]
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

            if (searchMyCreations) {
                const filterCopy = copy.filter(x => x.usersId === projectUserObject.id)
                setSearchedScares(filterCopy)
            } else {
                setSearchedScares(copy)
            }

        }, [searchMyCreations]
    )

    return (
        <>

            <section className="scares-list">

                <section className="filter-scares">
                    <div className="scares-list-title">ALL <span>SCARES</span></div>
                    <section className="filter-my-scares">
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
                    </section>
                    <input
                        onChange={(changeEvent) => (
                            setSearch(changeEvent.target.value))
                        }
                        type="text"
                        placeholder="Enter A Title"
                    />

                </section>




                {searchedScares.length > 0 ?

                    <div className="allScares" id="allScares">
                        {searchedScares.map((scare) => (
                            <>
                                <section >
                                    <div className="allScaresItem-bckgrnd" id="allScaresItem-bckgrnd" >

                                        <div className="allScaresItem">

                                            <Scares
                                                key={`scare--${scare.id}`}
                                                id={scare.id}
                                                name={scare.name}
                                                img={scare.img}
                                                details={scare.details}
                                                typeId={parseInt(scare.scareTypes.id)}
                                                creatorId={scare.users.id}
                                                creatorName={scare.users.fullName}
                                                fetchScares={fetchScares}

                                            />

                                        </div>
                                    </div>
                                </section>
                            </>

                        ))}
                    </div>

                    : <></>}
            </section>
        </>)
}