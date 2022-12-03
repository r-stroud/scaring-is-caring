import "./ApplicationViews.css"
import { Navigate, Route, Routes } from "react-router-dom"
import { Collections } from "../collections/Collections"
import { Welcome } from "../welcome/Welcome"
import { ScaresList } from "../scares/ScaresList"

export const ApplicationViews = () => {



    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/scares" element={<ScaresList />} />
            </Routes>
        </>
    )
}