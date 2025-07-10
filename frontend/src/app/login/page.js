// app/login/page.js
'use client';  // client-side React component

import { useRouter } from "next/navigation";
import {auth} from "../firebaseConfig/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  
  

  const showPasswordHandlers =  {
    onMouseDown: () => setShowPass(true),
    onMouseUp: () => setShowPass(false),
    onMouseLeave: () => setShowPass(false),
    onTouchStart: () => setShowPass(true),
    onTouchEnd: () => setShowPass(false),
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const login = await signInWithEmailAndPassword(auth,email,password);
      console.log("Logged IN YUHU");
      await login.user?.reload();
      if(auth.currentUser?.emailVerified){
        console.log("Verified redirecting");
        
        console.log('User after login:', login.user);
        const token = await login.user.getIdToken();
        console.log('Token after login:', token);
        router.push("./homePage");
      }else{
        console.log("Email is not yet verified");
        return;
      }
    }catch(err){
      console.error(err);
    };
  };
  

  return (
    <div className='mainContainer'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label> <br/>
            <input
                id='email'
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <br />
            <label htmlFor='password'>Password</label><br/>
            <input
                id='password'
                type={showPass ? "text":"password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button className="togglePassBtn" type='button' {...showPasswordHandlers}>{showPass ? "Hide" : "Show"}</button>
            <br />
            <button className='submitBtn' type="submit">Log In</button>
        </form>
    </div>
  );
};
