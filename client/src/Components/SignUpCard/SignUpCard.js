import React, { useRef, useState } from 'react';

//import react boostrap components
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//import API Util
import API from '../../Utils/API';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

//import stylesheet
import './style.css';

const axios = require('axios'); //there are routes in both this file and the topnav that need to be moved to the api

function SignUpCard() {
    //hook into global user store
    const [state, dispatch] = useUserStoreContext();

    //states for showing the alert, what text to show
    const [show, setShow] = useState(false);
    const [textState, setTextState] = useState();
    const [alertVariant, setAlertVariant] = useState();

    //array containing possible text to display in the alert
    const alertText = [
        "Email address, password and name are required fields.",
        "You must enter a valid email address.",
        "This email is already in use.",
        "Password must be between 12 and 128 characters long.",
        "Your name must not be longer than 20 characters.",
        "Account created. Logging in..."
    ]

    //references to input fields
    const emailRef = useRef();
    const passwordRef = useRef();
    const nicknameRef = useRef();

    //this runs when the user tries to sign up
    async function signUp(event) {
        //prevent refreshing
        event.preventDefault();

        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

        //client-side validation!
        if (!emailRef.current.value || !passwordRef.current.value || !nicknameRef.current.value) {
            setAlertVariant("danger");
            setTextState(0);
            setShow(true);
            return;
        } else if (!emailRegex.test(emailRef.current.value)) {
            setAlertVariant("danger");
            setTextState(1);
            setShow(true);
            return;
        } else if (passwordRef.current.value.length < 12 || passwordRef.current.value.length > 128) {
            setAlertVariant("danger");
            setTextState(3);
            setShow(true);
            return;
        } else if (nicknameRef.current.value.length > 20) {
            setAlertVariant("danger");
            setTextState(4);
            setShow(true);
            return;
        }

        //grab the pitch preference value
        const pitchRadio = document.querySelectorAll('input[name="pitch"]');
        let pitch;
        pitchRadio.forEach(radio => {
            if (radio.checked) {
                pitch = radio.value;
            }
        });

        //grab the difficulty preference value
        const diffRadio = document.querySelectorAll('input[name="difficulty"]');
        let difficulty;
        diffRadio.forEach(radio => {
            if (radio.checked) {
                difficulty = radio.value;
            }
        });

        //now, create a user...
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            nickname: nicknameRef.current.value,
            pitch: Number(pitch),
            difficulty: Number(difficulty)
        }
        let newUser = await API.createUser(user);
        console.log(newUser);
        //if successful show a success alert and log the user in?
        setAlertVariant("success");
        setTextState(5);
        setShow(true);

        const { email, password } = user;

        axios.post('/login', { email, password })
            .then((result) => {
                localStorage.setItem('jwtToken', result.data.token);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
                axios.get(`/api/user/${email}`)
                    .then(res => {
                        console.log(res.data);
                        const user = res.data;
                        //convert the user info to a string and save to localstorage so that it persists upon refresh
                        const lsUser = JSON.stringify(user);
                        localStorage.setItem('lsUser', lsUser);
                        dispatch({
                            type: "LOGIN",
                            user: user
                        });
                        /*here we should get the user's info and set the global state equal to it. then redirect
                the user to the dashboard page, which always takes the global user state as props.
                alternatively, the page could be reloaded. The '/' route could use a switch statement to redirect the
                user to the homepage or their dashboard depending on the login state.
                */
                    })
                    .catch((error) => {
                        if (error.response.status === 401) {
                            console.log(error);
                        }
                    });
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
            });
    }

    return (
        <Form className="card" id="signUpCard" >
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
            <Button variant="success" onClick={signUp}>Sign Up!</Button>
            <Alert variant={alertVariant} show={show} className="fade in" id="alert">
                <Alert.Heading>{alertText[textState]}</Alert.Heading>
            </Alert>
        </Form>
    )
}

export default SignUpCard;