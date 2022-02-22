
import axios from 'axios';
import { useEffect, React, useState } from 'react';
import {
    BrowserRouter as Router,
    useHistory,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseurl } from '../../resources/baseurl';
import ShowCReview from '../UniversalComponents';
import LabourNavbar from './LabourNavbar/LabourNavBar';
import LUpdateLabour from './LabourNavbar/LUpdateUSer';
import LAddBidding from './LAddBiddingForm';
import LAssignedWorkListForContractorass from './LshowAssignedWorkL';
import LShowAvailableWork from './LshowAvailableWork';
import LShowBidding from './LshowBiddings';
import RequestForm from './RequestForm';
import LAssignedWorkListForContractor from './ShowAssignedWorkT';
import ShowContractorsbypinl from './ShowContractorByPin';
import ShowContractorsprof from './ShowContractorsprofile';

function Labourpage() {
    const history1 = useHistory();
    let [userdata, setuserdata] = useState();

    useEffect(() => {
        let l = JSON.parse(sessionStorage.getItem("logId"));

        axios.get(`${baseurl}/user/getLabourByUSerId/${l}`).then((response) => {
            console.log(response.data);
            let ldata = JSON.stringify(response.data);
            sessionStorage.setItem("logLdata", ldata);
        }, (error) => { })


        let user = JSON.parse(sessionStorage.getItem('udata'));
        if (user === null) {
            history1.replace("/");
        } else if (user.role != 'LABOUR') {
            history1.replace("/");
        }
        return () => {
            setuserdata(user);
        }
    }, [])

    let refresh = () => {
        history1.replace("/labour");
        window.location = "/labour/";
        history1.replace("/labour");
        window.location = "/labour/";
    }

    let Logout = () => {
        sessionStorage.clear();
        history1.replace("/");
        Swal.fire({ title: "Successfully logged Out", icon: 'success' });


    }
    let name;
    let role;
    if (sessionStorage.getItem("udata") !== null) {

        let l = JSON.parse(sessionStorage.getItem("udata"));
        name = l.userName;
        role = l.role;
    }

    return (
        <div>
            <div>
                <div className="row col-12 UpperBar bg bg-warning" >
                    <div className="col-3" >
                        <h4>LINK TO LABOUR</h4>
                    </div>


                    <div className="col-3"><h5>Profession: {role}</h5>
                    </div>
                    <div className="col-3 username" ><h5>Hello {name}</h5></div>
                    <div className="col-3">
                        <Button color="info" className="m-1" inverse onClick={refresh}>Refresh</Button>
                        <Button color="danger" inverse onClick={Logout}>Logout</Button>

                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                    </div>
                    <div className="row col-12">

                        <BrowserRouter>

                            <div className="col-3">
                                <LabourNavbar />
                            </div>
                            <div className="col-6">


                                <Route exact={true} path="/labour/showAvialableWorks" component={LShowAvailableWork} />
                                <Route exact={true} path="/labour/addbidding" component={LAddBidding} />
                                <Route exact={true} path="/labour/showBidding" component={LShowBidding} />
                                <Route exact={true} path="/labour/updateprof" component={LUpdateLabour} />
                                <Route exact={true} path="/labour/showAssignedForContractor" component={LAssignedWorkListForContractor} />
                                <Route exact={true} path="/labour/showAssignedForLabour" component={LAssignedWorkListForContractorass} />
                                <Route exact={true} path="/labour/requestForm" component={RequestForm} />
                                <Route exact={true} path="/labour/ShowContractorByPin" component={ShowContractorsbypinl} />
                                <Route exact={true} path="/labour/ShowContractorprof" component={ShowContractorsprof} />
                                <Route exact={true} path="/labour/ShowMyReview" component={ShowCReview} />





                                {/*  <Route exact={true} path="/contractor/addLicenseNo" component={LicensnoForm} />
                                <Route exact={true} path="/contractor/ShowRecentWork" component={ShowAvailableWork} />
                                <Route exact={true} path="/contractor/addBidding" component={AddBidding} />
                                <Route exact={true} path="/contractor/showBidding" component={ShowBidding} />
                                <Route exact={true} path="/contractor/ShowBiddingByCOntractorID" component={ShowBiddingByCOntractorID} />
                                <Route exact={true} path="/contractor/AssignedWorkByCOntractorID" component={AssignedWorkListForContractor} />
                                <Route exact={true} path="/contractor/GetLabourListByContractorID" component={ShowLaboursListForContractor} />
                                <Route exact={true} path="/contractor/updateLabour" component={UpdateCLabour} />
                                <Route exact={true} path="/contractor/requestList" component={ShowRequestList} /> */}

                            </div>

                        </BrowserRouter>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Labourpage
