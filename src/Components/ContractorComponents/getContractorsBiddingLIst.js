import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function ShowBiddingByCOntractorID() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        let wid = JSON.parse(sessionStorage.getItem("abworkId"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "CONTRACTOR") {
            history.replace("/");
            setuserdata(user);
        }

        let cont = JSON.parse(sessionStorage.getItem("logCdata"));

        getContractors(cont.contractorId);

        return () => {



        };
    }, []);

    let getContractors = (id) => {
        ;
        axios.get(`${baseurl}/contractor/getBiddingsdetailsforContractor/${id}`).then((response) => {
            setusercontractorlist(response.data);

            console.log(usercontractorlist);

        }, (error) => {
            toast.error("Somthing went Wrong");
        })
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
                                <CardText>Description: {userset.bdescription}</CardText>
                                <CardText>Amount: {userset.bamount}</CardText>
                                <CardText>From: {userset.bfromDate}</CardText>
                                <CardText>To: {userset.btoDate}</CardText>
                                <CardText>Status: {userset.bstatus}</CardText>
                            </CardBody>
                            <CardFooter>
                                <CardSubtitle>Work Details :</CardSubtitle>
                                <CardText>Work Id: {userset.workId}</CardText>
                                <CardText>Work Title {userset.wtitle}</CardText>
                                <CardText>Work Description: {userset.wdescription}</CardText>
                                <CardSubtitle>User Details :</CardSubtitle>
                                <CardText>User Id: {userset.userId}</CardText>
                                <CardText>User name : {userset.userName}</CardText>
                            </CardFooter>
                        </Card>


                    )
                })
            } </div >
    )
}

/*
{
    "biddingId": 94,
    "bdescription": "dummy 3",
    "bamount": 24.0,
    "bfromDate": "2021-09-11",
    "btoDate": "2021-09-12",
    "bstatus": "ACCEPTED",
    "workId": 93,
    "wtitle": "work 3",
    "wdescription": "testing",
    "userId": 42,
    "userName": "shubham"
} */