import React from 'react'
import DefaultAvatar from '../images/avatar.png'

export default function User(props) {
    const user = props.user;

    let photoUrl = `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`;

    return (

        <div className="p-2 border-top d-flex justify-content-start" style={{ height: "70px" }}>
            <div style={{ marginRight: "7px" }}>
                <img style={{ height: "47px", width: "47px" }} onError={img => img.target.src = DefaultAvatar}
                    className="rounded-circle" src={photoUrl} alt={user.name} />
            </div>
            <div>
                <span className="align-top mb-1">
                    {user.name}
                </span> <br />
                <span className="text-muted small">
                    {user.about.length > 25 ? (user.about.substring(0, 25) + "...") : (user.about)}
                </span>
            </div>

        </div>
    )
}
