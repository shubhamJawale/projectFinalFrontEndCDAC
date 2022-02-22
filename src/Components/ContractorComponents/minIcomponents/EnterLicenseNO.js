import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../../resources/baseurl';


export default function LicensnoForm() {
    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "CONTRACTOR") {
            history.replace("/");
            setuserdata(user);
        }

        return () => {



        };
    }, []);

    let [licno, setlicno] = useState("");
    let [expdate, setecpdate] = useState("");
    let licnoinp = (e) => setlicno(e.target.value);
    let wxpdateinp = (e) => setecpdate(e.target.value);


    let validate = () => {
        let d = new Date();
        console.log(d);
        let d1 = new Date(expdate);
        console.log(d1 > d)


        if (licno === "" || expdate === "") { Swal.fire({ text: "Empty fields are not allowed", icon: "error" }) }
        else if (d1 < d) {
            Swal.fire({ title: `Enter Valid Date`, icon: "error" })
        }
        else {
            submitlcno();
        }
    }
    let datevalidator = Date.now();
    let submitlcno = () => {
        let contr = JSON.parse(sessionStorage.getItem("logCdata"));
        let users = JSON.parse(sessionStorage.getItem("udata"));
        let contractor = {
            "contractorId": contr.contractorId,
            "licenceNo": licno,
            "expiryDate": expdate
        }

        axios.post(`${baseurl}/contractor/updatecontractorProfessionalDetails/${users.userId}`, contractor).then((response) => {
            Swal.fire({
                title: " Professional Details Updated", icon: "success"
            })

            let cdata = JSON.stringify(contractor)
            sessionStorage.setItem('logCdata', cdata);
            history.push("/contractor");
        }, () => {

        })


    }


    return (
        <div className="bg bg-dark container">
            <div>




            </div>
            <div className="text-center my-5">
                <h1 className="labels pt-5"> Contractor Professional Information</h1>
            </div>
            <div className="col-4 offset-4 py-5">
                <form className="form-control bg-dark">
                    <label htmlFor="lno">License No/ Regisration No/ Gst no</label>
                    <input type="text" name="lno" id="lno" className="form-control" onChange={licnoinp} value={licno} />
                    <br />
                    <label htmlFor="cdate">License No/ Regisration No/ Gst no</label>
                    <input type="date" name="cdate" id="cdate" className="form-control" onChange={wxpdateinp} value={expdate} min={datevalidator} />
                    <br />
                    <br />
                    <input type="button" className="form-control btn btn-outline-light" onClick={validate} value="Register" />

                </form>
            </div>
        </div>

    )
}
