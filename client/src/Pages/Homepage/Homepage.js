import React from 'react';
import './style.css';
import TopNav from '../../Components/TopNav/TopNav';
import Jumbo from '../../Components/Jumbotron/Jumbo';
import SignUpCard from '../../Components/SignUpCard/SignUpCard';

function Homepage() {
    return (
        <div className="heroImg">
            <TopNav />
            <div className="row">
                <div className="col-md-6">
                    <SignUpCard />
                </div>
            </div>
        </div>
    )
}

export default Homepage;