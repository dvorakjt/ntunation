import React from 'react';
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