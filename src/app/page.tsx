'use client';
import { useEffect, useState } from "react";

export default function Home() {
  
  const [qIndex, setQindex] = useState(0);
  const [map, setMap ] = useState(0);
  const [finalMix, setFinalMix] = useState([])
  const [done, setDone] = useState(false);
  const [text, setText] = useState("NEXT");
  const [score, setScore] = useState(0);
  //SAVING STATE SO WHEN GOING BACK IN QUIZ IT SHOWS WHAT ANSWERS THE USER PICKED PREVIOUSLY
  const [userAnswers, setUserAnswers] = useState({});
  //VALIDATING IF USER HAS CLICKED A ANSWER SO THAT LOGIC CAN MOVE FORWARD TO NEXT QUESTION
  const [clicked, setClicked] = useState({});
  const [message, setMessage] = useState("");
  const questions =[
    'What is the largest country in the world by land area?',
    'Which country has the most official languages?',
    'What is the only country that is also a continent?',
    'Which country is home to the Great Pyramid of Giza?',
    'In which country would you find the city of Kyoto?',
    'What country has the most people in the world?',
    'Which European country is famous for inventing pizza and pasta?',
    'What is the smallest country in the world by land area and population?',
    'Which South American country is known for the Amazon Rainforest?',
    'Which country has the Union Jack as part of its flag, besides the UK?',
  ]

  
//asigning each question to its own index
  const currentQuestion = questions[qIndex];
  
  //rendering possible answers
  const answers = [
['Russia', 'Canada', 'China', 'United States'],
['Bolivia', 'India', 'South Africa', 'Switzerland'],
['Australia', 'Greenland', 'Antarctica', 'Indonesia'],
['Egypt', 'Morocco', 'Iraq', 'Turkey'],
['Japan', 'China', 'South Korea', 'Thailand'],
['India', 'China', 'USA', 'Indonesia'],
['Italy', 'France', 'Spain', 'Germany'],
['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'],
['Brazil', 'Colombia', 'Peru', 'Argentina'],
['Australia', 'New Zealand', 'Fiji', 'Canada'],
 ]

 //correct answers to compare answers
 const correctAnswers = [
  'Russia',
  'Bolivia',
  'Australia',
  'Egypt',
  'Japan',
  'India',
  'Italy',
  'Vatican City',
  'Brazil',
  'Australia'
 ]

const currentA = answers[qIndex];


 useEffect(() => {
    if (!currentA) return;
  const mixedQ = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while(currentIndex != 0){
       randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //swaping elements
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

    return array;

  }

      setFinalMix(mixedQ([...currentA]));
  
 }, [qIndex] )

//handling click on answer
const handleAnswer = (event) => {
 const selectedAnswer = event.target.textContent;
  if(selectedAnswer === correctAnswers[qIndex]){
   setScore(score+1);
         
    
  }
  setClicked((prev) => ({
    ...prev,
    [qIndex]:selectedAnswer
  }))

setUserAnswers((prev) => ({
  ...prev,
  [qIndex]: selectedAnswer
}));

}



//mapping
 // Button color logic:
      // If this is the clicked answer:
      //   ✅ Correct → green
      //   ❌ Incorrect → black
      // Else (not clicked) → blue2
const currentAnswers = finalMix.map((answer) => 
      <button className={`w-120 h-20 col-span-1 rounded-full text-white  text-2xl ${
         userAnswers[qIndex] === answer? answer === correctAnswers[qIndex]? 'bg-green-500' : 'bg-red-500'  : 'bg-blue2'
      }`} onClick={handleAnswer} key={answer}>
    {answer}
  </button>


)


  

  const nextQuestion = () => {
    if(qIndex < 9 && clicked[qIndex] != undefined)
    {
      setQindex(qIndex+1);
     setMap(map+1)
   

    }
    if(qIndex == 8 ){
      setText("DONE?")
    }
      if(qIndex == 9){
        alert(score)
        setDone(true)
        if(score <= 5){
          setMessage("BETTER LUCK NEXT TIME!")

        }
        if(score > 5 && score < 8){
          setMessage("NOT TOO BAD!")
        }
        if(score == 9){
          setMessage("VERY GOOD!")
        }
        if(score == 10){
          setMessage("PERFECT!")
        }


      }
      

    }


    const prevQuestion = () => {
      if(qIndex > 0){
        setQindex(qIndex-1);
        setMap(map-1)
      }
      if(qIndex <= 9){
        setText('NEXT')
      
      }
      

  }
  
   
           let bgClass = '';

        if (score <= 5) {
        bgClass = 'bg-[url(./img/POOR.png)]';
          } else if (score > 5 && score < 8) {
            bgClass = 'bg-[url(./img/BETTER.png)]';
            } else if (score === 9) {
              bgClass = 'bg-[url(./img/GOOD.png)] ';
              } else {
                bgClass = 'bg-[url(./img/BEST.png)]';
                        }
     
     
  return(
    <>
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url(./img/background.png)] ">
      {/* navbar */}
    {/* <div className="w-full h-30 flex justify-center p-5">
      <h1 className="text-5xl text-black">MindMeld</h1>
    </div> */}
    <div className="flex pt-20">
       <div className="flex h-200 w-[40%]">
      {/* left */}
        <div className="w-150 h-full bg-cover bg-center bg-no-repeat bg-[url(./img/man.png)] ml-30">
        </div>
    </div>

      {/* right */}
      {!done && 
       <div className="h-200 w-[60%] ">
    <div className="w-full h-30  flex justify-center items-center">
   <div className="w-[70%] h-20 text-white rounded-full flex justify-center items-center bg-blue1">
    <h1 className=" text-4xl">QUESTION {qIndex + 1} OF 10</h1>
    </div>
    </div>
      <div className="w-280 h-120  p-5 flex flex-col items-center rounded-lg text-black" >
        {/* questions */}
          <h1 className="text-center text-5xl"> {currentQuestion}</h1>
        <div className="grid gap-4  grid-cols-2 mt-15 ">
              {currentAnswers} 
        </div>
     
          <br />
          <div className="flex justify-between w-full mt-10">
            <button  className="w-45 h-20 bg-black text-black h-10 rounded-xl mt-10  bg-blue2  ml-50  text-white text-xl" onClick={prevQuestion}> PREVIOUS </button>
          <button className="w-45 h-20  bg-black text-black h-10 rounded-xl mt-10  bg-blue2 mr-50  text-white text-xl" onClick={nextQuestion}>{text}</button>
          </div>
          
      </div> 
    
</div>
      }

      {/* when done state is true this will show */}
      {done && 
      <div className="w-[60%] h-200 flex flex-row ">
        {/* left */}
        <div className="w-[50%] h-150 text-black flex flex-col items-center justify-center">
        <h1 className="text-7xl text-center">{message}</h1>
        <p className="text-center text-5xl mt-10 mb-10">SCORE: {score}</p>
        <button onClick={() => window.location.reload()} className="w-45 h-20  bg-black text-black h-10 rounded-xl mt-5  bg-blue2  text-white text-xl">TRY AGAIN</button>
        </div>
        {/* right */}
        <div className="w-[50%]  h-150 flex flex-col  justify-center items-center">
          <div className={`${bgClass}  w-150 h-250 bg-center bg-cover bg-no-repeat`} ></div>
        </div>
       
      </div>
      }

    </div>
   



   

  </div>
    

{/*     
    <div className="w-full h-30 flex justify-center ">
   <div className="w-[70%] h-20 text-white rounded-full flex justify-center items-center bg-blue1">
    <h1 className=" text-4xl">SCORE:0</h1>
    </div>
    </div>
    <div className="w-full h-full justify-center flex text-white ">
      <div className="w-[70%] h-120  p-5 flex flex-col items-center rounded-lg bg-blue1" >
        {/* questions */}
          {/* <h1 className="text-center text-3xl">Question {qIndex+1} : {currentQuestion}</h1>
        <div className="grid gap-4  grid-cols-2 mt-10 ">
              {currentAnswers} 
        </div>
     
          <br />
          <div className="flex ">
            <button className="w-50 bg-black text-black h-10 rounded-full mt-10 mr-2 bg-blue2 border-1 " onClick={prevQuestion}>Previous</button>
          <button className="w-50 bg-black text-black h-10 rounded-full mt-10 mr-2 bg-blue2 border-1" onClick={nextQuestion}>Next</button>
          </div>
          
      </div> */}
    {/* </div> */} 
 
    </>
  )
}
