import '../CSS/questionPage.css';
import React, {useEffect, useRef, useState} from 'react'


function QuestionPage({questions, answers, options}) {
  const [queNumber, setQueNumber] = useState(0)
  const [timerSec, applyCountDown] = useState(30)
  const Timer = useRef(null)
  const useEffectOnce = useRef(true)
  const [ans, setAns] = useState(false)
  const [ansDetails, setAnsDetails] = useState({})

  useEffect(()=>{
    if(useEffectOnce.current){
        startTimer()
        useEffectOnce.current = false
    }
  },[])

  const startTimer = () =>{
    Timer.current = setInterval(()=>{
        applyCountDown(timerSec => timerSec - 1)
    },1000)
  }

  useEffect(()=>{
    if(timerSec === 0){
        clearInterval(Timer.current)
        if(!ans){
            setQueNumber(queNumber => queNumber + 1)
            applyCountDown(30)
            startTimer()
        }
    }
       
  }, [timerSec])


 const provideOptionDetails = (indexOption, queNumber, item) =>{
     setAns(true)
     setAnsDetails({indexOption: indexOption,
                    queNumber: queNumber,
                    item: item})
 }

useEffect(()=>{
const { indexOption, queNumber, item} = ansDetails
if(answers[queNumber] === indexOption){
    let el = document.getElementById(item + indexOption);
    console.log(el)
    if(!!el)
    el.style.backgroundColor = "green"
 }
 else{
    let el = document.getElementById(item + indexOption)
    console.log(el)
    if(!!el)
     el.style.backgroundColor = 'red'
 }
 setTimeout(()=>{
     setQueNumber(queNumber=>queNumber+1)
     applyCountDown(30)
     startTimer()
 },1500)

},[ans])

  return (
    <div className="container">
        <p className='heading-skill-quiz'>Quiz App</p>


        <div className='question-block flex-r'>
             <div className='flex-r'>
               <p>Question</p>&nbsp;&nbsp;<p>{Number(queNumber+1)}/{!!questions.length && questions.length}</p>
             </div>
             <div className='timer-block flex-r'>
                <p>Time Left 0:</p>
                <p>{timerSec}</p>
             </div>
        </div>

        <div className='data-block flex-r'>
            <div className='questionText'>
                {!!questions && !!questions[queNumber] && questions[queNumber]["que"]}
            </div>
            <div className='optionsBlock'>
                {!!options && 
                   options[queNumber].map((item, index)=>{
                       return(
                           <div id={item+index} onClick={() => {provideOptionDetails(index, queNumber, item)}} key={index} className='options'>
                               {item}
                            </div>
                       )
                   })
                }
            </div>
        </div>

    </div>
  );
}

export default QuestionPage;
