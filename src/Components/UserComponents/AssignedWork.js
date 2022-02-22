import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';

export default function AssignedWork() {

    let history = useHistory();

    let [userdata, setuserdata] = useState({});
    let [assignworklist, setassignworklist] = useState([{}]);
    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user.userId);

        setuserdata(user);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "USER") {
            history.replace("/");


        }

        getAssignedWorks(user.userId);

        return () => {



        };


    }, []);





    let getAssignedWorks = (id) => {
        axios.get(`${baseurl}/user/getalldata/AssignedWork/${id}`).then((response) => {
            setassignworklist(response.data);
            //toast.success(" Data Loaded Successfully");
        }, (error) => { //toast.error(`Somthing 1 went Wrong `);
        })
    };
    let [asid, setasid] = useState();
    let [asw, setasw] = useState({});

    let updateStauts = (e, cid, uid, lid) => {
        let reviewItem = {


            cid: cid, uid: uid, lid: lid

        }

        sessionStorage.setItem("reviewItem", JSON.stringify(reviewItem));


        // console.log(e, cid, lid, uid);
        //setasid(e);
        axios.get(`${baseurl}/user/updateAssigenedWorkByawId/${e}`).then((response) => {
            setasw(response.data);

            history.push("/user/addReview")





        }, (error) => { //toast.error("Something Very Bad Happend") 
            Swal.fire({ title: "error occured", icon: "error" })
        })


    }







    return (
        <div>
            <ToastContainer />
            {
                assignworklist.map((workset) => {
                    return (
                        (workset.astatus === "COMPLETED")
                            ? <Card key="{workset.assignedWorkId}" color="success" inverse className="m-1 justify-content-center text-center">
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
                                    {(workset.astatus === "ONGOING") ? < CardFooter > <input type="button" className="btn btn-outline-warning" value="Marked It As Complete" id={workset.assignedWorkId} onClick={() => updateStauts(workset.assignedWorkId, workset.contractorId, workset.labourId, workset.uid)} /></CardFooter> : <h5>Completed</h5>}
                                </CardBody>
                            </Card> : <Card key="{workset.assignedWorkId}" color="info" inverse className="m-1 justify-content-center text-center">
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
                                    {(workset.astatus === "ONGOING") ? < CardFooter > <input type="button" className="btn btn-outline-warning" value="Marked It As Complete" id={workset.assignedWorkId} onClick={() => updateStauts(workset.assignedWorkId, workset.contractorId, workset.labourId, workset.uid)} /></CardFooter> : <h5>Completed</h5>}
                                </CardBody>
                            </Card>


                    )
                })
            } </div >
    )
}

/*

 */


/* WorkId


fromDate
toDate

expectedAmount

Wstatus;

biddingId

bdescription



contractorId
labourId */