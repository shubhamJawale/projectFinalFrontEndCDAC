import axios from "axios";
import { useState } from "react"
import { baseurl } from "../../../resources/baseurl";
import {
    BrowserRouter as Router,
    useHistory,
    Route,
    Link
} from "react-router-dom";
import Swal from "sweetalert2";

export function Login() {
    const history = useHistory();
    let [username, setusername] = useState("");
    let [password, setpassword] = useState("");
    let [uid, setuid] = useState();
    let [uname, setuname] = useState();
    let [uemail, setuemail] = useState();
    let [uaddress, setuaddress] = useState();
    let [upincode, setupincode] = useState();
    let [urole, seturole] = useState();
    let [umobile, setumobile] = useState();



    let usernameinput = (e) => setusername(e.target.value);
    let passwordinput = (e) => setpassword(e.target.value);

    //axios
    let RoleWiseLogIn = () => {



        if (urole === 'USER') {
            history.replace("/user");
        }
        else if (urole === 'CONTRACTOR') {
            // history.replace("/contractor");
            window.location = "/contractor";
        }
        else if (urole === 'LABOUR') {

            history.replace("/labour");

        }

        else {
            sessionStorage.clear();
            Swal.fire({ title: "Invalid Credentials", text: " Email id or Passwaord  is invalid", icon: "error" })
            setusername("");
            setpassword("");
        }
    }




    let validate = () => {
        if (username === "" && password === "") { Swal.fire({ text: "Empty fields are not allowed", icon: "error" }) }
        else {
            login();
        }
    }





    let login = () => {

        let user = {
            "emailId": username,
            "password": password
        }


        axios.post(`${baseurl}/login`, user).then((response) => {

            setuid(response.data.userId);
            setuname(response.data.userName);
            setuemail(response.data.emailId);
            setuaddress(response.data.address);
            setupincode(response.data.pincode);
            setumobile(response.data.mobileNo);
            seturole(response.data.role);

            let dummyuser = {
                "userId": uid,
                "userName": uname,
                "emailId": uemail,
                "mobileNo": umobile,
                "pincode": upincode,

                "role": urole,
                "address": uaddress
            }

            sessionStorage.setItem("logId", uid);
            let stringedobj = JSON.stringify(dummyuser);
            sessionStorage.setItem('udata', stringedobj);

            console.log(urole)
            console.log(urole);
            if (urole === "CONTRACTOR") {
                axios.get(`${baseurl}/user/getContractorByUSerId/${uid}`).then((response) => {
                    console.log(response.data);
                    let cdata = JSON.stringify(response.data);
                    sessionStorage.setItem("logCdata", cdata);
                }, (error) => { })
            }

            else if (urole === "LABOUR") {
                axios.get(`${baseurl}/user/getLabourByUSerId/${uid}`).then((response) => {
                    console.log(response.data);
                    let ldata = JSON.stringify(response.data);
                    sessionStorage.setItem("logLdata", ldata);
                }, (error) => { })
            }
            RoleWiseLogIn();
        }, (error) => {
            sessionStorage.clear();
            Swal.fire({ title: "Oops", text: " user might not exists in our system", icon: "error" })
        })


    }



    return (
        <div className="text-center justidy-content-center my-5  bg-dark p-5 container container-fluid"  >
            <div>

                <img src="logo1.jpg" className="iconhead" ></img>
            </div>

            <div className="HeadeLogos mt-3" style={{ color: "white" }}>
                <h1 > LOG IN</h1>
            </div>
            <div className="container col-4 offset-4 justify-content-center justify-content-center my-5">
                <form className="form-control bg-dark">
                    <label htmlFor="userName" className="labels">Email id</label>
                    <input type="text" name="userName" id="userName" className="form-control" onChange={usernameinput} value={username} />
                    <br />
                    <label htmlFor="Password" className="labels">Password</label>
                    <input type="password" name="Password" id="Password" className="form-control" onChange={passwordinput} value={password} />
                    <br />
                    <br />
                    <input type="button" onClick={validate} className="form-control btn btn-outline-light" value="Log In" />
                </form>
            </div>
        </div>)
}
