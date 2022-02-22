import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';

export default function ShowLaboursListForContractor() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user.userId);

        if (user === null) {
            history.replace("/");
        } else if (user.role != "CONTRACTOR") {
            history.replace("/");
            setuserdata(user);

        }
        let cont = JSON.parse(sessionStorage.getItem("logCdata"));
        let cid = cont.contractorId;
        getAllLabours(cid);

        return () => {



        };


    }, []);


    ///getlabourbypincode/{userId}

    let getAllLabours = (id) => {
        axios.get(`${baseurl}/contractor/getAllLaboursForContractor/${id}`).then((response) => {
            setusercontractorlist(response.data);
            toast.success("Labour Data Loaded Successfully");
        }, (error) => { toast.error(`Somthing went Wrong  ${id}`); })
    }


    let updatelabour = (e) => {

        sessionStorage.setItem("tempuid", e);
        history.replace("/contractor/updateLabour");

    }
    let Delete = (e) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete Labour from team!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${baseurl}/contractor/deletelabourfromteam/${e}`).then((response) => { }, (error) => { })
                Swal.fire(

                    'Deleted!',
                    'Labour has been deleted from team.',
                    'success'
                )


                history.replace("/contractor")
            }
        })










    }




    return (
        <div>

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
                            </CardBody>
                            <CardFooter>
                                <input type="button" onClick={() => updatelabour(userset.userId)} value="Update Labour" className="btn btn-warning mx-3" /><input type="button" onClick={() => Delete(userset.labourId)} value="Delete From Team" className="btn btn-danger mx-3" />
                            </CardFooter>
                        </Card>


                    )
                })
            } </div >
    )
}
