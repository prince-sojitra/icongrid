import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { useState } from 'react';

const UserLayout = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}

export default UserLayout