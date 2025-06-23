'use client';
import { useState } from "react";
export default function RegisterPage(){

    const [userRegistrationData, setUserRegistrationData] = useState({
            user_name: "",
            email: "",
            password: "", 
            redoPass:""
        });
    async function registerUser(){
        
    }
    return(
        <div className="formContainer">
            <form onSubmit={registerUser}> 

                <label htmlFor = "text">Name</label>
                <input 
                    type="text" 
                    placeholder="Name"
                    value={userRegistrationData.user_name}
                    onChange={e => setUserRegistrationData({
                        ...userRegistrationData,
                        user_name: e.target.value
                    })}
                    ></input>
            </form>
        </div>

    );
}