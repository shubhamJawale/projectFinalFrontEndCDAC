import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function ShowContractorsprof() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [entity, setentity] = useState({});
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "LABOUR") {
            history.replace("/");
            setuserdata(user);
        }

        let l = JSON.parse(sessionStorage.getItem("logLdata"));
        let cid = l.contractorId;
        getContractors(cid);

        return () => {



        };
    }, []);

    let getContractors = (id) => {
        //console.log(userdata.userId);
        axios.get(`${baseurl}/contractor/getdataBycontractorId/${id}`).then((response) => {
            setentity(response.data);
            toast.success("Contracotr Data Loaded Successfully");
            //console.log(usercontractorlist);

        }, (error) => {
            toast.error("Somthing went Wrong");
        })
    }



    return (
        <div>


            <Card color="info" inverse className="m-1 justify-content-center text-center">
                <CardHeader>
                    <CardTitle tag="h5" >{entity.userName}</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText>{entity.emailId}</CardText>
                    <CardText>{entity.mobileNo}</CardText>
                    <CardText>{entity.address}</CardText>
                    <CardText>{entity.pincode}</CardText>
                </CardBody>
            </Card>




        </div >
    )
}
