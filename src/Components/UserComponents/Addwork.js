import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import { baseurl } from '../../resources/baseurl'

export default function Addwork() {
    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [uid, setuid] = useState();
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "USER") {
            history.replace("/");
        } setuserdata(user);
        return () => {


        };
    }, []);



    let [title, settitle] = useState("");
    let [dsc, setdsc] = useState("");
    let [fdate, setfdate] = useState("");
    let [tdate, settdate] = useState("");
    let [pincode, setpincode] = useState("");
    let [exptAmount, setexptAmount] = useState("");
    let [worktype, setworktype] = useState("");
    let titleinp = (e) => settitle(e.target.value);
    let dscinp = (e) => setdsc(e.target.value);
    let fdateinp = (e) => setfdate(e.target.value);
    let tdateinp = (e) => settdate(e.target.value);
    let pincodeinp = (e) => setpincode(e.target.value);
    let exptAmountinp = (e) => setexptAmount(e.target.value);
    let worktypeinp = (e) => setworktype(e.target.value);

    let addwork = () => {
        let work = {
            title: title,
            description: dsc,
            fromDate: fdate,
            toDate: tdate,
            pinCode: pincode,
            expectedAmount: exptAmount,
            workType: worktype
        }
        axios.post(`${baseurl}/user/addworkbyuser/${userdata.userId}`, work).then((response) => {
            Swal.fire({ title: "Work Added", text: " SuccessFully", icon: "success" });
            settitle("");
            setdsc("");
            setfdate("");
            setexptAmount("");
            setpincode("");
            settdate("");
            setworktype("");
        }, (error) => {
            Swal.fire({ title: "Error Occured", text: " Something Went Wrong", icon: "error" });
        })
    }
    let amtregex = /(?=.*\d)^\$?(([1-9]\d{0,6}(,\d{3,})*)|0)?(\.\d{1,2})?$/;


    let datevalidator = Date.now();

    let validate = () => {
        let d = new Date();
        let d1 = new Date(tdate);

        if (title === "" || dsc === "" || tdate === "" || pincode === "" || fdate === "" || worktype === "" || exptAmount === "") {
            Swal.fire({ title: "Error", text: "Please fill up details", icon: "error" });
        } else if (!amtregex.test(exptAmount)) {
            Swal.fire({ title: "Invalid Amount", text: "Amount should Be Enterd In Decimal Format", icon: "error" });
            setexptAmount("");
        }
        else if (tdate < fdate) {
            Swal.fire({ title: "Invalid Dates", text: "ToDate should be lesser than from date", icon: "error" });
        }
        else if (d1 < d) {
            Swal.fire({ title: "Invalid Dates", text: "ToDate should be lesser than from date", icon: "error" });
        }
        else { addwork(); }

    }


    return (
        <div className=" col-8 offset-3 justify-content-center  my-5">
            <form className="form-control bg bg-info"> <label htmlFor="title"> Title</label>
                <input type="text" name="title" id="title" className="form-control" onChange={titleinp} value={title} />
                <br />
                <label htmlFor="description">Description</label>
                < textarea name="description" id="description" className="form-control" onChange={dscinp} value={dsc} />
                <br />
                <label htmlFor="expected_amount">Expected Amount</label>
                <input type="text" name="expected_amount" id="expected_amount" className="form-control" onChange={exptAmountinp} value={exptAmount} />
                <br />
                <label htmlFor="from_date">From :</label>
                <input type="date" name="from_date" id="from_date" className="form-control" onChange={fdateinp} value={fdate} min={datevalidator} />
                <br />
                <label htmlFor="to_date">To :</label>
                <input type="date" name="to_date" id="to_date" className="form-control" onChange={tdateinp} value={tdate} />
                <br />
                <label htmlFor="pin_code">Pincode</label>
                <input type="text" name="pin_code" id="pin_code" className="form-control" onChange={pincodeinp} value={pincode} />
                <br />

                <label htmlFor="Work_TYPE">Select WorkType</label>
                <select value={worktype} onChange={worktypeinp} className="form-control" name="Work_TYPE" id="Work_TYPE">
                    <option defaultValue value="">Select WorkType</option>
                    <option value="CWORK">WORK FOR CONTRACTOR</option>
                    <option value="LWORK">WORK FOR LABOUR</option>

                </select>
                <br />
                <input type="button" onClick={validate} className="form-control btn btn-warning" value="Add Work" />
            </form>
        </div>)
}
