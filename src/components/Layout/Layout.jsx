import { useState, useEffect } from "react"
import Style from './TemaplateName.module.css'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer"
import { Outlet } from "react-router-dom";

export default function Layout() {
  
    return (
    <>
    <Navbar/>

    <div className="max-w-screen-xl mx-auto">
    <div className="mb-4">
    <Outlet/>
    </div>

    <Footer/>
    </div>


    </>
  )
}
