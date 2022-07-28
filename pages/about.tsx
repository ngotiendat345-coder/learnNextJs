/* eslint-disable react/display-name */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import React, { useEffect, useImperativeHandle, useRef } from 'react'
// import Header from './components/common/header';
// import Header from '@/components/common/header';
const Header = dynamic(() => import('./components/common/header'), {ssr: false});
type AboutProps = {}

// const Child = React.forwardRef((props, ref):any => {
//     // const [text, setText] = React.useState("");
//     // const [number, setNumber] = React.useState(1);
  
//     // const handleChange = (event:any) => {
//     //   setText(event.target.value);
//     // };
  
//     // useImperativeHandle(ref, () => ({
//     //   incrseaseNumber: () => setNumber(number + 1),
//     //   returnText: () => text,
//     // }));
  
//     return (
//       <div>
//         <h2 ref={ref as any} />
//       </div>
//     );
//   });
const Timer= React.forwardRef((props, ref):any => {
    return(
        <div style={{display:'flex'}}>
            <span>Time Count:</span> <h2 ref={ref as any}/>
        </div>
    )
})
const Input = React.forwardRef((props, ref):any => {
    return(
        <input type="text" ref={ref as any}/>
    )
})
export default function About(props: AboutProps) {
    const router = useRouter();
    const timeRef = useRef<any>();
    const countRef = useRef<any>(0);
    const textRef = useRef<any>();
    const inputRef = useRef<any>();
    // const [postList, setPostList] = React.useState<any[]>([]);
    // console.log('About query', router.query);
    // const page = Number(router.query?.page ?? 1);
    // const [count,setCount] = React.useState<number>(0);
    // const count = React.useRef<any>();
    // useEffect(()=>{
    //     if(!router.query?.page) return;
        // (async()=>{
        //     const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
        //     const data  = await response.json();
        //     setPostList(data.data);
        // })()
    // }, [page])
    const handleNextClick=()=>{
        // router.push({
        //     pathname: '/about',
        //     query: {
        //         page: page + 1
        //     }
        // });
        // console.log('count', count);
        // if(count.current){
        //     count.current.innerHTML = Number(count.current.textContent) + 1;
        // }
        
    }
    const start=()=>{
        if(timeRef.current){
            clearInterval(timeRef.current);
        }
        timeRef.current = setInterval(()=>{
            if(textRef.current){
                countRef.current += 1;
                const hour= Math.floor(countRef.current / 60);
                const minus = countRef.current - (hour*60);
                textRef.current.innerHTML = `${hour}:${minus}`;
            }
        }, 1000);
    }   
    const pause=()=>{
        clearInterval(timeRef.current);
    }
    const replaceData=()=>{
        if(inputRef.current){
            const inputText = Number(inputRef.current.value);
            console.log('inputRef', inputRef);
            console.log('inputText', inputText);
            countRef.current = inputText;
            start();
        }
    }
    return (
    <div>
        <h1>About</h1>
        <div>
        <Input ref={inputRef} />
        <button type="button" onClick={replaceData}>Replace</button>
        </div>
        <Header />
        <Timer ref={textRef} />
        {/* <Child ref={count} /> */}
        <button type="button" onClick={start}>Start</button>
        <button type="button" onClick={pause}>Pause</button>
    </div>
  )
}

export async function getServerSideProps(){
    return {
        props: {}
    }
}