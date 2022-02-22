import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function UserINfo() {
    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "USER") {
            history.replace("/");
            setuserdata(user);
        }


        return () => {



        };
    }, []);
    return (
        <div>
            <h6>HELLO BHAU</h6>
        </div>
    )
}
