import "./Fiends.css"

import { useState, useEffect } from "react"

export const Fiends = () => {

    const [fiendsList, setFiendsList] = useState([])

    const fetchMyFiends = async () => {
        const fetchData = await fetch(``)

    }

    // fetch fiends 
    // fetch users
    // filter users id by fiends id and get name

    return (
        <>
            <section className="scares-list">
                <section className="filter-scares">
                    <div className="scares-list-title">MY <span>FIENDS</span></div>
                </section>
            </section>
        </>
    )
}