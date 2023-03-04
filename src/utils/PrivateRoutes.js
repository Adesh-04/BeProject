import React from 'react'
import cookie from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    // let mvar = false
    // let x = document.cookie.loginToken
    // function updatemvar(){
        
    // }

    // let auth = {'token':mvar}
    let x = true
    let auth = document.cookie.loginToken
  return (
    <div>
      x ? <Outlet/> : <Navigate to="/form"/>
    </div>
  )
}

export default PrivateRoutes
