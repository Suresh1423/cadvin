import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Appbar } from './Appbar/Appbar'
import { AES, enc } from 'crypto-js'
import Home from './Home/Home'

export const fetchUser = ()=>{
  if (localStorage.getItem('user')) {
    const decrypted = AES.decrypt(localStorage.getItem('user'), 'SHIKSHAKPRO@2023ASAT');
    const decryptedObject = decrypted.toString(enc.Utf8);
    const user = JSON.parse(decryptedObject);
    return user;
  }
}
export const authenticateUser = ()=>{
  if (localStorage.getItem('user')) {
    const decrypted = AES.decrypt(localStorage.getItem('user'), 'SHIKSHAKPRO@2023ASAT');
    const decryptedObject = decrypted.toString(enc.Utf8);
    const user = JSON.parse(decryptedObject);
    return true;
  }
}

const Layout = () => {
  return (
    <>
    {
      authenticateUser()? 
      <>
        <Appbar/>
        <Outlet/>
      </>
      :
      <>
        {/* <Appbar/> */}
        <Home/>
      </>
    }
    </>
  )
}

export default Layout
