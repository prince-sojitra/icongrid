import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { useState } from 'react';

const UserLayoutWithout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      
    </>
  )
}

export default UserLayoutWithout