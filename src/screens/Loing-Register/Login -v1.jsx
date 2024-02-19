import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setUserData(data.data);
      setError(null);

      // Fetch all user data after successful login
      // Assuming there's a separate API endpoint for fetching user data
      const userDataResponse = await fetch('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${data.token}` // Assuming the token is provided in the login response
        }
      });

      if (!userDataResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userDataResponse.json();
      console.log('All user data:', userData);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      {userData && (
        <div>
          <h2>Welcome, {userData.user}!</h2>
          <p>Email: {userData.email}</p>
          {/* Display other user data */}
          <ul>
            {Object.keys(userData).map((key) => (
              <li key={key}>
                {key}: {userData[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // เมื่อโหลด component นี้ ตรวจสอบว่ามีข้อมูลผู้ใช้ใน local storage หรือไม่
//     const storedUserData = localStorage.getItem('userData');
//     if (storedUserData) {
//       const parsedUserData = JSON.parse(storedUserData);
//       setEmail(parsedUserData.email);
//       // ตั้งค่าอื่น ๆ ตามต้องการ เช่น setPassword หรืออื่น ๆ
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault(); // ป้องกันการส่งแบบฟอร์มเดิม
//     try {
//       // ส่งข้อมูลผู้ใช้ไปยังเซิร์ฟเวอร์เพื่อล็อกอิน
//       const response = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email,
//           password
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }
//       const data = await response.json();
//       setUserData(data.data);
//       setError(null);

//       // บันทึกข้อมูลผู้ใช้ใน local storage
//       localStorage.setItem('userData', JSON.stringify(data.data));

//       // นำผู้ใช้ไปยังหน้า Play_select
//       navigate("/Play_select");

//     } catch (error) {
//       console.error('Error:', error.message);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full">
//         <div className="border border-gray-300 bg-white shadow-md rounded-md p-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Sign in to your account
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//             <input type="hidden" name="remember" value="true" />
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border-blue-600 placeholder-black-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-2"
//                   placeholder="Email address"
//                 />
//               </div>

//               <div style={{ marginTop: "4px" }}>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border-blue-600 placeholder-black-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-2"
//                   placeholder="Password"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="rememberMe"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <Link
//                   to="/ForgotPassword"
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </div>
//             <div className="text-sm">
//               <h1 style={{ color: "black" }}>
//               Don't have an account?{" "}
//                 <Link
//                   to="/UI_select"
//                   className="underline font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                    Register
//                 </Link>
//               </h1>
//             </div>
//           </form>
//         </div>
//       </div>
//       {userData && (
//         <div>
//           <h2>Welcome, {userData.user}!</h2>
//           <p>Email: {userData.email}</p>
//           {/* Display other user data */}
//           <ul>
//             {Object.keys(userData).map((key) => (
//               <li key={key}>
//                 {key}: {userData[key]}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;
