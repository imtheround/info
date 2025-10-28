// the component for the html
'use client';
import { useSearchParams } from 'next/navigation';

export default function Registered() {
  //gets name from url
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="bg-black w-[100vw] h-[100vh] flex">
      <h1 className="text-white text-[30px] mx-auto font-bold  my-auto">
        Hi {name}. You are now registered!
      </h1>
    </div>
  );
}
