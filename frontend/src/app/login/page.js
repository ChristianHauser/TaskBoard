// app/login/page.js
'use client';  // client-side React component

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  

  const showPasswordHandlers =  {
    onMouseDown: () => setShowPass(true),
    onMouseUp: () => setShowPass(false),
    onMouseLeave: () => setShowPass(false),
    onTouchStart: () => setShowPass(true),
    onTouchEnd: () => setShowPass(false),
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Call your PHP API login endpoint
    const res = await fetch('http://localhost/my_stuff/TaskBoard/TaskBoard/backend/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
      alert('Login successful!');
      // You can store auth token, redirect, etc.
    } else {
      alert('Login failed: ' + data.message);
    }
  }

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
}
