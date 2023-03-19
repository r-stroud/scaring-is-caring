import "./Fiends.css"

export const FiendsProfile = ({ name, email, fiendId, fetchAll, fiendsList, }) => {

    const localProjectUser = localStorage.getItem("scary_user")
    const projectUserObject = JSON.parse(localProjectUser)

    const deleteFiend = async () => {

        const fiendFunction = () => {
            if (fiendsList.length > 0) {
                const copy = fiendsList.map(x => ({ ...x }))
                const filterCopy = copy.find(x => x.fiends === fiendId)
                return filterCopy.id
            }
        }
        const fetchId = await fiendFunction()

        const fetchFiends = await fetch(`http://localhost:8088/fiends/${fetchId}`, {
            method: "DELETE",
        })
        fetchAll()
    }

    const addFiend = async () => {

        if (fiendId !== undefined) {

            const obj = {
                usersId: projectUserObject.id,
                fiends: fiendId
            }

            const fetchFiends = await fetch(`http://localhost:8088/fiends`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            })
            fetchAll()
        }
    }
    return (
        <>
            <section className="fiend-profile">
                <section className="fiend-profile-header">

                    <div className="fiend-name">{name}</div>
                    <div className="fiend-email">{email}</div>

                    <div className="fiend-add"
                        onClick={
                            (clickEvent) => {
                                clickEvent.preventDefault()
                                deleteFiend()
                            }
                        }> REMOVE FIEND
                    </div>

                </section>
            </section>
        </>
    )
}