import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import { baseurl } from '../../resources/baseurl';

export default function Reviwe() {
    let history = useHistory();

    let [userdata, setuserdata] = useState({});
    let [assignworklist, setassignworklist] = useState([{}]);
    useEffect(() => {

        let user = JSON.parse(sessionStorage.getItem("udata"));
        console.log(user.userId);

        setuserdata(user);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "USER") {
            history.replace("/");


        }
        let reviewI = sessionStorage.getItem("reviewItem");
        let rev = JSON.parse(reviewI);

        return () => {



        };


    }, []);








    let [rtitle, setrtitle] = useState();
    let [rdesc, setrdsc] = useState();
    let [rating, setrating] = useState();
    let rtitleinp = (e) => setrtitle(e.target.value);
    let rdescinp = (e) => setrdsc(e.target.value);
    let ratinginp = (e) => setrating(e.target.value);
    let validate = () => {
        let reviewI = sessionStorage.getItem("reviewItem");
        let rev = JSON.parse(reviewI);
        let cid = rev.cid;
        let lid = rev.uid;
        let uid = rev.lid;
        console.log(cid, lid, uid);
        let review = { title: rtitle, description: rdesc, rating: rating }

        if (cid != '0') {
            axios.post(`${baseurl}/user/addreviewforcontractor/${uid}/${cid}`, review).then((response) => {
                history.push("/user");
                sessionStorage.removeItem("reviewItem");
            }, () => { });
        } else {

            axios.post(`${baseurl}/user/addreviewforlabour/${uid}/${lid}`, review).then((response) => {
                history.push("/user");
                sessionStorage.removeItem("reviewItem");
            }, () => { });
        }


    }

    return (<div className="container">
        <form className="form-control bg bg-info m-5">
            <label htmlFor="Title">Title</label>
            <input type="text" name="to_date" id="to_date" className="form-control" onChange={rtitleinp} value={rtitle} />
            <br />
            <label htmlFor="pin_code">Description</label>
            <input type="text" name="pin_code" id="pin_code" className="form-control" onChange={rdescinp} value={rdesc} />
            <br />

            <label htmlFor="Work_TYPE">Select Rating</label>
            <select value={rating} onChange={ratinginp} className="form-control" name="Work_TYPE" id="Work_TYPE">
                <option defaultValue value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>


            </select>
            <br />
            <input type="button" onClick={() => validate()} className="form-control btn btn-warning" value="Add Review" />


        </form>

    </div>)

}

