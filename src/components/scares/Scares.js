import "./Scares.css"
import { EditForm } from "../forms/EditForm"
import { FiendsProfile } from "../fiends/FiendProfile"

import { useState, useEffect } from "react"

export const Scares = ({ id, name, img, details, typeId, creatorId, fetchScares, callTypes, recommendation, recommendationId }) => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)


    const [types, setTypes] = useState([])
    const [filterTypes, setFilterTypes] = useState([])
    const [height, setHeight] = useState(false)
    const [finished, setFinished] = useState([])
    const [finishedFilter, setFinishedFilter] = useState([])
    const [showEdit, setShowEdit] = useState(false)

    const [fiendsList, setFiendsList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [filteredFiendsList, setFilteredFiendsList] = useState([])
    const [search, setSearch] = useState("")
    const [searchedFiends, setSearchedFiends] = useState([])
    const [showFiends, setShowFiends] = useState(false)
    const [selectedFiend, setSelectedFiend] = useState({
        usersId: projectUserObject.id,
        fiends: 0,
        scaresId: id,
        comment: "test"
    })
    const [fiendsName, setFiendsName] = useState("")


    const fetchMyFiends = async () => {
        const fetchData = await fetch(`http://localhost:8088/fiends?usersId=${projectUserObject.id}`)
        const fetchJson = await fetchData.json()
        setFiendsList(fetchJson)
    }

    const fetchUserList = async () => {
        const fetchData = await fetch(`http://localhost:8088/users`)
        const fetchJson = await fetchData.json()
        setUsersList(fetchJson)
    }

    const fetchAll = async () => {
        await fetchUserList()
        await fetchMyFiends()

    }

    useEffect(
        () => {
            const fiendCopy = fiendsList.map(x => ({ ...x }))

            const userCopy = usersList.map(x => ({ ...x }))

            let filterCopy = fiendCopy.map(x => userCopy.find(user => user.id === x.fiends))

            setFilteredFiendsList(filterCopy)
        }, [fiendsList]
    )

    useEffect(
        () => {
            const copy = filteredFiendsList.map(x => ({ ...x }))
            setSearchedFiends(copy)
        }, [filteredFiendsList]
    )

    useEffect(
        () => {
            const copy = filteredFiendsList.map(x => ({ ...x }))
            const filterCopy = copy.filter(x => {
                return x.fullName.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedFiends(filterCopy)
        }, [search]
    )

    useEffect(
        () => {

            if (showFiends === false) {
                document.getElementById(`recommendToFiend--${id}`).style.height = "0px"
            } else {
                document.getElementById(`recommendToFiend--${id}`).style.height = "61%"
            }

        }, [showFiends]
    )

    const fetchTypes = async () => {
        const fetchData = await fetch(`http://localhost:8088/scareTypes`)
        const fetchJson = await fetchData.json()
        setTypes(fetchJson)
    }

    useEffect(
        () => {

            fetchTypes()
            fetchAll()
        }, [, callTypes]
    )

    const fetchFinished = async () => {
        const fetchData = await fetch(`http://localhost:8088/finished`)
        const fetchJson = await fetchData.json()
        setFinished(fetchJson)
    }

    useEffect(
        () => {

            fetchFinished()
        }, []
    )

    useEffect(
        () => {

            const findFinished = () => {

                const copy = finished.map(x => ({ ...x }))
                if (copy.length > 0) {
                    const findScare = copy.filter(x => x?.scaresId === id && x?.usersId === projectUserObject?.id)
                    setFinishedFilter(findScare)
                }
            }
            findFinished()
        }, [finished]
    )

    useEffect(
        () => {
            if (types.length > 0) {
                const copy = types.map(x => ({ ...x }))
                const copyTypes = copy.filter(x => x.id === parseInt(typeId))
                const copyTypeName = copyTypes[0].type
                setFilterTypes(copyTypeName)
            }
        }, [types]
    )

    const recommend = async () => {
        // const recommnededObj = {
        //     usersId: projectUserObject.id,
        //     fiends: 2,
        //     scaresId: id,
        //     comment: "test",
        // }

        const fetchData = await fetch(`http://localhost:8088/recommended`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedFiend)
        })

    }

    const addAndRemove = async () => {
        await addToCollection()
        await removeRecommendation()
        fetchScares()
    }

    const removeRecommendation = async () => {
        const fetchData = await fetch(`http://localhost:8088/recommended/${recommendationId}`, {
            method: "DELETE"
        })
        fetchScares()
    }

    const addToCollection = async () => {

        const collectionObj = {
            usersId: projectUserObject.id,
            scaresId: id
        }


        const fetchData = await fetch(`http://localhost:8088/finished`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(collectionObj)
        })

        fetchFinished()

    }

    const deleteFromCollection = async () => {
        if (finishedFilter.length > 0) {
            const findMatch = finishedFilter.find(x => x.scaresId === id)
            const fetchData = await fetch(`http://localhost:8088/finished/${findMatch.id}`, {
                method: "DELETE"
            })
        }

        fetchFinished()
        fetchScares()
    }

    const permanentDelete = async () => {
        const fetchData = await fetch(`http://localhost:8088/scares/${id}`, {
            method: "DELETE"
        })

        fetchFinished()
        fetchScares()

    }



    const rate = (num) => {

        const rate = document.getElementById(`heart${num}--${id}`)

        const heart1 = document.getElementById(`heart1--${id}`)
        const heart2 = document.getElementById(`heart2--${id}`)
        const heart3 = document.getElementById(`heart3--${id}`)
        const heart4 = document.getElementById(`heart4--${id}`)
        const heart5 = document.getElementById(`heart5--${id}`)

        rate.addEventListener("click", (event) => {

            if (num > 4) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
                heart5.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 3) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 2) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 1) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 0) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
            }

        })
    }

    const rateUp = (num) => {

        const rate = document.getElementById(`heart${num}--${id}`)

        const heart1 = document.getElementById(`heart1--${id}`)
        const heart2 = document.getElementById(`heart2--${id}`)
        const heart3 = document.getElementById(`heart3--${id}`)
        const heart4 = document.getElementById(`heart4--${id}`)
        const heart5 = document.getElementById(`heart5--${id}`)

        rate.addEventListener("mouseover", (event) => {

            if (num > 4) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
                heart5.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 3) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
                heart4.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 2) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
                heart3.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 1) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
                heart2.style.filter = " grayscale(0%) brightness(100%)"
            } else if (num > 0) {
                heart1.style.filter = " grayscale(0%) brightness(100%)"
            }

        })
    }

    const rateDown = (num) => {

        const rate = document.getElementById(`heart${num}--${id}`)

        const heart1 = document.getElementById(`heart1--${id}`)
        const heart2 = document.getElementById(`heart2--${id}`)
        const heart3 = document.getElementById(`heart3--${id}`)
        const heart4 = document.getElementById(`heart4--${id}`)
        const heart5 = document.getElementById(`heart5--${id}`)

        rate.addEventListener("mouseout", (event) => {

            if (num > 4) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
                heart3.style.filter = " grayscale(100%) brightness(10%)"
                heart4.style.filter = " grayscale(100%) brightness(10%)"
                heart5.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 3) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
                heart3.style.filter = " grayscale(100%) brightness(10%)"
                heart4.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 2) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
                heart3.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 1) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
                heart2.style.filter = " grayscale(100%) brightness(10%)"
            } else if (num > 0) {
                heart1.style.filter = " grayscale(100%) brightness(10%)"
            }

        })
    }


    return (
        <>
            {showEdit ?
                <>
                    <section id={`blur-scares--${id}`} className="blur-scares" onClick={
                        () => {
                            setShowEdit(!showEdit)
                        }
                    }>
                        <div></div>
                    </section>

                    <section className="edit-form-container" id={`edit-form--${id}`}>
                        <EditForm
                            key={`edit--${id}`}
                            editId={id}
                            editName={name}
                            editImg={img}
                            editDetails={details}
                            editTypeId={typeId}
                            editCreatorId={creatorId}
                            // editCreatorName={creatorName}
                            editFetchScares={fetchScares}
                            setShowEdit={setShowEdit}
                            showEdit={showEdit}
                            fetchTypes={fetchTypes}
                        />  </section>
                </> : <></>}



            <section className="scareContainers" id={`scareContainers--${id}`}>


                <section className="scareHeader" onClick={
                    () => {
                        if (!height) {
                            document.getElementById(`scareBackground--${id}`).style.height = "0px"
                            document.getElementById(`scareBackground--${id}`).style.transitionDelay = "0s"
                            document.getElementById(`scare--${id}`).style.transitionDelay = "0.8s"
                            document.getElementById(`scare--${id}`).style.height = "85%"
                            setShowFiends(false)
                            setHeight(!height)
                        } else {
                            document.getElementById(`scareBackground--${id}`).style.height = "85%"
                            document.getElementById(`scareBackground--${id}`).style.transitionDelay = "0.8s"
                            document.getElementById(`scare--${id}`).style.transitionDelay = "0s"
                            document.getElementById(`scare--${id}`).style.height = "0px"
                            setShowFiends(false)
                            setHeight(!height)
                        }



                    }}>
                    <section className="scareNameIcon">
                        <div>{name.toUpperCase()}</div>
                        {filterTypes === "film" ? <img className="icon film" src={require("../capstone-images/film-removebg-preview.png")} /> : <></>}
                        {filterTypes === "book" ? <img className="icon book" src={require("../capstone-images/book-removebg-preview.png")} /> : <></>}
                        {filterTypes === "video game" ? <img className="icon game" src={require("../capstone-images/game-removebg-preview.png")} /> : <></>}
                    </section>

                </section>
                {/* recommendation */}
                <section className="recommend-to-fiend" id={`recommendToFiend--${id}`}>
                    <div className="recommend-fiend-header">SELECT A FIEND:</div>
                    <div className="recommend-fiend-search">
                        <input
                            className="select-a-fiend"
                            onChange={(changeEvent) => (
                                setSearch(changeEvent.target.value))
                            }
                            type="text"
                            placeholder="SEARCH FOR A FIEND"
                        />
                    </div>

                    <div>
                        {searchedFiends.length > 0 ? searchedFiends.map(

                            (fiend) => (
                                <>
                                    <ul className="recommend-fiend-container">
                                        <li id={`recommendFiendItem--${fiend.id}`}
                                            onClick={(e) => {
                                                { console.log(fiend) }
                                                const copy = selectedFiend
                                                copy.fiends = e.target.value
                                                setSelectedFiend(copy)
                                                setFiendsName(fiend.fullName)
                                            }}
                                            className="recommend-fiend-item"
                                            type="radio"
                                            name="fiends"
                                            value={fiend.id} >{fiend.fullName}</li></ul>
                                </>
                            ))
                            : <></>}
                    </div>
                    <div className="recommend-fiend-header">ADD A COMMENT:</div>
                    <div className="recommend-textarea-container">
                        <textarea
                            className="recommend-textarea"
                            onChange={
                                (e) => {
                                    const copy = selectedFiend
                                    copy.comment = e.target.value
                                    setSelectedFiend(copy)
                                }
                            } />
                    </div>
                    <div className="recommend-button-container">
                        {fiendsName === "" ? <div className="no-fiend-selected">SELECT A FIEND</div> :
                            <button
                                className="recommend-button"
                                onClick={
                                    () => {
                                        recommend()
                                        setShowFiends(false)
                                    }
                                }
                            >
                                <span>RECOMMEND TO:</span>
                                <span className="recommend-to-button-name">{fiendsName}</span>
                            </button>}
                    </div>
                </section>

                <section className="scareBackground" id={`scareBackground--${id}`} style={{ backgroundImage: `url(${img})` }} >



                </section>
                <section className="scare" id={`scare--${id}`}>

                    <div className="viewed"></div>

                    <div className="description" id={`description--${id}`}>
                        <span>SYNOPSIS:</span><div>{details}</div></div>
                    <section className="ratings">
                        <div className="ratings-title">RATINGS:</div>
                        <section className="ratings-container">

                            <div className="userRating">USER:
                                <div className="heartRating">
                                    <img className="heart heart1" id={`heart1--${id}`} src={require("../capstone-images/heart.png")}
                                        onMouseOver={document.getElementById(`heart1--${id}`) ? rateUp(1) : ""}
                                        onMouseOut={document.getElementById(`heart1--${id}`) ? rateDown(1) : ""} />

                                    <img className="heart heart2" id={`heart2--${id}`} src={require("../capstone-images/heart.png")}
                                        onMouseOver={document.getElementById(`heart2--${id}`) ? rateUp(2) : ""}
                                        onMouseOut={document.getElementById(`heart2--${id}`) ? rateDown(2) : ""} />

                                    <img className="heart heart3" id={`heart3--${id}`} src={require("../capstone-images/heart.png")}
                                        onMouseOver={document.getElementById(`heart3--${id}`) ? rateUp(3) : ""}
                                        onMouseOut={document.getElementById(`heart3--${id}`) ? rateDown(3) : ""} />

                                    <img className="heart heart4" id={`heart4--${id}`} src={require("../capstone-images/heart.png")}
                                        onMouseOver={document.getElementById(`heart4--${id}`) ? rateUp(4) : ""}
                                        onMouseOut={document.getElementById(`heart4--${id}`) ? rateDown(4) : ""} />
                                    <img
                                        className="heart heart5"
                                        id={`heart5--${id}`}
                                        src={require("../capstone-images/heart.png")}
                                        onMouseOver={document.getElementById(`heart5--${id}`) ? rateUp(5) : ""}
                                        onMouseOut={document.getElementById(`heart5--${id}`) ? rateDown(5) : ""} />
                                </div>
                            </div>
                            <div className="avgRating">AVERAGE:
                                <div>
                                    <img className="heart" src={require("../capstone-images/heart.png")} />
                                    <img className="heart" src={require("../capstone-images/heart.png")} />
                                    <img className="heart" src={require("../capstone-images/heart.png")} />
                                    <img className="heart" src={require("../capstone-images/heart.png")} />
                                    <img className="heart" src={require("../capstone-images/heart.png")} />
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className="options">
                        {recommendation ?
                            <>
                                <div onClick={
                                    () => {
                                        addAndRemove()

                                    }
                                }>ADD TO COLLECTION</div>
                                <div
                                    onClick={
                                        () => {
                                            removeRecommendation()
                                        }
                                    }>REMOVE </div>
                            </> :
                            <>
                                <div onClick={
                                    () => {
                                        setShowFiends(!showFiends)
                                    }}>
                                    RECOMMEND</div>
                                {finishedFilter.length > 0 ?
                                    <section className="collections">
                                        <div className="collected">COLLECTED</div>
                                        <div className="remove"
                                            onClick={
                                                () => {
                                                    deleteFromCollection()
                                                }
                                            }
                                        >REMOVE</div>
                                    </section> :

                                    <div onClick={
                                        () => {
                                            addToCollection()

                                        }
                                    }>ADD TO COLLECTION</div>}
                                <section className="permanent-edits">
                                    {creatorId === projectUserObject.id ? <>
                                        <div className="perm-edit" onClick={
                                            () => {
                                                setShowEdit(!showEdit)

                                            }
                                        }>EDIT SCARE</div>

                                        <div className="perm-delete" onClick={
                                            () => { permanentDelete() }
                                        }>DELETE</div>
                                    </> : <></>}

                                </section> </>}

                    </section>

                </section>
            </section>



        </>
    )
}