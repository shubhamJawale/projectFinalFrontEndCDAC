import React from 'react'
import { Link } from 'react-router-dom'

export default function ContractorNavBar() {
    return (
        <div className="mynav">
            <ul style={{ listStyle: 'none' }}>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/addLicenseNo">Add License</Link></li>
                <li > <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/ShowRecentWork">Show Recent Work Feed</Link></li >
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/ShowBiddingByCOntractorID">Show My Biddings</Link></li>

                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/AssignedWorkByCOntractorID">Show My Assigned Work</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/GetLabourListByContractorID">Show My Labours</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/requestList">Show Requests</Link></li>
                <li><Link className="text-light px-5 font-weight-bold text-decoration-none" to="/contractor/ShowReviews">Show Review</Link></li>

                {

                   /*/contractor/ShowReviews
                  
                   /contractor/GetLabourListByContractorID
                <li><Link to="/user/getlabour">Show Labour List</Link></li>
                <li><Link to="/user/getallassigned">My Assigned Works</Link></li>
                <li><Link to="/user/getaddedworks">My Added Works</Link></li>
                <li><Link to="/user/upadateuser">Update My Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li> */}

            </ul >
        </div >
    )
}
