import { useEffect, React, useState } from 'react';
import {
    BrowserRouter as Router,
    useHistory,
    Route,
    Link
} from "react-router-dom";
import { Login } from './UserComponents/login components/loginForm';
import { Button } from 'reactstrap'
import './LogoHead.css';
import Register from './UserComponents/registration comopnents/RegistrationForm';
export const Home = () => {
    const history = useHistory();




    const gotoLogin = () => { history.push("/login"); }
    const gotoregister = () => { history.push("/register"); }

    return (



        <div>




            <div className="MainBody">
                <div className="container" >

                    <div className="row">
                        <Logo />
                    </div>
                    <div className="row">

                        <Homebody logfunc={gotoLogin} regfunc={gotoregister} />

                    </div>
                </div>
            </div>

            <div>
                <HomeFooter />
            </div>
        </div>
    )
}



export function Logo() {
    let headStyle = { background: "teal", color: "whitesmoke", boxShadow: "6px 20px 3px grey" }
    return (
        <div className="logohead my-2" >
            <p style={{ fontSize: "70px" }}><strong>Link To Labour</strong></p>
        </div >
    )
}



export function Homebody({ logfunc, regfunc }) {
    let customStyle = {

        display: "inline-flex",
        background: 'transparent',
    }

    // let btnclick = () => { window.location = "/login" }

    return (
        <div className="row  m-5 p-3">
            <div className="row col-5 m-3 p-3">
                <h1 className="headTitle">Hire the best Contractors and Labours for any job, online.</h1>
            </div>
            <div className="row  m-3 p-3" >
                <div className="card col-4 text-center mx-5 p-1 !important" style={customStyle}>
                    <input type="button" className="btn11" value="Sign IN" onClick={logfunc} />
                    <input type="button" className="btn11" value="Register" onClick={regfunc} />
                </div>

            </div>
        </div >
    )
}




export function HomeFooter() {
    return (
        <div className="row col-12 text-center justify-content-center mx-0" style={{ backgroundColor: "#b0acac" }}>

            <div className="col-4 text-center my-5"><h1>About Us</h1><p>This Platform generates oppurtunities towards work for both contractor and labours. by common point of view the platform makes workers easily available.</p></div>
            <div className="col-4 text-center my-5"><h1>Contact Us</h1><p>210540381113<br />210540581066<br />210540581040 <br />210540581057 <br />210540581039</p></div>
            <div className="col-4 text-center my-5" ><h1>FAQ</h1></div>
        </div>
    )
}





