"use client"
import { useState } from "react"

export default function Home(){
  const [clickedHTML, SetClickedHtml] = useState(false)
  const [clickedVideo, SetClickedVideo] = useState(false)
  const DisplayProgramming = () => {
    if (clickedHTML) {
      SetClickedHtml(false)
      
    } else{
    SetClickedHtml(true)
  }}
  const DisplayVideo = () =>{
  if (clickedVideo) {
    SetClickedVideo(false)
  } else{
    SetClickedVideo(true)
  }}
  return(
<div className=" bg-pink-700 w-[100vw] h-[200vh]">
  <div className="w-full flex">
    <h1 className="pt-5 text-4xl mx-auto">
      Introduction aux language HTML, CSS et Javascript
    </h1>
  </div>
  <div className="mx-auto w-full ">
    <div className="mx-auto w-[700px] bg-amber-200 border-2 border-black  h-[500px] mt-[5vh] ">
      <div className="w-[600px] h-[50px] mx-auto mt-6 text-center text-3xl">
        Menu
      </div>
      <div className="w-[600px] h-[50px] bg-amber-700 hover:bg-amber-900 border-2 border-black mx-auto mt-6 text-center" >
        <a href="/acceuil">
          <h1 className="text-[20px] mt-[8px]">Acceuil</h1>
        </a>
      </div>
      <div className="w-[600px] h-[50px] bg-amber-700 hover:bg-amber-900 border-2 border-black mx-auto mt-6 text-center"onClick={DisplayProgramming}>
          <h1 className="text-[20px] mt-[8px]">HTML</h1>
      </div>
      <div className="w-[600px] h-[50px] bg-amber-700 hover:bg-amber-900 border-2 border-black mx-auto mt-6 text-center">
        <a href="/css">
          <h1 className="text-[20px] mt-[8px]">CSS</h1>
        </a>
      </div>
      <div className="w-[600px] h-[50px] bg-amber-700 hover:bg-amber-900 border-2 border-black mx-auto mt-6 text-center"onClick={DisplayVideo}>

          <h1 className="text-[20px] mt-[8px]">Video</h1>

      </div>
      <div className="w-[600px] h-[50px] bg-amber-700 hover:bg-amber-900 border-2 border-black mx-auto mt-6 text-center">
        <a href="/javascript">
          <h1 className="text-[20px] mt-[8px]">Javascript</h1>
        </a>
      </div>
    </div>{clickedHTML &&
      <div className="w-[700px] h-[500px] border-2 border-black mt-[10vh] mx-auto grid  font-extrabold bg-amber-200">
        <h1 className="h-[80px] text-4xl mt-4 mx-auto">Programmation HTML</h1>
        <div className="p-3 grid h-full">
        <p><span className="text-red-500">Lorem ipsum dolor, sit amet consectetur</span> adipisicing elit. Iste asperiores exercitationem quibusdam cum, alias voluptas. Repudiandae earum rem explicabo quia soluta numquam, laudantium ratione distinctio repellendus! Numquam facere asperiores tenetur?</p>

        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima ipsa dignissimos eius, doloribus facilis nam laboriosam dicta, dolor dolorem, accusamus voluptatibus illum at amet rerum. Voluptatibus, possimus praesentium ex animi reprehenderit molestias culpa modi similique aspernatur magnam sunt, enim repellat facilis, maiores neque sit harum aut soluta suscipit eius. Veniam eum inventore ipsum.</p>

        <ol className="text-blue-500 list-disc ml-5">
            <li>tkjgfnklgewrgm</li>
            <li>rkjnvd</li>
            <li>ked</li>
        </ol>
        </div>
    </div>}
    {clickedVideo &&
    <iframe className="w-[560px] h-[315] mx-auto mt-[10vh]" src="https://www.youtube.com/embed/pKh5fNuj2-w?si=0FNl1htLPg9X5VV3"></iframe>}
  </div>
</div>
  )
}

  
