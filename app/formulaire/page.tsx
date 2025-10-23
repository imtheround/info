/* 
Im using tailwind css for styling, https://tailwindcss.com/ so the css is directly in the html, eg: className="bg-black" = background black or text-white = white text
if you want to see the css code (like .bg-black {background-color: var(--color-black)}, install tailwind extension in vscode and hover over the classname

because you cant really see the form well with a img, im using a img thats almost entirely black, for other img, refer to line 108 where i put a mountain img

some varaibles arent really named properly, refer to the comments for their actual functionality

I used prettier for code format

where i used gpt:
- to prevent full refresh when submiting the form line 51
- to add/remove items from the reason array (line 62-66)

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
  const [username, setUsername] = useState("");
  const [password, Setpassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [charValidate, setCharValidate] = useState("");
  const [pwdLengthNotMet, setPwdLengthNotMet] = useState(true);
  const [passwordValidated, setpasswordValidated] = useState(false);
  const [passwordspecialChar, setpasswordspecialChar] = useState(true);
  const [samepwd, Setsamepwd] = useState(false);
  const [failedreason, setfailedreason] = useState<string[]>([
    "Passwords do not match",
    "Passwords is less then 8 characters",
  ]);
  const [failedstring, setfailedstring] = useState("");
  const [failed, setfailed] = useState(false);
  const [bounce, setbounce] = useState(false);
  const DynamicClass = "mt-8 mx-auto h-[300px] grid duration-150";

  // callback for the form
  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'bounce') {
      setbounce(true);
      return;
    } else {
      setbounce(false);
    }

    if (samepwd && !pwdLengthNotMet && passwordValidated && username.length !== 0) {
      setLoggedin(true);
      setTimeout(() => {
        router.push("/registered?name=" + username);
      }, 2000);
    } else {
      if (username.length === 0 && !failedreason.includes("Username is empty")) {
        setfailedreason(prev => [
          ...prev.filter(item => item !== "Username is empty"),
          "Username is empty",
        ]);

        if (failedreason.length === 0) {
          setfailedstring("Invalid password! Reasons: Username is empty");
        } else {
          setfailedstring(
            "Invalid password! Reasons: " + failedreason.join(", ") + ", Username is empty"
          );
        }

        setfailed(true);
      } else {
        setfailed(true);
        setfailedstring("Invalid password! Reasons: " + failedreason.join(", "));
      }

      setTimeout(() => {
        setfailed(false);
      }, 3000);
    }
  };

  const handleChange = (e: any) => {
    setUsername(e.target.value);

    if (e.target.value.length !== 0) {
      setfailedreason(prev => prev.filter(item => item !== "Username is empty"));
    } else {
      setfailedreason(prev => [
        ...prev.filter(item => item !== "Username is empty"),
        "Username is empty",
      ]);
    }
  };

  const handleChangePassword = (e: any) => {
    console.log(failedreason);

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

    const specialCharPattern = /[^a-zA-Z0-9]/;
    if (!specialCharPattern.test(e.target.value) || e.target.value.length === 0) {
      setpasswordspecialChar(true);
    } else {
      setpasswordspecialChar(false);
    }

    Setpassword(e.target.value);
  };

  const handleChangeValidate = (e: any) => {
    setCharValidate(e.target.value);

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
            <form onSubmit={submitCallback}>
              <input
                className="mt-2 w-[280px] h-[30px] rounded-[5px] border-[1px] hover:border-[2.5px] border-solid border-white text-white text-center mx-auto"
                type="text"
                id="myInput"
                value={username}
                onChange={handleChange}
              />
            </form>

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

        <button
          className="mt-3 mx-auto w-[150px] h-[40px] rounded-[5px] border-[1.5px] border-solid border-white text-white font-bold hover:bg-white hover:text-black hover:border-black duration-500 ease-in-out"
          onClick={submitCallback}
        >
          Submit
        </button>

        {loggedin && (
          <p className="mx-auto text-green-500 text-[15px] pt-5 font-semibold">
            Registered successfully!! You will be redirected in 2 seconds.
          </p>
        )}

        {failed && (
          <p className="mx-auto text-red-500 text-[15px] pt-5 font-semibold">
            {failedstring}
          </p>
        )}
      </div>
    </div>
  );
}
