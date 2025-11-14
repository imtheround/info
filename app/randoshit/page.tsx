'use client';

import { useState } from "react";
export default function Page() {
   
  return (
    <div className="h-[100vh] w-[100vw] relative bg-black">
        <div className="w-[100px] h-[100px] bg-[pink] absolute right-0"></div>
        <div className="w-[100px] h-[100px] bg-[red] absolute ml-[200px] mt-[100px]"></div>
        <div className="w-[100px] h-[100px] bg-[#00ff62] absolute bottom-0 ml-[50VW]"></div>
    </div>
  )
}
