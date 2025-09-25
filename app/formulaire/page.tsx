'use client';


import { use, useState } from "react";
import { useRouter } from 'next/navigation';
export default function Home(){
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, Setpassword] = useState("");
  const [loggedin, setLoggedin] = useState(false)
  const [failedLogin, setFailedlogin] = useState(false)
  // callback for the form
  // the e.preventdefault is from gpt cuz i didnt know how to prevent full refresh when submit
  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123" && username === "admin"){
    setLoggedin(true)
    setTimeout(() => {
      router.push("/");
    }, 3000);

    } else {
      alert('try again gg')
    }
  }

  //handle for change (js setting the value to the value in the forme)
  const handleChange = (e:any) => {
    setUsername(e.target.value);
  }
  // same thing here
  const handleChangePassword = (e:any) => {
    Setpassword(e.target.value);
  }
  // returns the actual html
  return(
   // parent div for everything + background
  <div className="bg-conic-180 from-black via-gray-300 to-black w-[100vw] h-[100vh] flex">
    <div className="mt-8 mx-auto h-[300px] grid">
        {/* login thingy*/}
      <h1 className="text-white text-[30px] mx-auto font-extrabold pt-[30vh] ">
        Login
      </h1>
      {/* login box*/}
      <div className="mt-1.5 mx-auto w-[320px] h-[200px] border-[1px] border-solid border-white rounded-[5px]  hover:w-[340px] duration-500 flex  hover:backdrop-blur-[25px]">
        {/* a div here to wrap things up cuz of flex*/}
        <div className="mx-auto">
        <h1 className="pt-4 text-white ml-3 mx-auto  pl-[80px]">Username</h1>
        {/* form n.1*/}
        <form onSubmit={submitCallback}>
          <input
            className="mt-2 w-[250px] h-[30px] rounded-[5px] border-[1px] hover:border-[2.5px] border-solid border-white text-white text-center mx-auto"
            type="text"
            id="myInput"
            value={username}
            onChange={handleChange}
          />
        </form>
        
        <h1 className="pt-4 text-white ml-3 mx-auto  pl-[80px]">Password</h1>
        {/* form n.2*/}
        <form onSubmit={submitCallback}>
          <input
            className="hover:border-[2.5px] mt-2 w-[250px] h-[30px] rounded-[5px] border-[1px] border-solid border-white text-white text-center mx-auto"
            type="password"
            id="passwordinput"
            value={password}
            onChange={handleChangePassword}
          />
        </form>
       </div>
      </div>
      {/* displayed when logged in */}
      {loggedin && <p className="mx-auto text-green-500 text-[20px] pt-5 font-bold">Logged in successfully!! You will be redirected in 3 seconds</p>}
    </div>
    
  </div>

 )
}