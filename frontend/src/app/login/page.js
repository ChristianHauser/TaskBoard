// app/login/page.js
'use client';  // client-side React component

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // Call your PHP API login endpoint
    const res = await fetch('http://localhost/taskboard-api/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
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
            <label htmlFor='username'>Username</label> <br/>
            <input
                id='username'
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <br />
            <label htmlFor='password'>Password</label><br/>
            <input
                id='password'
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <br />
            <button type="submit">Log In</button>
        </form>
    </div>
  );
}
