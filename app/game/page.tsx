"use client";

import React, { useEffect, useState } from "react";
// for redirecting
import { useRouter, useSearchParams } from "next/navigation";
// imports the heart count that follows the mouse
import MouseFollower from "../components/mousefollower";
import useSound from 'use-sound';
export default function Page() {
  const winSound = new Audio("/ressources/audio/win.mp3");
  const hurtSound = new Audio("/ressources/audio/hurt.mp3");
  const WarningSound = new Audio("/ressources/audio/warning.mp3");
  const clickSound = new Audio("/ressources/audio/click.mp3");
  const deadSound = new Audio("/ressources/audio/ded.mp3");
  // all the vars
  const router = useRouter();
  // gets the difficulty after redirect
  const searchParams = useSearchParams();
  const diff = searchParams.get("diff");
  if (!diff) {
    router.push("/difficultySelect");
  } else if (
    diff !== "easy" &&
    diff !== "medium" &&
    diff !== "hard" &&
    diff !== "expert"
  ) {
    router.push("/difficultySelect");
  }
  // life
  const [life, setLife] = useState<number>(8);
  // if the user guessed the thing or not
  const [guessed, setGuessed] = useState<boolean>(false);
  // the randomly generated number
  const [number, setNumber] = useState<number>(0);
  // the guess that the player made
  const [numberGuess, setNumberGuess] = useState<string>("")
  const [message, setMessage] = useState<string>("");
  // the maximum of the generated number, changes on difficulty
  const [maxRandomNumber, setMaxRandomNumber] = useState<number>(100);
  // if the player failed or not
  const [ded, setded] = useState<boolean>(false);
  const [tried, settried] = useState<number>(0);
  
  // generates a random number https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  const getRandomInteger = (): number => {
    return Math.floor(Math.random() * maxRandomNumber) + 1; // 1 - maxRandomNumber
  };
  
  const generateNumber = () => {
    const newNumber = getRandomInteger();
    setNumber(newNumber);
    console.log(newNumber);
  };
  // when the input changes
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setNumberGuess(v);
    console.log(v); 
  };
  // reloads the page
  const button2submitCallback = () => {
    clickSound.play();
    window.location.reload();
  }
  // title screen button
  const button3submitCallback = () => {
    clickSound.play();
    router.push("/difficultySelect");
    
  }
  // goes to next difficulty
  const button4submitCallback = () => {
    clickSound.play();
    if (diff === "easy") router.push("/game?diff=medium");
    else if (diff === "medium") router.push("/game?diff=hard");
    else if (diff === "hard") router.push("/game?diff=expert");
    else if (diff === "expert") router.push("/game?diff=easy");
    window.location.reload();
  }
  // when the number is submitted
  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault();
    // parses the number
    const parsed = parseInt(numberGuess.trim(), 10);
    // if the number is not valid
    if (Number.isNaN(parsed)) {
      setMessage("Set a valid number!");
      return;
    }

    if (parsed === number) {
      winSound.play();
      setGuessed(true);
      return;
    }
    settried(tried + 1);
    const newLife = life - 1;
    setLife(newLife);
    
    if (newLife === 1) {
      WarningSound.play();
    } else {
      hurtSound.play();
    }
    if (parsed < number) {
      setMessage("Guess is smaller than the number!");
    } else {
      setMessage("Guess is bigger than the number!");
    }
    if (newLife <= 0) {
      deadSound.play();
      setded(true)
    }
  };

  useEffect(() => {
    if (diff === "easy") {
      setLife(12);
      setMaxRandomNumber(70);
    } else if (diff === "medium") {
      setLife(9);
      setMaxRandomNumber(100);  
    } else if (diff === "hard") {
      setLife(7);
      setMaxRandomNumber(100); 
    } else if (diff === "expert") {
      setLife(5);
      setMaxRandomNumber(85);
    }
  }, [diff]);

  useEffect(() => {
    generateNumber();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-cover bg-center bg-[url('/ressources/numberthing/bg.jpg')]  overflow-hidden">
      <MouseFollower lives={life} />
      {/* Main box */}
      <div className="mx-auto my-auto border-4 border-white rounded-[15px] w-[50vw] min-w-[400px] h-[35vw] min-h-[400px] bg-cover bg-center bg-[url('/ressources/numberthing/grass.png')] mt-[20vh] flex">
        <div className="mx-auto my-auto text-center">
          <p className="font-extrabold text-2xl text-white">
            Guess the number between 1 and {maxRandomNumber}
          </p>

          <form onSubmit={submitCallback} className="mt-[10px]">
            <input
              className="mt-2 w-[280px] h-[30px] rounded-[5px] border-[1px] hover:border-[2.5px] border-white text-white text-center hover:backdrop-blur-sm duration-500"
              type="text"
              id="myInput"
              value={numberGuess}
              onChange={onChange}
              disabled={ded}
            />
          </form>

          <button
            onClick={submitCallback}
            className="shadow-lg mx-auto mt-[10px] text-[20px] text-white border-[1.5px] rounded-[5px] p-1 px-4 hover:text-white duration-500 border-white hover:backdrop-blur-sm "
            disabled={ded}
          >
            Submit
          </button>

          {!guessed && (
            <p className="font-bold text-[20px] mt-[20px] text-black">
              {message}
            </p>
          )}
        </div>
      </div>
      {ded &&(
      <div className="absolute w-[100vw] h-[100vh] bg-black flex z-100 top-0">
        <div className="mx-auto my-auto grid">
          <p className="text-7xl font-extrabold text-red-600">You Died!</p>
          <p className="font-bold text-white pt-5">
            The number was: {number}
          </p>
          <button
          className="p-2 px-7  bg-gray-500 text-black font-bold rounded-[1px] hover:scale-105 duration-300 hover:bg-gray-400 w-[500px] mt-[30px] text-center"
          onClick={button2submitCallback}
          >
            Respawn
          </button>
          <button
          className="p-2 px-7  bg-gray-500 text-black font-bold rounded-[1px] hover:scale-105 duration-300 hover:bg-gray-400 w-[500px] mt-[40px] text-center"
          onClick={button3submitCallback}
          >
            Title Screen
          </button>
        </div>
      </div>
    )}
    {guessed &&(
      <div className="absolute w-[100vw] h-[100vh] bg-black flex z-100 top-0">
        <div className="mx-auto my-auto grid">
          <p className="text-7xl font-extrabold text-green-600">You Guessed It!</p>
          <p className="font-bold text-white pt-5">
            Congrats! You guessed the number {number} in {tried} tries!
          </p>
          <button
          className="p-2 px-7  bg-gray-500 text-black font-bold rounded-[1px] hover:scale-105 duration-300 hover:bg-gray-400 w-[500px] mt-[30px] text-center"
          onClick={button4submitCallback}
          >
            Next difficulty
          </button>
          <button
          className="p-2 px-7  bg-gray-500 text-black font-bold rounded-[1px] hover:scale-105 duration-300 hover:bg-gray-400 w-[500px] mt-[40px] text-center"
          onClick={button3submitCallback}
          >
            Title Screen
          </button>
        </div>
      </div>
    )}
    </div>
  );
}
