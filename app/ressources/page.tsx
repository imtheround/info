export default function Home(){
  return(
 <div className=" bg-pink-700 w-[100vw] flex">
  <div className="mx-auto w-full grid">
    <h1 className="text-4xl font-bold text-white mx-auto  pt-[5vh] flex bg-pink-700">
      Ressources documentaires
    </h1>
    <div className="flex pt-[12vh] w-full">
      <h1 className="mx-auto text-3xl">W3 school</h1>
    </div>
    <div className="flex pt-[5vh] w-[50vw] mx-auto">
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://www.w3schools.com/html/default.asp">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Section HTML
        </h1>
        </a>
      </div>
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://www.w3schools.com/css/default.asp">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Section css
        </h1>
        </a>
      </div>
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://www.w3schools.com/js/default.asp">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Section Javascript
        </h1>
        </a>
      </div>
    </div>
    <div className="flex pt-[10vh] w-full">
      <h1 className="mx-auto text-3xl">Developper Mozilla</h1>
    </div>
    <div className="flex pt-[5vh] w-[50vw] mx-auto">
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://developer.mozilla.org/fr/docs/Web/HTML">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Section HTML
        </h1>
        </a>
      </div>
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://developer.mozilla.org/fr/docs/Web/CSS">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Section css
        </h1>
        </a>
      </div>
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://developer.mozilla.org/fr/docs/Web/JavaScript">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Section Javascript
        </h1>
        </a>
      </div>
    </div>
    <div className="flex pt-[8vh] w-full">
      <h1 className="mx-auto text-3xl">Video</h1>
    </div>
    <div className="flex pt-[5vh] w-[50vw] mx-auto">
      <div className="w-[300px] h-[100px] bg-pink-900 z-10 border-6 border-black mx-auto">
        <a href="https://www.youtube.com/">
        <h1 className="text-pink-500 text-2xl text-center pt-[30px]">
          Video
        </h1>
        </a>
      </div>
     
    </div>
  </div>
</div>

  )
}