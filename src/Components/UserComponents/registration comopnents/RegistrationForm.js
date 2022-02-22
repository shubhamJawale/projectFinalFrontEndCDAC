import { useState } from "react";
import axios from "axios";
import { baseurl } from "../../../resources/baseurl";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";

function Register() {
    let history = useHistory();
    let [username, setusername] = useState();
    let [emailid, setemailid] = useState();
    let [mobileno, setmobileno] = useState();
    let [address, setaddress] = useState();
    let [pincode, setpincodes] = useState();
    let [password, setpassword] = useState();
    let [cpassword, setcpassword] = useState();
    let [role, setrole] = useState();

    let usernameinput = (e) => setusername(e.target.value);
    let emailidinput = (e) => setemailid(e.target.value);
    let mobilenoinput = (e) => setmobileno(e.target.value);
    let addressinput = (e) => setaddress(e.target.value);
    let pincodeinput = (e) => setpincodes(e.target.value);
    let passwordinput = (e) => setpassword(e.target.value);
    let cpasswordinput = (e) => setcpassword(e.target.value);
    let roleinput = (e) => {

        setrole(e.target.value);

    };

    const nameRgx = /^[a-zA-Z\s]+$/;
    const emailRgx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobilenoRgx = /^[789][0-9]{9}$/;
    const passwordRgx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const pincodeRgx = /^[0-9\s]{6}$/;
    //axios
    let register = () => {

        let user = {

            userName: username,
            emailId: emailid,
            mobileNo: mobileno,
            address: address,
            pincode: pincode,
            password: password,
            role: role
        }

        axios.post(`${baseurl}/register`, user).then(

            (response) => {

                Swal.fire({ title: "User Registered", text: `Registered as : ${role}`, icon: "success" });

                console.log(response.status);
                setusername("");
                setaddress("");
                setemailid("");
                setmobileno("");
                setpassword("");
                setcpassword("")
                setpincodes("");
                setrole("");
                history.push("/")

            },
            (error) => {

                Swal.fire({ title: "Error Occured", text: "Mobile NO or Email Is Already Existed In our System, ", icon: "error" });


            }
        )


    }

    let validate = () => {

        if (username === "" || emailid === "" || mobileno === "" || pincode === "" || address === "" || password === "" || role === "") {
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
        else if (!passwordRgx.test(password)) {
            Swal.fire({ title: "Invalid Password ", text: "Password should contain minimum 8 characcters, it must include 1 special character, 1 digit and One capital letter", icon: "error" });
            setpassword("");
            setcpassword("");
        } else if (!password.match(cpassword)) {
            Swal.fire({ title: "Password doesn't Match", text: "", icon: "error" });
            setcpassword("");
        } else {
            register();


        }
    }






    return (
        <div className="text-center justidy-content-center bg-dark " >
            <div>

                <img src="logo1.jpg" className="iconhead"></img>
            </div>
            <div className="HeadeLogos" style={{ color: "white", padding: "5px" }}>
                <h1 > Register</h1>
            </div>
            <div className="col-4 offset-4 justify-content-center my-2">

                <form className="form-control bg-dark">
                    <lable htmlFor="UserName" className="labels"> Enter Name</lable>
                    <input className="form-control" type="text" name="UserName" id="UserName" onChange={usernameinput} value={username}></input>
                    <lable htmlFor="EmailId" className="labels"> Enter EmailId</lable>
                    <input className="form-control" type="email" name="EmailId" id="EmailId" onChange={emailidinput} value={emailid}></input>
                    <lable htmlFor="MobileNo" className="labels"> Enter Mobile No</lable>
                    <input className="form-control" type="tel" name="MobileNo" id="MobileNo" onChange={mobilenoinput} value={mobileno}></input>
                    <lable htmlFor="Adress" className="labels"> Enter Address</lable>
                    <textarea className="form-control" name="Address" id="Address" onChange={addressinput} value={address}></textarea>
                    <lable htmlFor="PinCode" className="labels"> Enter Pincode</lable>
                    <input className="form-control" type="text" name="PinCode" id="PinCode" onChange={pincodeinput} value={pincode}></input>
                    <lable htmlFor="Password" className="labels"> Enter Password</lable>
                    <input type="password" className="form-control" name="Password" id="Password" onChange={passwordinput} value={password}></input>
                    <lable htmlFor="CPassword" className="labels"> Confirm Password</lable>
                    <input type="password" className="form-control" name="CPassword" id="CPassword" onChange={cpasswordinput} value={cpassword}></input>
                    <label htmlFor="Role" className="labels">Select Role</label>
                    <select value={role} onChange={roleinput} className="form-control" name="Role" id="Role">
                        <option selected value="">Select Role</option>
                        <option value="USER">USER</option>
                        <option value="CONTRACTOR">CONTRACTOR</option>
                        <option value="LABOUR">LABOUR</option>
                    </select>
                    <br />
                    <input type="button" className="form-control btn btn-outline-light" onClick={validate} value="Register" />
                </form>

            </div >
            <div className="row"></div>
        </div>
    );
}
export default Register;

