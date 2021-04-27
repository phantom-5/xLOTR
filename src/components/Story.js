import '../App.css';
import {useEffect,useState,useRef} from 'react'
import MediaQuery from 'react-responsive'
import Typed from 'typed.js'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import Loading from './Loading'

console.log = function() {} //disable all console.log

const Story = (props) => {

    const [audio] = useState( typeof Audio !== "undefined" && new Audio("https://xlotr.herokuapp.com//stream/audio")); 
    const [isLoading,setIsLoading]  = useState(true)
    var userHistoryCount = 0
    const cookie = new Cookies()

    const cookie_data = cookie.get('lotrexp')
    
    const loading = () => {
        setIsLoading(false)
    }

    const userHistory = () => {
        userHistoryCount+=1
        let book_id = 'lotr'
        if (!cookie_data){
        let newCookieData = {}
        newCookieData[book_id]=userHistoryCount
        cookie.set('lotrexp',newCookieData,{path:'/'})
        }else{
            cookie_data[book_id]=userHistoryCount
            cookie.set('lotrexp',cookie_data,{path:'/'})
        }
        console.log(cookie.get('lotrexp'))
    }
    
    const getStory = async() => {

        console.log('lotr')

        const response = await fetch('https://xlotr.herokuapp.com//book',{
            method:'GET',
            mode:'cors',
            headers: {
                'Content-Type':'application/json'
            }
        })

        const res = await response.json()
        let paras = res.data
        
        const options = {
            strings: paras.slice(userHistoryCount,paras.length),
            typeSpeed: props.rSpeed,
            fadeOut:true,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 500,
            loop: false,
            showCursor: false,
            onStringTyped: userHistory,
            preStringTyped: loading
        }

        var typed = new Typed('#typedItem', options)
        audio.loop = true
        audio.play()

        var storySection = document.querySelector('.d-flex')
        var scrollInterval = setInterval( () => { 
        console.log('scroll height',storySection.scrollHeight)
        window.scrollTo({ left: 0, top:storySection.scrollHeight-window.innerHeight+150, behavior: "smooth" })
        }, 500);



    //  console.log('The whole book is',whole_book)

    }

    const checkStart = async() => {
        if (cookie_data){
            if(cookie_data['lotr']){
                var swalRes = await Swal.fire({
                    icon: 'info',
                    title: 'Welcome back!',
                    text: 'Do you want to continue from where you left ?',
                    showConfirmButton: true,
                    showDenyButton: true,
                    confirmButtonText: 'Continue',
                    denyButtonText: 'Start Over'

                  })

            }
            if (!swalRes){return getStory()}
            if(swalRes.isConfirmed){
                userHistoryCount = cookie_data['lotr']
                getStory()
            }else{
                cookie_data['lotr']=0
                cookie.set('lotrexp',cookie_data,{path:'/'})
                getStory()
            }
            
        }else{
            return getStory()
        }
    }

    useEffect(()=>{checkStart()},[])

    return (
        <div>
        <MediaQuery orientation='landscape'>
        <div className="d-flex flex-column bd-highlight justify-content-center storyD flex-wrap w-50 flexD bg-white">
            <div className="p-2">
                <p className='lead' id='typedItem'></p>
                <p className='lead'>{isLoading && <Loading/>}</p>
            </div>
        </div>
        
        </MediaQuery>
        <MediaQuery orientation='portrait'>
        <div className="d-flex flex-row bd-highlight m-5 justify-content-center storyM bg-white">
            <div className="p-2">
                <p className='lead' id='typedItem'></p>
                <p className='lead'>{isLoading && <Loading/>}</p>
            </div>
        </div>
      </MediaQuery>
      </div>
    )
   
}

export default Story