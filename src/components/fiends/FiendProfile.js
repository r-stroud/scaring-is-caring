import "./Fiends.css"

export const FiendsProfile = ({ name, email, add }) => {

    return (
        <>
            <section className="fiend-profile">
                <section className="fiend-profile-header">
                    <div className="fiend-name">{name}</div>
                    <div className="fiend-email">{email}</div>
                    {add ? <div className="fiend-add">ADD ME </div> : <></>}
                </section>
            </section>
        </>
    )
}