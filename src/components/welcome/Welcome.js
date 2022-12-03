import "./Welcome.css"
import "../scares/Scares.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Scares } from "../scares/Scares"

export const Welcome = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const navigate = useNavigate()

    const [scares, setScares] = useState([])
    const [filterScares, setFilterScares] = useState([])
    const [filterLatestFilm, setFilterLatestFilm] = useState([])

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

    console.log(scares)
    useEffect(
        () => {
            if (filterScares.length > 0 && filterScares !== null) {
                const copy = filterScares.map(x => ({ ...x }))
                const filteredCopy = copy.filter(x => x.scares.scareTypesId === 1)
                const lastElement = filteredCopy[filteredCopy.length - 1]
                setFilterLatestFilm([lastElement])
            }
        }, [filterScares]
    )

    console.log(filterLatestFilm)


    return (
        <>
            <section className="homePage">
                <section className="selections">

                    <div className="selection" onClick={
                        () => {
                            navigate("/collections")
                        }
                    }>COLLECTIONS</div>

                    <div className="selection">RECOMMENDATIONS</div>
                    <div className="selection">QUEUE</div>
                </section>
                <section className="welcome">
                    <div className="welcomeUser">WELCOME, <span>{projectUserObject.fullName.toUpperCase()}</span>.</div>
                    <section>
                        <div className="latest">LATEST ADDITIONS TO YOUR COLLECTION</div>
                        <section className="recentAdditions">
                            <div>{filterLatestFilm !== undefined && filterLatestFilm.length > 0 ?

                                <div className="recentScares">

                                    <>
                                        <Scares
                                            id={filterLatestFilm[0].scaresId}
                                            name={filterLatestFilm[0].scares.name}
                                            img={filterLatestFilm[0].scares.img}
                                            details={filterLatestFilm[0].scares.details}
                                            typeId={filterLatestFilm[0].scares.scareTypesId}
                                            creatorId={filterLatestFilm[0].users.id}
                                            creatorName={filterLatestFilm[0].users.fullName}
                                        />
                                    </>

                                </div>

                                : <></>} </div>
                            <div>Video Games </div>
                            <div>Books </div>
                        </section>
                        <section>
                            <div>READY TO ADD MORE?</div>
                            <section className="addMore">
                                <div>Create New</div>
                                <div>Search For Exisiting</div>
                            </section>
                        </section>
                    </section>

                </section>
            </section>
        </>
    )
}