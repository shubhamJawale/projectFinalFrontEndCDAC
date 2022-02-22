import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';


export default function ShowAvailableWork() {

    let history = useHistory();

    let [userdata, setuserdata] = useState({});
    let [assignworklist, setassignworklist] = useState([{}]);
    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user.userId);

        setuserdata(user);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "CONTRACTOR") {
            history.replace("/");


        }
        let cont = JSON.parse(sessionStorage.getItem("logCdata"));
        let id1 = cont.contractorId;
        getAssignedWorks(id1);

        return () => {



        };


    }, []);





    let getAssignedWorks = (id) => {
        axios.get(`${baseurl}/contractor/getworkbyworktype/${id}`).then((response) => {
            setassignworklist(response.data);
            //toast.success(" Data Loaded Successfully");
        }, (error) => { //toast.error(`Somthing 1 went Wrong `);
        })
    };
    let [asid, setasid] = useState();
    let [asw, setasw] = useState({});


    let addBidding = (e) => {
        console.log(e);
        sessionStorage.setItem('abworkId', e);

        history.replace("/contractor/addBidding");





    }







    return (
        <div>
            <ToastContainer />
            {
                assignworklist.map((workset) => {
                    return (
                        <Card key="{workset. workId}" color="info" inverse className="m-1 justify-content-center text-center">
                            <CardHeader>
                                <CardTitle tag="h5" >{workset.title}</CardTitle>

                            </CardHeader>
                            <CardBody>
                                <CardText>Description :{workset.description}</CardText>
                                <CardText>From date:{workset.fromDate}</CardText>
                                <CardText>To date:{workset.toDate}</CardText>
                                <CardText>Pincode :{workset.pinCode}</CardText>
                                <CardText>Expected Amount :{workset.expectedAmount}</CardText>
                                <CardText>Work Type :{workset.workType}</CardText>
                                <CardText>Status :{workset.status}</CardText>
                                < CardFooter > <input type="button" className="btn btn-outline-warning" value="Add Bidding" id={workset.workId} onClick={() => addBidding(workset.workId)} />
                                </CardFooter>
                            </CardBody>
                        </Card>


                    )
                })
            } </div >
    )
}

/* {
    "title": "work 1",
    "description": "Descripotion 123",
    "fromDate": "2021-09-05",
    "toDate": "2021-09-14",
    "pinCode": "423605",
    "expectedAmount": 99.99,
    "workType": "CWORK",
    "status": "PENDING",
    "workId": 63
} */