import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function ShowBidding() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        let wid = JSON.parse(sessionStorage.getItem("WorkId"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "USER") {
            history.replace("/");
            setuserdata(user);
        }
        getContractors(wid);

        return () => {



        };
    }, []);

    let getContractors = (id) => {
        //console.log(userdata.userId);
        axios.get(`${baseurl}/user/getbiddingsbyworkId/${id}`).then((response) => {
            setusercontractorlist(response.data);
            toast.success("Contracotr Data Loaded Successfully");
            console.log(usercontractorlist);

        }, (error) => {
            toast.error("Somthing went Wrong");
        })
    }

    let addtoAssignedWork = (id1) => {
        console.log(id1)
        let worktemp = sessionStorage.getItem("Work");
        let work = JSON.parse(worktemp);
        console.log(work);
        axios.post(`${baseurl}/user/addtoassignedwork/${id1}`, work).then((response) => { console.log("Added"); history.push("/user"); }, (error) => { console.log(error) })
    }

    return (
        <div>
            <input type="button" className="btn" value=" go back" onClick={() => { history.push("/user") }} />

            {


                usercontractorlist.map((userset) => {
                    return (
                        <Card key="{userset.biddingId}" color="info" inverse className="m-1 justify-content-center text-center">
                            <CardHeader>
                                <CardTitle tag="h5" >{userset.biddingId}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>Description: {userset.description}</CardText>
                                <CardText>Amount: {userset.amount}</CardText>
                                <CardText>From: {userset.fromDate}</CardText>
                                <CardText>To: {userset.toDate}</CardText>
                                <CardText>Status: {userset.status}</CardText>
                                <CardText>test: {userset.biddingId}</CardText>
                                < input type="button" onClick={() => addtoAssignedWork(userset.biddingId)} value="Accept Bidding" className="btn btn-warning" />
                            </CardBody>
                        </Card>


                    )
                })
            } </div >
    )
}


/* "biddingId": 22,
    "description": "123456788",
        "amount": 2400.0,
            "fromDate": null,
                "toDate": null,
                    "status": null */
