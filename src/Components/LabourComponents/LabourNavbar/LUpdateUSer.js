import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../../resources/baseurl';








export default function LUpdateLabour() {

    let history = useHistory();
    let [userdata, setuserdata] = useState({});
    let [usercontractorlist, setusercontractorlist] = useState([{}]);
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem("udata"));
        //console.log(user.role);
        setrole(user.role);
        if (user === null) {
            history.replace("/");
        } else if (user.role != "LABOUR") {
            history.replace("/");
            setuserdata(user);
        }
        getuser();

        return () => {



        };
    }, []);



    let [username, setusername] = useState();
    let [emailid, setemailid] = useState();
    let [mobileno, setmobileno] = useState();
    let [address, setaddress] = useState();
    let [pincode, setpincodes] = useState();
    let [password, setpassword] = useState();
    let [cpassword, setcpassword] = useState();
    let [role, setrole] = useState();
    let getuser = () => {

        let userId = JSON.parse(sessionStorage.getItem("logId"));

        axios.get(`${baseurl}/user/getUserbyUid/${userId}`).then((response) => {
            console.log(response.data);
            setusername(response.data.userName);
            setemailid(response.data.emailId);
            setaddress(response.data.address);
            setmobileno(response.data.mobileNo);
            setpincodes(response.data.pincode);
            setpassword(response.data.password);



        }, () => { })
    }





    let usernameinput = (e) => setusername(e.target.value);
    let emailidinput = (e) => setemailid(e.target.value);
    let mobilenoinput = (e) => setmobileno(e.target.value);
    let addressinput = (e) => setaddress(e.target.value);
    let pincodeinput = (e) => setpincodes(e.target.value);
    let passwordinput = (e) => setpassword(e.target.value);
    let cpasswordinput = (e) => setcpassword(e.target.value);
    /*  let roleinput = (e) => {
 
         setrole(e.target.value);
 
     }; */

    const nameRgx = /^[a-zA-Z\s]+$/;
    const emailRgx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobilenoRgx = /^[789][0-9]{9}$/;
    const passwordRgx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const pincodeRgx = /^[0-9\s]{6}$/;
    //axios
    let register = () => {
        let userId = JSON.parse(sessionStorage.getItem("logId"));
        console.log(userId);
        let user = {
            userId: userId,
            userName: username,
            emailId: emailid,
            mobileNo: mobileno,
            address: address,
            pincode: pincode,
            password: password,
            role: role
        }
        console.log(user);
        axios.post(`${baseurl}/update`, user).then(

            (response) => {

                Swal.fire({ title: "Labour Upadeted", icon: "success" });

                console.log(response.status);
                sessionStorage.removeItem("tempuid");
                history.push("/contractor");
            },
            (error) => {

                Swal.fire({ title: "Error Occured", text: "Please Try Again", icon: "error" });


            }
        )


    }

    let validate = () => {

        if (username === "" || emailid === "" || mobileno === "" || pincode === "" || address === "" /* || password === "" */ /* || role === "" */) {
            Swal.fire({ title: "Error", text: "Please fill up details", icon: "error" });
        } else if (!nameRgx.test(username)) {
            Swal.fire({ title: "Invalid name", text: "Name should contain 1st letter capital, it must include 2 letters and it should not exclude 40 letters", icon: "error" });
            setusername("");
        } else if (!emailRgx.test(emailid)) {
            Swal.fire({ title: "Invalid Email Id", text: "Please Enter valid email", icon: "error" });
            setemailid("");
        } else if (!mobilenoRgx.test(mobileno)) {
            Swal.fire({ title: "Invalid MObileNO", text: "Please Enter valid mobileno", icon: "error" });
            setmobileno("");
        } else if (!pincodeRgx.test(pincode)) {
            Swal.fire({ title: "Invalid Pincode", text: "Pincode should contain only digits and length must be 6", icon: "error" });
            setpincodes("");
        }
        else {
            register();


        }
    }






    return (
        <div>
            <div className="col-12 offset-1 justify-content-center my-5">

                <form className="form-control bg bg-info">
                    <lable htmlFor="UserName"> Enter Name</lable>
                    <input className="form-control" type="text" name="UserName" id="UserName" onChange={usernameinput} value={username}></input>
                    <lable htmlFor="EmailId"> Enter EmailId</lable>
                    <input className="form-control" type="email" name="EmailId" id="EmailId" onChange={emailidinput} value={emailid}></input>
                    <lable htmlFor="MobileNo"> Enter Mobile No</lable>
                    <input className="form-control" type="tel" name="MobileNo" id="MobileNo" onChange={mobilenoinput} value={mobileno}></input>
                    <lable htmlFor="Adress"> Enter Address</lable>
                    <textarea className="form-control" name="Address" id="Address" onChange={addressinput} value={address}></textarea>
                    <lable htmlFor="PinCode"> Enter Pincode</lable>
                    <input className="form-control" type="text" name="PinCode" id="PinCode" onChange={pincodeinput} value={pincode}></input>

                    <input type="button" className="form-control btn btn-warning my-4" onClick={validate} value="Update" />
                </form>
            </div >
        </div>
    );
}
