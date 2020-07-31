import React, { useRef } from 'react';

//import react boostrap components
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

//import API Util
import API from '../../Utils/API';

//import stylesheet
import './style.css';

function SignUpCard() {
    let emailRef = useRef();
    let passwordRef = useRef();
    let nicknameRef = useRef();
    let pitchRef = useRef();
    let difficultyRef = useRef();

    async function signUp(event) {
        event.preventDefault();
        //basic safeguard to prevent user from signing up without any of these 3 fields
        if (!emailRef.current.value || !passwordRef.current.value || !nicknameRef.current.value) {
            return;
        }
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            nickname: nicknameRef.current.value,
            pitch: Number(pitchRef.current.value),
            difficulty: Number(difficultyRef.current.value)
        }
        let newUser = await API.createUser(user);
    }

    return (
        <Form className="card" id="signUpCard">
            <h3 className="card-title">New user? Sign up here!</h3>
            <label htmlFor="email">Email:</label>
            <FormControl id="email" name="email" ref={emailRef} type="email" placeholder="musician@ntunation.com" className="mr-sm-2" />
            <label htmlFor="password">Password:</label>
            <FormControl id="password" name="password" ref={passwordRef} type="password" placeholder="your_password" className="mr-sm-2" />
            <label htmlFor="nickname">What should we call you?</label>
            <FormControl id="nickname" name="nickname" ref={nicknameRef} type="text" placeholder="Ludwig" className="mr-sm-2" />
            <p>Please select your region (pitch level):</p>
            <div className="form-check">
                <input defaultChecked className="form-check-input" type="radio" id="american" name="pitch" value="440" /><label className="form-check-label" htmlFor="american">American Pitch (440)</label><br />
                <input className="form-check-input" type="radio" id="euro" name="pitch" value="442" /><label className="form-check-label" htmlFor="euro">European Pitch (442)</label><br />
            </div>
            <p>Please select your default difficulty:</p>
            <div className="form-check">
                <input defaultChecked className="form-check-input" type="radio" id="easy" name="difficulty" value="1" /><label className="form-check-label" htmlFor="easy">Easy</label><br />
                <input className="form-check-input" type="radio" id="medium" name="difficulty" value="2" /><label className="form-check-label" htmlFor="medium">Medium</label><br />
                <input className="form-check-input" type="radio" id="hard" name="difficulty" value="3" /><label className="form-check-label" htmlFor="medium">Hard</label><br />
            </div>
            <Button variant="success" >Sign Up!</Button>
        </Form>
    )
}

export default SignUpCard;