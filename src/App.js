import './App.css';
import Story from './components/Story'
import Particles from 'react-particles-js'
import {useState, useRef, useEffect} from 'react'
import MediaQuery from 'react-responsive'

console.log = function() {} //disable all console log

function App() {

  const [userInteracted,setUserInt] = useState(false)
  const speedRef = useRef('')
  const [speed,setSpeed] = useState(20)
  const [cookieInfo,setCookieInfo] = useState(true)

  
  
  const btnClick = () => {
    setSpeed(parseInt(speedRef.current.value))
    setUserInt(true)
  }

  useEffect(()=>{
    //setTimeout(()=>{setCookieInfo(false)},1000*30)
  }
  ,[])

  return (
    <div className="App">
      <MediaQuery orientation='landscape'>
       <Particles
            style={{ position: "absolute" }}
            height= "50%"
            width="100%"
            params={{
              particles: {
              shape: {
                type: 'images',
                image: [{src: 'test.jpg'},{src: 'test2.png'},{src: 'test3.png'}, {src: 'test4.png'}, {src: 'test5.png'}]
              },
              line_linked: {
                  enable: false
              },
              number: {
                  value: 10
              },
              size: {
                  value: 20
              },
              opacity: {
                value: 0.8
              },
              move: {
                speed: 0.5
              }
          }
      }}
      />
      {!userInteracted && <div className="divD">
        <select className="form-select form-select-lg mb-3 btnD" aria-label=".form-select-lg" ref={speedRef}>
          <option value="20">Reading Speed</option>
          <option value="40">Slow</option>
          <option value="20">Medium</option>
          <option value="10">Fast</option>
        </select>
          <br/>
        <button  className="btn btn-dark btnD" onClick={btnClick}>Experience</button>
        {cookieInfo && <div className="cookieInfo text-white"><hr/>We use cookies so you can continue from where you left.</div>}
        </div>
      }
      {userInteracted &&  <Story rSpeed={speed}/> }
      </MediaQuery>
      <MediaQuery orientation='portrait'>
      <Particles
            style={{ position: "absolute" }}
            height= "50%"
            width="100%"
            params={{
              particles: {
              shape: {
                type: 'images',
                image: [{src: 'test.jpg'},{src: 'test2.png'},{src: 'test3.png'}, {src: 'test4.png'},{src: 'test3.png'}]
              },
              line_linked: {
                  enable: false
              },
              number: {
                  value: 3
              },
              size: {
                  value: 15
              },
              opacity: {
                value: 0.5
              },
              move: {
                speed: 0.5
              }
          }
      }}
      />
       {!userInteracted && <div className="divM">
        <select className="form-select form-select-sm sm-3 btnM" aria-label=".form-select-sm" ref={speedRef}>
          <option value="20">Reading Speed</option>
          <option value="40">Slow</option>
          <option value="20">Medium</option>
          <option value="10">Fast</option>
        </select>
        <br/>
        <button  className="btn btn-dark btnM" onClick={btnClick}>Experience</button>
        {cookieInfo && <div className="cookieInfo text-white"><hr/>We use cookies so you can continue from where you left.</div>}
        </div>
      }
      {userInteracted &&  <Story rSpeed={speed}/> }
      </MediaQuery>
    </div>
  );
}

export default App;
