import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function WorkList() {
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
        getContractors(user.userId);

        return () => {



        };
    }, []);

    let getContractors = (id) => {
        //console.log(userdata.userId);
        axios.get(`${baseurl}/user/getworkbyuid/${id}`).then((response) => {
            setusercontractorlist(response.data);
            toast.success("Contracotr Data Loaded Successfully");
            console.log(usercontractorlist);

        }, (error) => {
            toast.error("Somthing went Wrong");
        })

        // setusercontractorlist(usercontractorlist.reverse);
    }


    let showBidding = (work1Id) => {
        sessionStorage.setItem("WorkId", work1Id)
        axios.get(`${baseurl}/user/getWorkByWorkId/${work1Id}`).then((response) => {


            let workstore = JSON.stringify(response.data);
            sessionStorage.setItem("Work", workstore);
            history.push("/user/showbidding");


        }, () => { })


    }




    return (
        <div>{
            usercontractorlist.map((userset) => {
                return (
                    (userset.status === "COMPLETED") ? <Card key="{userset.userId}" color="success" inverse className="m-1 justify-content-center text-center">
                        <CardHeader>
                            <CardTitle tag="h5" >{userset.title}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <CardText>Description: {userset.description}</CardText>
                            <CardText>From :{userset.fromDate}</CardText>
                            <CardText>To :{userset.toDate}</CardText>
                            <CardText>Pincode:{userset.pinCode}</CardText>
                            <CardText>Expected Amount: {userset.expectedAmount}</CardText>
                            <CardText>Work Type :{userset.workType}</CardText>
                            <CardText>Status : {userset.status}</CardText>
                            <CardText>WorkId :{userset.workId}</CardText>
                            {(userset.status == 'PENDING') ?
                                < input type="button" onClick={() => showBidding(userset.workId)} value="View Biddings" /> : <h1></h1>
                            }
                        </CardBody>
                    </Card> : <Card key="{userset.userId}" color="info" inverse className="m-1 justify-content-center text-center">
                        <CardHeader>
                            <CardTitle tag="h5" >{userset.title}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <CardText>Description: {userset.description}</CardText>
                            <CardText>From :{userset.fromDate}</CardText>
                            <CardText>To :{userset.toDate}</CardText>
                            <CardText>Pincode:{userset.pinCode}</CardText>
                            <CardText>Expected Amount: {userset.expectedAmount}</CardText>
                            <CardText>Work Type :{userset.workType}</CardText>
                            <CardText>Status : {userset.status}</CardText>
                            <CardText>WorkId :{userset.workId}</CardText>
                            {(userset.status == 'PENDING') ?
                                < input type="button" onClick={() => showBidding(userset.workId)} value="View Biddings" className="btn btn-warning" /> : <h1></h1>
                            }
                        </CardBody>
                    </Card>


                )
            })
        } </div >
    )
}

/*   {
        "title": "work 1",
        "description": "sadsadfdsfdsfsafsdfdsfsa",
        "fromDate": "2021-09-04",
        "toDate": "2021-09-25",
        "pinCode": "423605",
        "expectedAmount": 24.0,
        "workType": "CWORK",
        "status": "PENDING",
        "workId": 52
    } */