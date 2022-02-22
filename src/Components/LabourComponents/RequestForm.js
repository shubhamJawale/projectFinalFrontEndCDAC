/** let updatelabour = (e) => {
            console.log(e);
            let l = JSON.parse(sessionStorage.getItem("logLdata"));
            let lid = l.labourId;
            Swal.fire({
                title: 'Are you sure? ',
                text: "Do you Really Want to Send A request to Contractor",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, send Request!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`${baseurl}labour/sendRequest/${lid}/${e}`, request).then((response) => { }, (error) => { console.log(error) })
                    Swal.fire(

                        'Request Accepted!',
                        'Labour has been Added to your team.',
                        'success'
                    )


                    history.replace("/labour")
                }
            })

        } */


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Icons, toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';


export default function RequestForm() {
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



        return () => {



        };


    }, []);








    let [rnote, setrnote] = useState();
    let rnoteinp = (e) => { setrnote(e.target.value); }


    let validate = () => {

        if (rnote === "") {
            Swal.fire({ title: "FILL THE NOTE", icon: "warning" })
        } else {

            let request = { note: rnote }
            sendRequest(request);
        }




    }





    let sendRequest = (r) => {
        let e = JSON.parse(sessionStorage.getItem("TempContId"));
        let l = JSON.parse(sessionStorage.getItem("logLdata"));
        let lid = l.labourId;
        Swal.fire({
            title: 'Are you sure? ',
            text: "Do you Really Want to Send A request to Contractor",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send Request!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`${baseurl}/labour/sendRequest/${lid}/${e}`, r).then((response) => {
                    console.log(lid);
                    sessionStorage.removeItem("TempContId");


                }, (error) => { console.log(error) })
                Swal.fire(

                    'Request send successfully!',

                    'success'
                )


                history.replace("/labour")
            }
        })

    }

    return (<div className="container my-5">
        <form className="form-control bg bg-info">
            <label htmlFor="Title">ADD A NOTE</label>
            <input type="text" name="to_date" id="to_date" className="form-control" onChange={rnoteinp} value={rnote} />
            <br />

            <input type="button" onClick={() => validate()} className="form-control btn btn-warning" value="send Request" />
        </form>



    </div>)

}

