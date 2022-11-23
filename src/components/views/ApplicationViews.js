export const ApplicationViews = () => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    return (<h1>Application Views</h1>)
}