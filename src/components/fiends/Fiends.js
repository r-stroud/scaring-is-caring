import "./Fiends.css"

import { useState, useEffect } from "react"
import { FiendsProfile } from "./FiendProfile"
import { Users } from "./Users"

export const Fiends = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const [fiendsList, setFiendsList] = useState([])
    const [usersList, setUsersList] = useState([])
    const [filteredFiendsList, setFilteredFiendsList] = useState([])
    const [search, setSearch] = useState("")
    const [userSearch, setUserSearch] = useState("")
    const [searchedFiends, setSearchedFiends] = useState([])
    const [switchFilter, setSwitchFilter] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchedUsers, setSearchedUsers] = useState([])
    const [test, setTest] = useState(false)


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
            fetchAll()
        }, []
    )

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
                return x.fullName.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase())
            })
            setSearchedFiends(filterCopy)
        }, [search]
    )

    useEffect(
        () => {
            const copy = filteredUsers.map(x => ({ ...x }))
            const filterCopy = copy.filter(x => {
                return x.fullName.toLowerCase().includes(userSearch.toLowerCase()) || x.email.toLowerCase().includes(userSearch.toLowerCase())
            })
            setSearchedUsers(filterCopy)
        }, [userSearch]
    )


    useEffect(
        () => {

            const copy = usersList.length > 0 ? usersList.map(x => ({ ...x })) : <></>
            const fiendCopy = fiendsList.length > 0 ? fiendsList.map(x => x.fiends) : <></>
            const filterCopy = copy.length > 0 && fiendCopy.length > 0 ? copy.filter(x =>
                x.id !== projectUserObject.id && !fiendCopy.includes(x.id)
            ) : copy.length > 0 ? copy.filter(x => x.id != projectUserObject.id) : <></>
            setFilteredUsers(filterCopy)
        }, [fiendsList]
    )

    useEffect(
        () => {
            const copy = filteredUsers.length > 0 ? filteredUsers.map(x => ({ ...x })) : <></>
            setSearchedUsers(copy)
        }, [filteredUsers]

    )

    return (
        <>
            <section className="scares-list">
                <section className="filter-scares">
                    <div className="scares-list-title">MY <span>FIENDS</span></div>
                    <section className="fiend-options">
                        <div className="filter-fiends"></div>
                        <div className="add-fiends">
                            <input
                                id="addFiendsSearch"
                                onChange={(changeEvent) => (
                                    switchFilter ?
                                        setUserSearch(changeEvent.target.value) :
                                        setSearch(changeEvent.target.value))
                                }
                                type="text"
                                placeholder="ENTER A NAME OR EMAIL"
                            />
                            <div className="switch-filter" onClick={
                                () => {
                                    setSwitchFilter(!switchFilter)
                                    setUserSearch(document.getElementById("addFiendsSearch").value)
                                    setSearch(document.getElementById("addFiendsSearch").value)
                                }
                            }>{switchFilter ? "USERS" : "FIENDS"}</div>
                        </div>
                    </section>

                </section>
                <div className="my-fiends">

                    <div className="my-fiends-scroll">
                        {!switchFilter ?
                            <div className="my-fiends-container">
                                {searchedFiends.length > 0 ? searchedFiends.map(

                                    (fiend) => (
                                        <>
                                            <FiendsProfile
                                                key={`fiend--${fiend.id}`}
                                                fiendId={fiend.id}
                                                name={fiend.fullName}
                                                email={fiend.email}
                                                fetchAll={fetchAll}
                                                setTest={setTest}
                                                test={test}
                                                fiendsList={fiendsList}
                                            />
                                        </>
                                    ))
                                    : <></>}
                            </div>
                            :

                            <div className="my-fiends-container">
                                {searchedUsers.length > 0 ? searchedUsers.map(
                                    (fiend) => (
                                        <>
                                            {console.log(fiend)}
                                            <Users
                                                key={`user--${fiend.id}`}
                                                fiendId={fiend.id}
                                                name={fiend.fullName}
                                                email={fiend.email}
                                                fetchAll={fetchAll}
                                                setTest={setTest}
                                                add={true} />
                                        </>
                                    ))
                                    : <></>}
                            </div>

                        }

                    </div>
                </div>
            </section>
        </>
    )
}