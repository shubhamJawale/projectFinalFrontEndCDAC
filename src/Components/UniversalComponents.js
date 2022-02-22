import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../resources/baseurl';


export default function ShowCReview() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [reviewList, setreviewList] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));

        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        }
        getContractors();

        return () => {



        };
    }, []);

    let getContractors = () => {
        let user1 = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user1);
        let role1 = user1.role;
        if (role1 == "USER") {
            console.log(role1);
            let id = JSON.parse(sessionStorage.getItem("logId"));
            axios.get(`${baseurl}/user/getreviewbyuserid/${id}`).then((response) => {
                setreviewList(response.data);
                toast.success("Contracotr Data Loaded Successfully");


            }, (error) => {
                toast.error("Somthing went Wrong");
            })
        }
        else if (role1 == "LABOUR") {
            console.log(role1);
            let l = JSON.parse(sessionStorage.getItem("logLdata"));
            let id = l.labourId;
            axios.get(`${baseurl}/labour/getallreviewbylabourId/${id}`).then((response) => {
                setreviewList(response.data);
                toast.success("Contracotr Data Loaded Successfully");


            }, (error) => {
                toast.error("Somthing went Wrong");
            })
        }
        else if (role1 === "CONTRACTOR") {
            console.log(role1);
            let l = JSON.parse(sessionStorage.getItem("logCdata"));
            let id = l.contractorId;
            axios.get(`${baseurl}/labour/getallreviewbycontractorid/${id}`).then((response) => {
                setreviewList(response.data);
                toast.success("Contracotr Data Loaded Successfully");


            }, (error) => {
                toast.error("Somthing went Wrong");
            })
        }

    }



    return (
        <div>
            <input type="button" className="btn" value=" go back" onClick={() => { history.push("/user") }} />

            {


                reviewList.map((userset) => {
                    return (
                        <Card key="{userset.reviewId}" color="info" inverse className="m-1 justify-content-center text-center">
                            <CardHeader>
                                <CardTitle tag="h5" >{userset.title}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>Description: {userset.description}</CardText>
                                <CardText>Amount: {userset.rating}</CardText>


                            </CardBody>
                        </Card>


                    )
                })
            } </div >
    )
}