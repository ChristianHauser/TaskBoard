'use client';
import { useState } from "react";
export default function RegisterPage(){

    const userRegistrationData = {
            user_name,
            email,
            password, 
        }
    async function registerUser(){
        
    }
    return(
        <div className="formContainer">
            <form onSubmit={registerUser}> 

                <label htmlFor = "text">Name</label>
                <input type="text" placeholder="Name"
            </form>
        </div>

    );
}