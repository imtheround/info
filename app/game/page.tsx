"use client";

import React, { useEffect, useState } from "react";
// for redirecting
import { useRouter, useSearchParams } from "next/navigation";
import MouseFollower from "../components/mousefollower";

export default function Page() {
  const searchParams = useSearchParams();
  const diff = searchParams.get("diff");
  const [life, setLife] = useState<number>(8);
  const [guessed, setGuessed] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const [numberGuess, setNumberGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [maxRandomNumber, setMaxRandomNumber] = useState<number>(100);
  const [ded, setded] = useState<boolean>(false);
  const router = useRouter();

  const getRandomInteger = (): number => {
    return Math.floor(Math.random() * maxRandomNumber) + 1; // 1 - maxRandomNumber
  };

  const generateNumber = () => {
    const newNumber = getRandomInteger();
    setNumber(newNumber);
    console.log(newNumber);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setNumberGuess(v);
    console.log(v); 
  };
  const button2submitCallback = () => {
    router.push("/difficultySelect");
  }
  const submitCallback = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = parseInt(numberGuess.trim(), 10);

    if (Number.isNaN(parsed)) {
      setMessage("Set a valid number!");
      return;
    }

    if (parsed === number) {
      setMessage("You guessed it!");
      setGuessed(true);
      generateNumber();
      setLife(8);
      setNumberGuess("");
      setTimeout(() => {
        router.push("/won?tried=" + String(8-life+1));
      },1000);
      return;
    }


    const newLife = life - 1;
    setLife(newLife);

    if (parsed < number) {
      setMessage("Guess is smaller than the number!");
    } else {
      setMessage("Guess is bigger than the number!");
    }

    if (newLife <= 0) {
      setded(true)
    }
  };

  useEffect(() => {
    if (diff === "easy") {
      setLife(12);
      setMaxRandomNumber(60);
    } else if (diff === "medium") {
      setLife(9);
      setMaxRandomNumber(100);  
    } else if (diff === "hard") {
      setLife(7);
      setMaxRandomNumber(100); 
    } else if (diff === "expert") {
      setLife(5);
      setMaxRandomNumber(80);
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
            className="mx-auto mt-[10px] text-[20px] text-white border-[1.5px] rounded-[5px] p-1 px-4 hover:text-white duration-500 border-white hover:backdrop-blur-sm"
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
      <div className="absolute w-[80vw] h-[80vh] bg-black flex top-10 left-1/10">
        <div className="mx-auto my-auto grid">
          <p className="text-7xl font-extrabold text-red-600">You Died!</p>
          <button
          className="p-2 px-7  bg-gray-500 text-black font-bold rounded-[1px] hover:scale-105 duration-300 hover:bg-gray-400 w-[500px] mt-[50px] text-center"
          onClick={button2submitCallback}
          >
            Respawn
          </button>
          <button
          className="p-2 px-7  bg-gray-500 text-black font-bold rounded-[1px] hover:scale-105 duration-300 hover:bg-gray-400 w-[500px] mt-[50px] text-center"
          onClick={button2submitCallback}
          >
            Title Screen
          </button>
        </div>
      </div>
    )}
    </div>
  );
}
