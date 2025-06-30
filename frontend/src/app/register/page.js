'use client';
import { sendError } from "next/dist/server/api-utils";
import { useState } from "react";
import {auth} from "../firebaseConfig/firebaseInit";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


export default function RegisterPage(){

    const [showPass, setShowPass] = useState(false);
    const [showRedoPass, setShowRedoPass] = useState(false);

    

    const [userRegistrationData, setUserRegistrationData] = useState({
            user_name: "",
            email: "",
            password: "", 
            redoPass:""
        });

    async function registerUser(e){
        e.preventDefault();
        if(userRegistrationData.password !== userRegistrationData.redoPass){
            alert("Passwords do not match");
            return;
        }
        try {
                const userCredential = await createUserWithEmailAndPassword(auth, userRegistrationData.email, userRegistrationData.password);
                console.log(userCredential.user.uid);

                await sendEmailVerification(userCredential.user);

                // store other user data in your DB if needed, using userCredential.user.uid
            } catch (err) {
                console.error(err);
            }
        
    }

    const handleSetRegisData = (e) =>{
        const {name,value} = e.target;
        setUserRegistrationData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    


    const showPasswordHandlers =  {
        onMouseDown: () => setShowPass(true),
        onMouseUp: () => setShowPass(false),
        onMouseLeave: () => setShowPass(false),
        onTouchStart: () => setShowPass(true),
        onTouchEnd: () => setShowPass(false),
    };
    const showRedoPasswordHandlers =  {
        onMouseDown: () => setShowRedoPass(true),
        onMouseUp: () => setShowRedoPass(false),
        onMouseLeave: () => setShowRedoPass(false),
        onTouchStart: () => setShowRedoPass(true),
        onTouchEnd: () => setShowRedoPass(false),
    };



    return(
        <div className="formContainer">
            <form onSubmit={registerUser}> 

                <label htmlFor = "text">Name</label><br/>
                <input 
                    id="text"
                    name="user_name"
                    type="text" 
                    placeholder="Name"
                    value={userRegistrationData.user_name}
                    onChange={handleSetRegisData}
                    required
                ></input><br/>
                <label htmlFor="email">Email</label><br/>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={userRegistrationData.email}
                    onChange={handleSetRegisData}
                ></input><br/>
                <label htmlFor="password">Password</label><br/>
                <input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type= {showPass ? "text" :"password"}
                    required
                    value={userRegistrationData.password}
                    onChange={handleSetRegisData}
                ></input><button className="showPassBtn" type="button" {...showPasswordHandlers}>{showPass ? "Hide":"Show"}</button><br/>
                <label htmlFor="redoPassword">Password</label><br/>
                <input
                    id="redoPassword"
                    name="redoPass"
                    placeholder="repeat Password"
                    type= {showRedoPass ? "text" : "password"}
                    required
                    value={userRegistrationData.redoPass}
                    onChange={handleSetRegisData}
                ></input> <button className="showRedoPassBtn" type="button" {...showRedoPasswordHandlers}>{showRedoPass ? "Hide" : "Show"}</button><br/>
                <button className='submitBtn' type="submit">Register</button>
            </form>
        </div>

    );
}