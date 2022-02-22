import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function ShowContractorsbypinl() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "LABOUR") {
            history.replace("/");
            setuserdata(user);
        }
        getContractors(user.userId);

        return () => {



        };
    }, []);

    let getContractors = (id) => {
        //console.log(userdata.userId);
        axios.get(`${baseurl}/labour/contractorlistByPincode/${id}`).then((response) => {
            console.log(response.data);
            setusercontractorlist(response.data);
            toast.success("Contracotr Data Loaded Successfully");
            console.log(usercontractorlist);

        }, (error) => {
            toast.error("Somthing went Wrong");
        })
    }




    let sendRequest = (e) => {
        console.log("e=>" + e);
        sessionStorage.setItem("TempContId", e);
        history.push("/labour/requestForm");




    }






    return (
        <div>{
            usercontractorlist.map((userset) => {
                return (
                    <Card key="{userset.userId}" color="info" inverse className="m-1 justify-content-center text-center">
                        <CardHeader>
                            <CardTitle tag="h5" >{userset.userName}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <CardText>{userset.emailId}</CardText>
                            <CardText>{userset.mobileNo}</CardText>
                            <CardText>{userset.address}</CardText>
                            <CardText>{userset.pincode}</CardText>
                            <CardText>{userset.contractorId}</CardText>
                            <CardText>{userset.liceneNo}</CardText>
                            <CardText>{userset.expiryDate}</CardText>
                        </CardBody>
                        <CardFooter>
                            <input type="button" onClick={() => sendRequest(userset.contractorId)} value="Send Request" className="btn btn-warning" />
                        </CardFooter>
                    </Card>


                )
            })
        } </div >
    )
}

/* {
        "userId": 0,
        "userName": "Ganesh",
        "emailId": "s@j.com",
        "mobileNo": "9876543210",
        "pincode": "423605",
        "password": null,
        "labourId": 0,
        "contractorId": 1,
        "address": "ssddsfdsfg",
        "liceneNo": null,
        "expiryDate": null
    }, */