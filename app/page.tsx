/* 
all the code until return is the typescript used to validate password, handle form and redirect, the html and css is from line 170
Im using tailwind css for styling, https://tailwindcss.com/ so the css is directly in the html, eg: className="bg-black" = background black or text-white = white text
if you want to see the css code (like .bg-black {background-color: var(--color-black)}, install tailwind extension in vscode and hover over the classname

because you cant really see the form well with a img, im using a img thats almost entirely black, for other img, refer to line 187 where i put a mountain img

some varaibles arent really named properly, refer to the comments for their actual functionality

I used prettier for code format

where i used gpt:
- to prevent full refresh when submiting the form line 
- to add/remove items from the reason array 

other resources used:
stackoverflow 
tailwind docs
nextjs docs
react docs


The easter egg:
when username is set as bounce, and the form is submitted, the form will start bouncing
submit the form again with the username anything else then bounce to stop it from bouncing
*/

'use client';

// imports
import { useState } from "react";
// for redirecting
import { useRouter } from 'next/navigation';

//main function that returns all the html and does the functions(javascripts)
export default function Home() {
  // router = for redirecting
  const router = useRouter();

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
  // to prevent submission if the pwd isnt validated
  const [passwordValidated, setpasswordValidated] = useState(false)
  // to check if theres a special char
  const [passwordspecialChar, setpasswordspecialChar] = useState(true)
  // to check if both pwd is the same
  const [samepwd, Setsamepwd] = useState(false)
  // to store the reason why the pwd is invalid, used gpt for the <string[]>([]), starting with 2 reasons because if theres no changes in the fields, the reason will be empty
  const [failedreason, setfailedreason] = useState<string[]>(["Passwords do not match", "Passwords is less then 8 characters"]);
  // the msg displayed when failed to register
  const [failedstring, setfailedstring] = useState("")
  // to show the failed msg
  const [failed, setfailed] = useState(false)
  // for the easter egg
  const [bounce, setbounce] = useState(false);
  const DynamicClass = "mt-8 mx-auto h-[300px] grid duration-150";

  // callback for the form
  const submitCallback = (e: React.FormEvent) => {
    // prevent the forced refresh when submitting forme
    e.preventDefault();
    // make the form bounce 
    if (username === 'bounce') {
      setbounce(true);
      return;
    } else {
      setbounce(false);
    }
    
    if (samepwd && !pwdLengthNotMet && passwordValidated && username.length !== 0) {
      // so the logged in success full message appear
      setLoggedin(true);
      // 2 second timeout
      setTimeout(() => {
        // redirect to registered page
        router.push("/registered?name=" + username);
      }, 2000);
    } else {
      // if theres no changes in the username form aka: the change handler cant add the reason to the list
      if (username.length === 0 && !failedreason.includes("Username is empty")) {
        setfailedreason(prev => [
          ...prev.filter(item => item !== "Username is empty"),
          "Username is empty",
        ]);
        // because react doesnt update the variable, so the reason will be empty, even tho username is empty, thats why "username is empty" has to be hardcoded
        // setting failed string + display the failed string
        if (failedreason.length === 0) {
          setfailedstring("Invalid password! Reasons: Username is empty");
        } else {
          setfailedstring(
            "Invalid password! Reasons: " + failedreason.join(", ") + ", Username is empty"
          );
        }
        // display failed message
        setfailed(true);
      } else {
        setfailed(true);
        setfailedstring("Invalid password! Reasons: " + failedreason.join(", "));
      }
      // remove the msg after 3 sec
      setTimeout(() => {
        setfailed(false);
      }, 3000);
    }
  };
  // handler for change in username forme
  const handleChange = (e: any) => {
    setUsername(e.target.value);

    if (e.target.value.length !== 0) {
      // add the failed reason to the listo f failed reason
      setfailedreason(prev => prev.filter(item => item !== "Username is empty"));
    } else {
      setfailedreason(prev => [
        ...prev.filter(item => item !== "Username is empty"),
        "Username is empty",
      ]);
    }
  };
  // handler for change in password forme
  const handleChangePassword = (e: any) => {
    console.log(failedreason);
    // validates password here
    // check if its the same pwd
    if (charValidate === e.target.value && e.target.value.length !== 0) {
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
    // check if its 8 char
    if (e.target.value.length < 8 || e.target.value.length === 0) {
      setPwdLengthNotMet(true);
      setpasswordValidated(false);
      setfailedreason(prev => [
        ...prev.filter(item => item !== "Passwords is less then 8 characters"),
        "Passwords is less then 8 characters",
      ]);
    } else {
      setfailedreason(prev => prev.filter(item => item !== "Passwords is less then 8 characters"));
      setPwdLengthNotMet(false);
      setpasswordValidated(true);
    }
    // check for special chars, it will let the user submit, but will display a warnign
    
    const specialCharPattern = /[^a-zA-Z0-9]/;// the regex here is generated by gpt
    if (!specialCharPattern.test(e.target.value) || e.target.value.length === 0) {
      setpasswordspecialChar(true);
    } else {
      setpasswordspecialChar(false);
    }

    Setpassword(e.target.value);
  };
 // check for the enter password again
  const handleChangeValidate = (e: any) => {
    setCharValidate(e.target.value);
    // checks if the password and the enter again is the same
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
 // the html from here on
  return (
    // parent div for everything + background
    //<div className="bg-conic-180 from-black via-gray-300 to-black w-[100vw] h-[100vh] flex">
    //<div className="bg-[url(/ressources/mountain.jpg)] bg-cover w-[100vw] h-[100vh] flex">  
    <div className="bg-[url(/ressources/black.png)] w-[100vw] h-[100vh] flex">
      {/* easter egg: it will bounce when username is set to bounce*/}
      <div className={`base-class ${DynamicClass} ${bounce ? 'animate-bounce' : ''}`}>
        {/* register */}
        <h1 className="text-white text-[35px] mx-auto font-bold pt-[20vh] animate-fade duration-300">
          Register
        </h1>

        {/* register box */}
        <div className="mt-3 mx-auto w-[465px] h-[370px] border-[1.5px] border-solid border-white rounded-[5px] hover:w-[500px] duration-500 flex hover:backdrop-blur-[25px] backdrop-blur-[5px] ease-out">
          <div className="mx-auto my-auto pl-5">
            <h1 className="text-white pt-4">Username</h1>
            {/* enter usename box*/}
            <form onSubmit={submitCallback}>
              <input
                className="mt-2 w-[280px] h-[30px] rounded-[5px] border-[1px] hover:border-[2.5px] border-solid border-white text-white text-center mx-auto"
                type="text"
                id="myInput"
                value={username}
                onChange={handleChange}
              />
            </form>
           {/* enter password box*/}
            <h1 className="pt-4 text-white">Password</h1>
            <form onSubmit={submitCallback}>
              <input
                className="hover:border-[2.5px] mt-2 w-[280px] h-[30px] rounded-[5px] border-[1px] border-solid border-white text-white text-center mx-auto"
                type="password"
                id="passwordinput"
                value={password}
                onChange={handleChangePassword}
              />
            </form>
           {/* enter password again box*/}
            <h1 className="pt-4 text-white">Enter your password again</h1>
            <form onSubmit={submitCallback}>
              <input
                className="hover:border-[2.5px] mt-2 w-[280px] h-[30px] rounded-[5px] border-[1px] border-solid border-white text-white text-center mx-auto"
                type="password"
                id="passwordinput"
                value={charValidate}
                onChange={handleChangeValidate}
              />
            </form>
            
            {/* to display the password requirements */}
            {!samepwd && (
              <p className="mx-auto text-red-500 text-[15px] pt-5 font-semibold">
                ❌ Password has to be the same
              </p>
            )}
            {samepwd && (
              <p className="mx-auto text-green-500 text-[15px] pt-5 font-semibold">
                ✅ Password is the same
              </p>
            )}

            {pwdLengthNotMet && (
              <p className="mx-auto text-red-500 text-[15px] pt-1 font-semibold">
                ❌ Password has to be longer then 8 characters
              </p>
            )}
            {!pwdLengthNotMet && (
              <p className="mx-auto text-green-500 text-[15px] pt-1 font-semibold">
                ✅ Password is longer then 8 characters
              </p>
            )}

            {passwordspecialChar && (
              <p className="mx-auto text-yellow-500 text-[15px] pt-1 font-semibold">
                ⚠️ No special character in the password
              </p>
            )}
            {!passwordspecialChar && (
              <p className="mx-auto text-green-500 text-[15px] pt-1 font-semibold">
                ✅ Password contains a special character
              </p>
            )}
            {/* this is here to prevent the div from moving bc of mx-auto*/}
            <div className="w-[350px]"></div>
          </div>
        </div>
          {/* submit button*/}
        <button
          className="mt-3 mx-auto w-[150px] h-[40px] rounded-[5px] border-[1.5px] border-solid border-white text-white font-bold hover:bg-white hover:text-black hover:border-black duration-500 ease-in-out"
          onClick={submitCallback}
        >
          Submit
        </button>
          {/* displayed when the password is valid*/}
        {loggedin && (
          <p className="mx-auto text-green-500 text-[15px] pt-5 font-semibold">
            Registered successfully!! You will be redirected in 2 seconds.
          </p>
        )}
        {/* displayed if password isnt valid*/}
        {failed && (
          <p className="mx-auto text-red-500 text-[15px] pt-5 font-semibold">
            {failedstring}
          </p>
        )}
      </div>
    </div>
  );
}
