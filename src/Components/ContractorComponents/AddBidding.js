import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { baseurl } from '../../resources/baseurl'

export default function AddBidding() {
    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [uid, setuid] = useState();
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "CONTRACTOR") {
            history.replace("/");
        } setuserdata(user);
        return () => {


        };
    }, []);




    let [dsc, setdsc] = useState("");
    let [fdate, setfdate] = useState("");
    let [tdate, settdate] = useState("");

    let [Amount, setAmount] = useState("");


    let dscinp = (e) => setdsc(e.target.value);
    let fdateinp = (e) => setfdate(e.target.value);
    let tdateinp = (e) => settdate(e.target.value);

    let Amountinp = (e) => setAmount(e.target.value);


    let addwork = () => {
        let workId = JSON.parse(sessionStorage.getItem("abworkId"));
        let contdata = JSON.parse(sessionStorage.getItem("logCdata"));
        let contId = contdata.contractorId;


        let bidding = {

            description: dsc,
            fromDate: fdate,
            toDate: tdate,

            amount: Amount,

        }
        axios.post(`${baseurl}/contractor/addbiddingbycontractor/${contId}/${workId}`, bidding).then((response) => {
            Swal.fire({ title: "Bidding Added succefully", text: " SuccessFully", icon: "success" });

            setdsc("");
            setfdate("");
            setAmount("");
            settdate("");
            history.push("/contractor/showBidding")



        }, (error) => {
            Swal.fire({ title: "Error Occured", text: " Something Went Wrong", icon: "error" });
        })
    }
    let amtregex = /(?=.*\d)^\$?(([1-9]\d{0,6}(,\d{0,6})*)|0)?(\.\d{1,2})?$/;


    let datevalidator = Date.now();

    let validate = () => {
        let d = new Date();
        let d1 = new Date(tdate);

        if (dsc === "" || tdate === "" || fdate === "" || Amount === "") {
            Swal.fire({ title: "Error", text: "Please fill up details", icon: "error" });
        } else if (!amtregex.test(Amount)) {
            Swal.fire({ title: "Invalid Amount", text: "Amount should Be Enterd In Decimal Format", icon: "error" });
            setAmount("");
        }
        else if (tdate < fdate) {
            Swal.fire({ title: "Invalid Dates", text: "ToDate should be lesser than from date", icon: "error" });
        }
        else if (d1 < d) {
            Swal.fire({ title: "Enter Valid Date", icon: "error" })
        }
        else { addwork(); }

    }


    return (
        <div className="bg-info container m-5 p-5">
            <form className="form-control bg-info ">
                <div className="container col-6 offset-3 justify-content-center my-5">
                    <h3 className="labels" >Add Bidding</h3>
                    <br />

                    <label htmlFor="description">Description</label>
                    < textarea name="description" id="description" className="form-control " onChange={dscinp} value={dsc} />
                    <br />
                    <label htmlFor="expected_amount">Bidding Amount</label>
                    <input type="text" name="expected_amount" id="expected_amount" className="form-control" onChange={Amountinp} value={Amount} />
                    <br />
                    <label htmlFor="from_date">From: </label>
                    <input type="date" name="from_date" id="from_date" className="form-control " onChange={fdateinp} value={fdate} min={datevalidator} />
                    <br />
                    <label htmlFor="to_date">To: </label>
                    <input type="date" name="to_date" id="to_date" className="form-control" onChange={tdateinp} value={tdate} />
                    <br />



                    <br />
                    <input type="button" onClick={validate} className="form-control btn btn-outline-light" value="Add Bidding" />
                </div>
            </form >
        </div >)
}
