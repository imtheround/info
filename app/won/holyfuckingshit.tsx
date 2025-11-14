// the component for the html
'use client';
import { useSearchParams } from 'next/navigation';

export default function holyfuckingshit() {
  //gets from url
  const searchParams = useSearchParams();
  const tried = searchParams.get("tried");

  return (
    <div className="bg-black w-[100vw] h-[100vh] flex">
      <h1 className="text-white text-[30px] mx-auto font-bold  my-auto">
        Congrates! You found the number in {tried} tries.
      </h1>
    </div>
  );
}
