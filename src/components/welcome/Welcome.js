import "./Welcome.css"
import "../scares/Scares.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Scares } from "../scares/Scares"
import { AddNew } from "../forms/AddNew"

export const Welcome = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const navigate = useNavigate()

    const [welcomeScares, setWelcomeScares] = useState([])
    const [filterScares, setFilterScares] = useState([])
    const [filterLatestFilm, setFilterLatestFilm] = useState([])
    const [filterLatestGame, setFilterLatestGame] = useState([])
    const [filterLatestBook, setFilterLatestBook] = useState([])


    const fetchWelcomeScares = async () => {
        const fetchData = await fetch(`http://localhost:8088/finished?_expand=users&_expand=scares`)
        const fetchJson = await fetchData.json()
        setWelcomeScares(fetchJson)
    }

    useEffect(
        () => {

            fetchWelcomeScares()

        }, []
    )

    useEffect(
        () => {
            const copy = welcomeScares.map(x => ({ ...x }))
            const filteredCopy = copy.filter(x => x.users.id === projectUserObject.id)
            setFilterScares(filteredCopy)

        }, [welcomeScares]
    )

    useEffect(
        () => {
            if (filterScares.length > 0 && filterScares !== null) {
                const copy = filterScares.map(x => ({ ...x }))
                console.log(copy)
                const filteredCopy = copy.filter(x => parseInt(x.scares.scareTypesId) === 1)
                console.log(filteredCopy)
                const lastElement = filteredCopy[filteredCopy.length > 0 ? filteredCopy.length - 1 : 0]
                console.log(lastElement)
                setFilterLatestFilm(lastElement !== undefined ? [lastElement] : "")
            }
        }, [filterScares]
    )
    console.log(filterLatestFilm)

    useEffect(
        () => {
            if (filterScares.length > 0 && filterScares !== null) {
                const copy = filterScares.map(x => ({ ...x }))
                console.log(copy)
                const filteredCopy = copy.filter(x => parseInt(x.scares.scareTypesId) === 2)
                console.log(filteredCopy)
                const lastElement = filteredCopy[filteredCopy.length > 0 ? filteredCopy.length - 1 : 0]
                console.log(lastElement)
                setFilterLatestGame(lastElement !== undefined ? [lastElement] : "")
            }
        }, [filterScares]
    )
    console.log(filterLatestGame.length)
    console.log(filterLatestGame)

    useEffect(
        () => {
            if (filterScares.length > 0 && filterScares !== null) {
                const copy = filterScares.map(x => ({ ...x }))
                console.log(copy)
                const filteredCopy = copy.filter(x => parseInt(x.scares.scareTypesId) === 3)
                console.log(filteredCopy)
                const lastElement = filteredCopy[filteredCopy.length > 0 ? filteredCopy.length - 1 : 0]
                console.log(lastElement)
                setFilterLatestBook(lastElement !== undefined ? [lastElement] : "")
            }
        }, [filterScares]
    )
    console.log(filterLatestBook.length)
    console.log(filterLatestBook)

    const hideHands = () => {
        const form = document.getElementById("form")
        form.style.bottom = "-1000px"

    }

    const showHands = () => {
        const form = document.getElementById("form")
        form.style.bottom = "8px"

    }

    return (
        <>
            <section className="form-container"
            // className="skeletonHands" id="skeletonHands"
            >
                <div className="form" id="form">
                    <AddNew
                        fetchWelcome={fetchWelcomeScares} />
                </div>
            </section>
            <section className="createNew" id="createNew" onClick={
                () => {
                    document.getElementById("createNew").style.display = "none"
                    hideHands()
                }}>
                <div>
                </div>
            </section>
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
                            <div className="scareContainer">{filterLatestFilm !== undefined && filterLatestFilm.length > 0 ?
                                <div className="recentScares">
                                    <>
                                        {console.log(filterLatestFilm)}
                                        <Scares
                                            id={filterLatestFilm[0].scaresId}
                                            name={filterLatestFilm[0].scares.name}
                                            img={filterLatestFilm[0].scares.img}
                                            details={filterLatestFilm[0].scares.details}
                                            typeId={filterLatestFilm[0].scares.scareTypesId}
                                            creatorId={filterLatestFilm[0].users.id}
                                            creatorName={filterLatestFilm[0].users.fullName}
                                            fetchScares={fetchWelcomeScares}
                                        />
                                    </>
                                </div>
                                : <><img className="latest-film-img"
                                    src={require("../capstone-images/film-removebg-preview.png")} /></>} </div>
                            <div className="scareContainer">{filterLatestGame !== undefined && filterLatestGame.length > 0 ?
                                <div className="recentScares">
                                    <>
                                        <Scares
                                            id={filterLatestGame[0].scaresId}
                                            name={filterLatestGame[0].scares.name}
                                            img={filterLatestGame[0].scares.img}
                                            details={filterLatestGame[0].scares.details}
                                            typeId={filterLatestGame[0].scares.scareTypesId}
                                            creatorId={filterLatestGame[0].users.id}
                                            creatorName={filterLatestGame[0].users.fullName}
                                            fetchScares={fetchWelcomeScares}
                                        />
                                    </>
                                </div>
                                : <><img className="latest-game-img"
                                    src={require("../capstone-images/game-removebg-preview.png")} /></>}</div>
                            <div className="scareContainer">{filterLatestBook !== undefined && filterLatestBook.length > 0 ?
                                <div className="recentScares">
                                    <>
                                        <Scares
                                            id={filterLatestBook[0].scaresId}
                                            name={filterLatestBook[0].scares.name}
                                            img={filterLatestBook[0].scares.img}
                                            details={filterLatestBook[0].scares.details}
                                            typeId={filterLatestBook[0].scares.scareTypesId}
                                            creatorId={filterLatestBook[0].users.id}
                                            creatorName={filterLatestBook[0].users.fullName}
                                            fetchScares={fetchWelcomeScares}
                                        />
                                    </>
                                </div>
                                : <><img className="latest-book-img"
                                    src={require("../capstone-images/book-removebg-preview.png")} /></>} </div>
                        </section>
                        <section>
                            <div className="ready">READY TO ADD MORE?</div>
                            <section className="addMore">
                                <div onClick={
                                    () => {
                                        document.getElementById("createNew").style.display = "block"
                                        showHands()
                                    }
                                }><span>+</span> CREATE NEW</div>
                                <div onClick={
                                    () => { navigate("/scares") }
                                }>SEARCH EXISTING</div>
                            </section>
                        </section>
                    </section>

                </section>
            </section>
        </>
    )
}