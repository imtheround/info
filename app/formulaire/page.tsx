/* 
Im using tailwind css for styling, https://tailwindcss.com/ so the css is directly in the html, eg: className="bg-black" = background black or text-white = white text
if you want to see the css code (like .bg-black {background-color: var(--color-black)}, install tailwind extension in vscode and hover over the classname

because you cant really see the form well with a img, im using a img thats almost entirely black, for other img, refer to line 108 where i put a mountain img
*/

// use client so this will be rendered on client side
'use client';

// imports
import { useState } from "react";
// for redirecting
import { useRouter } from 'next/navigation';

//main function that returns all the html and does the functions(javascripts)
export default function Home(){
  // router = for redirecting
  const router = useRouter()

  // variables, let doesnt work in react, need to use usestate for changing variables, eg: username is the variable, call setUsername to change the username
  // username var
  const [username, setUsername] = useState("");
  // pwd var
  const [password, Setpassword] = useState("");
  // this shows the message that says logged in successfully
  const [loggedin, setLoggedin] = useState(false)
  // the enter password again var
  const [charValidate, setCharValidate] = useState("")
  // here is the length isnt met
  const [pwdLengthNotMet, setPwdLengthNotMet] = useState(true)
  // to prevent submission if the pwd isnt validat
  const [passwordValidated, setpasswordValidated] = useState(false)
  // to check if theres a special char
  const [passwordspecialChar, setpasswordspecialChar] = useState(true)
  // to check if both pwd is the same
  const [samepwd, Setsamepwd] = useState(false)
  // to store the reason why the pwd is invalid, used gpt for the <string[]>([])
  const [failedreason, setfailedreason] = useState<string[]>([]);
  // the msg displayed when failed to register
  const [failedstring, setfailedstring] = useState("")
  // callback for the form
  // the e.preventdefault is from gpt cuz i didnt know how to prevent full refresh when submit
  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (samepwd && !pwdLengthNotMet && passwordValidated && username.length !== 0) {
      // so the logged in success full message appear
    setLoggedin(true)
    // 2 second timeout
    setTimeout(() => {
      // redirect to registered page
      router.push("/registered?name=" + username);
    }, 2000);
    } else {
      if (username.length === 0 && !failedreason.includes("Username is empty")){
        setfailedreason(prev => [
          ...prev.filter(item => item !== "Username is empty"),
          "Username is empty",
        ]);
        // because react doesnt update the variable, and the reason will be empty, even tho username is empty, 
        alert("Invalid password! Reasons: "+failedreason.join(", ")+"Username is empty")
      } else {
      const reasonsString = failedreason.join(", ");
      alert("Invalid password! Reasons:"+reasonsString)}
    }
  }
  
  //handle for change (js setting the value to the value in the forme) this one for username
  const handleChange = (e:any) => {
    setUsername(e.target.value);
    if (e.target.value.length !== 0){
      setfailedreason(prev => prev.filter(item => item !== "Username is empty"));
    } else {
      setfailedreason(prev => [
        ...prev.filter(item => item !== "Username is empty"),
        "Username is empty",
      ]);
    }
  }
  // same thing here, for password
  const handleChangePassword = (e:any) => {
    console.log(failedreason)
    // check if password and enter password again are same
    if (charValidate === e.target.value&& e.target.value.length !== 0){
      // this is used to show the text
      Setsamepwd(true)
      setpasswordValidated(true)
      setfailedreason(prev => prev.filter(item => item !== "Passwords do not match"));
    } else {
      // used gpt again for the ...prev filter thingy, and check if the reason already exist
      setfailedreason(prev => [
        ...prev.filter(item => item !== "Passwords do not match"),
        "Passwords do not match",
      ]);
      Setsamepwd(false)
      setpasswordValidated(false)
    }
    // length check
    if (e.target.value.length < 8 || e.target.value.length === 0) {
      setPwdLengthNotMet(true);
      setpasswordValidated(false)
      // gpt here again
      setfailedreason(prev => [
    ...prev.filter(item => item !== "Passwords is less then 8 characters"),
    "Passwords is less then 8 characters",
  ]);
    } else {
      setfailedreason(prev => prev.filter(item => item !== "Passwords is less then 8 characters"));
      setPwdLengthNotMet(false);
      setpasswordValidated(true)
    }
    // check if theres a special char
    const specialCharPattern = /[^a-zA-Z0-9]/;
    if (!specialCharPattern.test(e.target.value) || e.target.value.length === 0) {
      setpasswordspecialChar(true);
    } else {
      setpasswordspecialChar(false);
    }
    // to set the password to whatever the user typed
    Setpassword(e.target.value)
  }
  
   const handleChangeValidate = (e: any) => {
  setCharValidate(e.target.value);
  // if both are same check
  if (e.target.value === password && e.target.value.length !== 0) {
    Setsamepwd(true);
    setpasswordValidated(true);
    setfailedreason(prev => prev.filter(item => item !== "Passwords do not match"));
  } else {
    setfailedreason(prev => [
      ...prev.filter(item => item !== "Passwords do not match"),
      "Passwords do not match",
    ]);
    Setsamepwd(false);
    setpasswordValidated(false);
  }
};

  // returns the actual html
  return(
   // parent div for everything + background
   // this div for the conic gradient background
  //<div className="bg-conic-180 from-black via-gray-300 to-black w-[100vw] h-[100vh] flex">
  // this if you want a img as the background, can;t really see the form , so using black for right now
  //<div className="bg-[url(/ressources/mountain.jpg)] bg-cover w-[100vw] h-[100vh] flex"> 
  <div className="bg-[url(/ressources/black.png)] w-[100vw] h-[100vh] flex">
   <div className="mt-8 mx-auto h-[300px] grid">
        {/* register*/}
      <h1 className="text-white text-[35px] mx-auto font-bold pt-[30vh] ">
        Register
      </h1>
      {/* register box*/}
      <div className="mt-3 mx-auto w-[380px] h-[350px] border-[1.5px] border-solid border-white rounded-[5px] hover:w-[410px] duration-500 flex hover:backdrop-blur-[25px] backdrop-blur-[5px] ease-in-out">
        {/* a div here to wrap things up cuz of flex*/}
        <div className="pl-5">

        <h1 className="pt-4 text-white ">Username</h1>
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
        
        <h1 className="pt-4 text-white ">Password</h1>
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

        <h1 className="pt-4 text-white">Enter your password again</h1>
        {/* form n.3*/}
        <form onSubmit={submitCallback}>
          <input
            className="hover:border-[2.5px] mt-2 w-[250px] h-[30px] rounded-[5px] border-[1px] border-solid border-white text-white text-center mx-auto"
            type="password"
            id="passwordinput"
            value={charValidate}
            onChange={handleChangeValidate}
          />
        </form>

        {/* to display if both pwd is the same or not */}
        {!samepwd && <p className="mx-auto text-red-500 text-[15px] pt-5 font-semibold">❌ Password has to be the same</p>}
        {samepwd && <p className="mx-auto text-green-500 text-[15px] pt-5 font-semibold">✅ Password is the same</p>}
        {/* to display if pwd length is met or not */}
        {pwdLengthNotMet && <p className="mx-auto text-red-500 text-[15px] pt-1 font-semibold">❌ Password has to be longer then 8 characters</p>}
        {!pwdLengthNotMet && <p className="mx-auto text-green-500 text-[15px] pt-1 font-semibold">✅ Password is longer then 8 characters</p>}
        {/* to display if theres special chars in the pwd */}
        {passwordspecialChar && <p className="mx-auto text-yellow-500 text-[15px] pt-1 font-semibold">⚠️ No special character in the password</p>}
        {!passwordspecialChar && <p className="mx-auto text-green-500 text-[15px] pt-1 font-semibold">✅ Password contains a special character</p>}
       </div>
      </div>
      {/* submit button */}
      <button
        className="mt-3 mx-auto w-[150px] h-[40px] rounded-[5px] border-[1.5px] border-solid border-white text-white font-bold hover:bg-white hover:text-black hover:border-black duration-500 ease-in-out"
        onClick={submitCallback}
      >
        Submit
      </button>
      {/* displayed when regirstered */}
      {loggedin && <p className="mx-auto text-green-500 text-[15px] pt-5 font-semibold">Registered successfully!! You will be redirected in 2 seconds</p>}
      



  </div>
    </div>
    


 )
}