import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
   
    <>
    {/* navbar */}
    <div className="w-full h-30 bg-gray flex justify-center p-5">
      <h1 className="text-5xl">MindMeld</h1>
    </div>
    {/* start btn */}
    <div  className="flex justify-center ">
      {/* left card */}
    <div className="w-100 h-100 bg-white flex flex-col justify-center items-center rounded-lg">
    <h2 className="text-2xl pb-10 text-black">Simple Country Quiz</h2>
    <button  className="bg-black text-white rounded-lg p-2 h-10 w-30"> <Link href={"/questions"}>Start Quiz</Link> </button>
    </div>
    {/* right card */}
      <div className="w-100 h-100 bg-black rounded-lg ml-20 pl-5 pr-5">
        <h2 className="text-2xl text-center pt-5">Quiz Information</h2>
        <p className="pt-5 text-center">This quiz will contain random questions about various countries.</p>
        <h3 className="text-xl text-center pt-5"> Specification</h3>
        <ul className="list-disc pl-5 pt-5">
        <li>Time: 20Min</li>
        <li>Length: 20 Questions</li>
        <li>Genre: Countries</li>
        <li>Question Type: Multiple Choice</li>
        </ul>
      </div>
    </div>
    </>
  );
}
