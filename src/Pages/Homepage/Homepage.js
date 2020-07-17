import React from 'react';
import './style.css';
import TopNav from '../../Components/TopNav/TopNav';
import Jumbo from '../../Components/Jumbotron/Jumbo';
import Notecard from '../../Components/Notecard/Notecard';

function Homepage() {
    return (
        <div className="heroImg">
            <TopNav />
            <Jumbo heading="/ˌin(t)o͞oˈnāSH(ə)n/" page="home" btnText="Try it Out!" text="NTunation - the comprehensive, intonation-focused aural-training application." />
        </div>
    )
}

export default Homepage;