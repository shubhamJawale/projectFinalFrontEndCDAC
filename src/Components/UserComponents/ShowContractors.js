import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function ShowContractors() {

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
        axios.get(`${baseurl}/user/getcontractorsbypincode/${id}`).then((response) => {
            setusercontractorlist(response.data);
            toast.success("Contracotr Data Loaded Successfully");
            console.log(usercontractorlist);

        }, (error) => {
            toast.error("Somthing went Wrong");
        })
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
                        </CardBody>
                    </Card>


                )
            })
        } </div >
    )
}
