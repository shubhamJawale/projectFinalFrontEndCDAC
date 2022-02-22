import { useEffect, React, useState } from 'react';
import {
    BrowserRouter as Router,
    useHistory,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";
import { Button, CardColumns } from 'reactstrap';
import Swal from 'sweetalert2';
import ShowCReview from '../UniversalComponents';

import AddBidding from './AddBidding';
import AssignedWorkListForContractor from './CShowAssignedWork';
import ShowLaboursListForContractor from './CshowLabourList';
import UpdateCLabour from './CupdateLuser';
import ShowBiddingByCOntractorID from './getContractorsBiddingLIst';
import LicensnoForm from './minIcomponents/EnterLicenseNO';
import ContractorNavBar from './navBarComponents/ContractorNavBar';
import ShowAvailableWork from './ShowAvailableWorks';
import ShowBidding from './ShowBIddingLIst';
import ShowRequestList from './ShowcAllRequests';
function Contractorpage() {
    const history1 = useHistory();
    let [userdata, setuserdata] = useState();

    useEffect(() => {
        if ((sessionStorage.length === 0) || sessionStorage.getItem("logCdata") === null) {
            history1.replace("/");
        } else {

            let user = JSON.parse(sessionStorage.getItem('udata'));
            let Cdata = JSON.parse(sessionStorage.getItem('logCdata'));
            console.log(Cdata.licenceNo);
            setuserdata(user);
            var date = Date.now;
            if (user === null) {
                history1.replace("/");
            } else if (user.role !== 'CONTRACTOR') {
                history1.replace("/");
            }

            else if (Cdata.licenceNo === null) {

                history1.push("/contractor/addLicenseNo");
            }

            /* else if (Cdata.expiryDate < date) {
    
                Swal.fire({ title: "License Expired", icon: "warning" });
                history1.push("/contractor/addLicenseNo");
    
    
            } */
            else {
                history1.push("/contractor");
            }
        }
        return () => {

        }
    }, [])
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

    // USER HOMEPAGE
    //ShowBidding
    return (
        <div className="">
            <div className="row col-12 UpperBar bg-warning p-1 " style={{ position: "fixed", zIndex: "5" }}>
                <div className="col-3 c" >
                    <h3>LINK TO LABOUR</h3>
                </div>
                <div className="col-3 "  ><h5> Profession: {role}</h5> </div>
                <div className="col-3 username " ><h5>Welcome {name}</h5></div>
                <div className="col-3" >
                    <Button color="danger" inverse onClick={Logout} style={{ float: "right" }}>Logout</Button>
                </div>
            </div>
            <div>
                <div>
                </div>
                <div className="row col-12">

                    <BrowserRouter>

                        <div className="col-3">
                            <ContractorNavBar />
                        </div>
                        <div className="col-6">
                            <Route exact={true} path="/contractor/addLicenseNo" component={LicensnoForm} />
                            <Route exact={true} path="/contractor/ShowRecentWork" component={ShowAvailableWork} />
                            <Route exact={true} path="/contractor/addBidding" component={AddBidding} />
                            <Route exact={true} path="/contractor/showBidding" component={ShowBidding} />
                            <Route exact={true} path="/contractor/ShowBiddingByCOntractorID" component={ShowBiddingByCOntractorID} />
                            <Route exact={true} path="/contractor/AssignedWorkByCOntractorID" component={AssignedWorkListForContractor} />
                            <Route exact={true} path="/contractor/GetLabourListByContractorID" component={ShowLaboursListForContractor} />
                            <Route exact={true} path="/contractor/updateLabour" component={UpdateCLabour} />
                            <Route exact={true} path="/contractor/requestList" component={ShowRequestList} />
                            <Route exact={true} path="/contractor/ShowReviews" component={ShowCReview} />

                        </div>

                    </BrowserRouter>
                </div>
            </div>
        </div >
    )
}

export default Contractorpage
