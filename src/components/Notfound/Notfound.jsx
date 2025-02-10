import { useState, useEffect } from "react"
import Style from './TemaplateName.module.css'

export default function Notfound() {
    const [testString, setTestString] = useState("hiiiii");
    useEffect(()=>{} , []);
  
    return (
    <div>
      <h2 className={`${Style['bg-tomato']}`}>not found Component</h2>
      <p>{testString}Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea cumque, obcaecati voluptatibus ipsam omnis ut corrupti temporibus. Rem quibusdam ex illum! Aut, molestiae. Excepturi labore ducimus esse, magnam obcaecati aperiam.</p>
    </div>
  )
}
