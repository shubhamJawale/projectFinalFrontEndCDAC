import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function UserNavbar() {
    return (

        <div className="mynav1">
            <ul style={{ listStyle: 'none' }}>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/user/addwork">Add Work</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/user/getcontractor">Show Contractor List</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/user/getlabour">Show Labour List</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/user/getallassigned">My Assigned Works</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/user/getaddedworks">My Added Works</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/user/upadateuser">Update My Profile</Link></li>
                {/*  <li><Link to="/user/ShowReview">Show  My Reviews</Link></li> */}


            </ul >
        </div >
    )
}
