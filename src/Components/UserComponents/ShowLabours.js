import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function ShowLabours() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user.userId);

        if (user === null) {
            history.replace("/");
        } else if (user.role != "USER") {
            history.replace("/");
            setuserdata(user);

        }

        getAllLabours(user.userId);

        return () => {



        };


    }, []);


    ///getlabourbypincode/{userId}

    let getAllLabours = (id) => {
        axios.get(`${baseurl}/user/getlabourbypincode/${id}`).then((response) => {
            setusercontractorlist(response.data);
            toast.success("Labour Data Loaded Successfully");
        }, (error) => { toast.error(`Somthing went Wrong  ${id}`); })
    }








    return (
        <div>
            <ToastContainer />
            {
                usercontractorlist.map((userset) => {
                    return (
                        <Card key="{userset.userId}" color="info" inverse className="m-1 justify-content-center text-center">
                            <CardHeader>
                                <CardTitle tag="h5" >{userset.userName}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>Email Id :{userset.emailId}</CardText>
                                <CardText>mobile No :{userset.mobileNo}</CardText>
                                <CardText>Address :{userset.address}</CardText>
                            </CardBody>
                        </Card>


                    )
                })
            } </div >
    )
}
