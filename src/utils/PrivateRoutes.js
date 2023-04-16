import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    let auth = document.cookie
  return (
      auth.loginToken ? <Outlet/> : <Navigate to="/form"/>
  )
}

export default PrivateRoutes
