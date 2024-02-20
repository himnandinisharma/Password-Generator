import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
   
const [length, setLength] = useState(8)
const [numAllow, setNumAllow] = useState(false)
const [charAllow,setCharAllow] = useState(false)
const [password,setPassword] = useState("")

const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

if (numAllow) str += "0123456789"
if(charAllow) str += "@$#*."

for (let i = 0; i <=length; i++) {
  let char = Math.floor(Math.random() * str.length + 1)

  pass += str.charAt(char)
  
}
setPassword(pass)
} , [length,numAllow,charAllow,setPassword])

const copyPasswordToClipBoard = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordGenerator()
}, [length,numAllow,charAllow,passwordGenerator])

  return (
    <>
      
    <h1 className=' text-4xl text-center'>Password Generator</h1>
  <div className='w-full h-44 max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-800 bg-violet-500'>
    
    <h1 className='text-white text-center my-5'>Password Generator</h1>
    
    <div className=' className= " flex shadow rounded-lg overflow-hidden mb-4"'>
      <input type="text" 
      value={password} 
      className=' outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef} />
      <button onClick={copyPasswordToClipBoard}
      className=' outline-none bg-gray-500 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
     
     <div className=' flex text-sm gap-x-2 mt-4'>
        <div className=' flex items-center gap-x-1'>
          <input type="range"
            min={6}
            max={100}
            value={length}
            className=' cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
           />
           <label className=' text-white'>Length : {length}</label>
        </div>
        
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numAllow}
           id="numberInput"
           onChange={()=>{
            setNumAllow((prev) => !prev);
           }} />
           <label className=' text-white'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllow}
           id="charInput"
           onChange={()=>{
            setCharAllow((prev) => !prev);
           }} />
           <label className=' text-white'> Special Charaters</label>
        </div>

     
      </div>

    </div>
    </>
  )
}

export default App
