import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";

export default function LabourNavbar() {
    let history1 = useHistory();

    let cid;
    let [i, seti] = useState();
    useEffect(() => {
        if (
            sessionStorage.length === 0 ||
            sessionStorage.getItem("logLdata") === null
        ) {
            history1.replace("/labour");
        } else {
            let l = JSON.parse(sessionStorage.getItem("logLdata"));
            let count = 0;
            if (l.contractorId != 0) {
                count = 1;
                seti(count);
            } else {
                seti(count);
            }

            // console.log(i);
            if (i > 0) {
                cid = l.contractorId;
            }
        }

        return () => { };
    }, []);
    //links are in wrong plce replcace :<+>?

    console.log(i);
    return (
        <div className="mynav1">
            {i > 0 ? (
                <ul style={{ listStyle: "none" }}>

                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/showAssignedForContractor">Show My Teams Assigned Work</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/ShowContractorprof">Show Contractor Profile</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/updateprof">Update My Profile</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/ShowMyReview">Show My Review </Link>
                    </li>

                    {/*/labour/ShowMyReview 
                     <li><Link to="/user/addwork">Add Work</Link></li>
                <li><Link to="/user/getcontractor">Show Contractor List</Link></li>
                <li><Link to="/user/getlabour">Show Labour List</Link></li>
                <li><Link to="/user/getallassigned">My Assigned Works</Link></li>
                <li><Link to="/user/getaddedworks">My Added Works</Link></li>
                <li><Link to="/user/upadateuser">Update My Profile</Link></li>
                <li><Link to="/logout">Logout</Link></li> */}
                </ul>
            ) : (
                <ul style={{ listStyle: "none" }}>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/showAvialableWorks">Show Available Works</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/showAssignedForLabour"> Show My Assigned Works</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/ShowContractorByPin">Show Contractors</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/updateprof">Update My Profile</Link>
                    </li>
                    <li>
                        <Link className="text-light px-5 font-weight-bold text-decoration-none" to="/labour/ShowMyReview">Show My Review </Link>
                    </li>


                </ul>
            )}
        </div>
    );
}
