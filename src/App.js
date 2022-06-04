import './App.css';
import {useEffect, useRef, useState} from 'react'
import QuestionPage from '../src/Components/QuestionPage'
import {questions,answers,options} from '../src/Constants/dataForQuiz'

function App() {
  const [pageResize, setPageReSize] = useState(0)
  const numberOfRenders = useRef(0)


  useEffect(()=>
  {
    window.addEventListener("resize",reRenderPage)
    return ()=>{
      window.removeEventListener("resize",reRenderPage)
    }
  },[])

  const reRenderPage = () => {
    setPageReSize(pageResize =>  pageResize + 1)
  }

  useEffect(()=>{
   // console.log(numberOfRenders.current ++)
  })

  return (
    <div className="App">
      <QuestionPage questions={questions} answers={answers} options={options} />
    </div>
  );
}

export default App;
