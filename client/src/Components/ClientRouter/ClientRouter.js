import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';

//Import custom pages
import Homepage from '../../Pages/Homepage/Homepage';
import SampleExercises from '../../Pages/SampleExercises/SampleExercises'
import Dashboard from '../../Pages/Dashboard/Dashboard';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

function ClientRouter() {
    //hook into global user store
    const [state, dispatch] = useUserStoreContext();

    useEffect(() => {
        //when the component mounts, check if there is a user saved to localstorage. if so, perform the login 
        //dispatch call
        let lsUser = localStorage.getItem('lsUser');
        const token = localStorage.getItem('jwtToken');

        //i may want to add an axios call to verify that the token and user match
        if (lsUser && token) {
            //parse the user back into an object
            lsUser = JSON.parse(lsUser);
            //update global state
            dispatch({
                type: "LOGIN",
                user: lsUser
            })
        }
    }, [])
    return (
        <Router>
            {(() => {
                if (state.loggedIn) {
                    return (
                        <Route exact path="/" component={Dashboard} />
                    )
                } else {
                    return (
                        <Route exact path="/" component={Homepage} />
                    )
                }
            })()}
            <Route path="/sampleexercises/:exercise" children={<Exercises />} />
        </Router>
    )
}

function Exercises() {
    let { exercise } = useParams();
    return (
        <SampleExercises exercise={exercise} />
    )
}

export default ClientRouter;