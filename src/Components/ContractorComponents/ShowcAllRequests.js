import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';

export default function ShowRequestList() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.userId);

        if (user === null) {
            history.replace("/");
        } else if (user.role != "CONTRACTOR") {
            history.replace("/");
            setuserdata(user);

        }
        let cont = JSON.parse(sessionStorage.getItem("logCdata"));
        let cid = cont.contractorId;
        getAllLabours(cid);
        console.log(cid);
        return () => {



        };


    }, []);


    ///getlabourbypincode/{userId}

    let getAllLabours = (id) => {
        axios.get(`${baseurl}/contractor/getAllRequests/${id}`).then((response) => {
            console.log(id);
            setusercontractorlist(response.data);
            toast.success("Labour Data Loaded Successfully");
        }, (error) => { toast.error(`Somthing went Wrong  ${id}`); })
    }


    let updatelabour = (e) => {
        console.log(e);
        Swal.fire({
            title: 'Are you sure? ',
            text: "Do you Really Want to Add Labour to your team",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add Labour to my team!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${baseurl}/contractor/acceptrequest/${e}`).then((response) => { }, (error) => { console.log(error) })
                Swal.fire(

                    'Request Accepted!',
                    'Labour has been Added to your team.',
                    'success'
                )


                history.replace("/contractor")
            }
        })

    }
    let Delete = (e) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete Request!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${baseurl}/contractor/DeleteRequest/${e}`).then((response) => { }, (error) => { console.log(error); })
                Swal.fire(

                    'Deleted!',
                    'Request has been deleted ',
                    'success'
                )


                history.replace("/contractor")
            }
        })










    }




    return (
        <div>
            <ToastContainer />
            {
                usercontractorlist.map((userset) => {
                    return (
                        <Card key="{userset.labourId}" color="info" inverse className="m-1 justify-content-center text-center">
                            <CardHeader>
                                <CardTitle tag="h5" >{userset.userName}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardSubtitle>Labour Id :{userset.labourId}</CardSubtitle>
                                <CardText>Email Id :{userset.emailId}</CardText>
                                <CardText>mobile No :{userset.mobileNo}</CardText>
                                <CardText>Address :{userset.address}</CardText>
                                <CardText>Pincode :{userset.pincode}</CardText>
                                <CardText>Note :{userset.note}</CardText>

                            </CardBody>
                            <CardFooter>
                                <input type="button" onClick={() => updatelabour(userset.requestid)} value="Accept Request" className="btn btn-success mx-3" /><input type="button" onClick={() => Delete(userset.requestid)} value="Delete Request" className="btn btn-danger mx-3" />
                            </CardFooter>
                        </Card>


                    )
                })
            } </div >
    )
}/*
{ 
    "requestid": 1,
    "userId": 97,
    "userName": "Om",
    "emailId": "Om@123.com",
    "mobileNo": "8830254321",
    "pincode": "423605",
    "contractorId": 82,
    "labourId": 98,
    "address": "Latur",
    "note": "I Want To JOIN YOUR TEAM ",
    "expiryDate": "2021-09-26",
    "liceneNo": "SHUBHAM!@#$^"
} */