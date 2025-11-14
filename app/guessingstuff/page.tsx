"use client";

import React, { useEffect, useState } from "react";
// for redirecting
import { useRouter } from "next/navigation";

export default function Page() {
  const [life, setLife] = useState<number>(8);
  const [guessed, setGuessed] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(0);
  const [numberGuess, setNumberGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const getRandomInteger = (): number => {
    return Math.floor(Math.random() * 100) + 1; // 1 - 100
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
      setTimeout(() => {
        router.push("/won?tried=" + encodeURIComponent(numberGuess));
      });
    }
  };

  useEffect(() => {
    generateNumber();
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-cover bg-center bg-[url('/ressources/numberthing/bg.jpg')]  overflow-hidden">
      {/* Main box */}
      <div className="mx-auto my-auto border-4 border-white rounded-[10px] w-[35vw] min-w-[400px] h-[35vh] min-h-[300px] bg-cover bg-center bg-[url('/ressources/numberthing/grass.png')] mt-[20vh]">
        <div className="mx-auto mt-[20px] text-center">
          <p className="font-extrabold text-2xl text-white">
            Guess the number between 1 and 100
          </p>

          <form onSubmit={submitCallback} className="mt-[10px]">
            <input
              className="mt-2 w-[280px] h-[30px] rounded-[5px] border-[1px] hover:border-[2.5px] border-white text-white text-center hover:backdrop-blur-sm duration-500"
              type="text"
              id="myInput"
              value={numberGuess}
              onChange={onChange}
            />
          </form>

          <button
            onClick={submitCallback}
            className="mx-auto mt-[10px] text-[20px] text-white border-[1.5px] rounded-[5px] p-1 px-4 hover:text-white duration-500 border-white hover:backdrop-blur-sm"
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

      {/* Lives */}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: life }).map((_, i) => (
          <div
            key={i}
            className="bg-[url('/ressources/numberthing/burgy.png')] bg-contain bg-no-repeat h-[120px] w-[150px]"
          />
        ))}
      </div>
    </div>
  );
}
