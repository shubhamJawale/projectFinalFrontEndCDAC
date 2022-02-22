import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardDeck, CardFooter, CardHeader, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';

export default function LAssignedWorkListForContractorass() {

    let history = useHistory();

    let [userdata, setuserdata] = useState({});
    let [assignworklist, setassignworklist] = useState([{}]);
    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user.userId);

        setuserdata(user);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "LABOUR") {
            history.replace("/");


        }
        let cont = JSON.parse(sessionStorage.getItem("logLdata"));
        let cid = cont.labourId;
        getAssignedWorks(cid);

        return () => {



        };


    }, []);





    let getAssignedWorks = (id) => {
        axios.get(`${baseurl}/labour/getalldata/AssignedWork/${id}`).then((response) => {
            setassignworklist(response.data);
            //toast.success(" Data Loaded Successfully");
        }, (error) => { //toast.error(`Somthing 1 went Wrong `);
        })
    };
    let [asid, setasid] = useState();
    let [asw, setasw] = useState({});









    return (
        <div>
            <ToastContainer />
            {
                assignworklist.map((workset) => {
                    return (
                        (workset.astatus == "ONGOING")
                            ? <Card key="{workset.assignedWorkId}" color="info" inverse className="m-1 justify-content-center text-center">
                                <CardHeader>
                                    <CardTitle tag="h5" >{workset.title}</CardTitle>

                                </CardHeader>
                                <CardBody>
                                    <CardText>Description :{workset.description}</CardText>
                                    <CardText>From date:{workset.bfromDate}</CardText>
                                    <CardText>To date:{workset.btoDate}</CardText>
                                    <CardText>Pincode :{workset.pinCode}</CardText>
                                    <CardText>Expected Amount :{workset.bamount}</CardText>
                                    <CardText>Work Type :{workset.workType}</CardText>
                                    <CardText>Status :{workset.astatus}</CardText>
                                </CardBody>
                                <CardFooter>
                                    <CardDeck>
                                        <CardTitle>UserDetails</CardTitle>
                                        <CardText>UserId :{workset.uid}</CardText>
                                        <CardText>User name :{workset.userName}</CardText>
                                    </CardDeck>
                                </CardFooter>
                            </Card> : <Card key="{workset.assignedWorkId}" color="success" inverse className="m-1 justify-content-center text-center">
                                <CardHeader>
                                    <CardTitle tag="h5" >{workset.title}</CardTitle>

                                </CardHeader>
                                <CardBody>
                                    <CardText>Description :{workset.description}</CardText>
                                    <CardText>From date:{workset.bfromDate}</CardText>
                                    <CardText>To date:{workset.btoDate}</CardText>
                                    <CardText>Pincode :{workset.pinCode}</CardText>
                                    <CardText>Expected Amount :{workset.bamount}</CardText>
                                    <CardText>Work Type :{workset.workType}</CardText>
                                    <CardText>Status :{workset.astatus}</CardText>
                                </CardBody>
                                <CardFooter>
                                    <CardDeck>
                                        <CardTitle>UserDetails</CardTitle>
                                        <CardText>UserId :{workset.uid}</CardText>
                                        <CardText>User name :{workset.userName}</CardText>
                                    </CardDeck>
                                </CardFooter>
                            </Card>


                    )
                })
            } </div >
    )
}