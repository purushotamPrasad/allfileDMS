'use client'
import React,{useEffect} from 'react'
import { useGlobalContext } from '@/app/Context/store';

function Utilities() {
  const {setActiveTab}=useGlobalContext();
  useEffect(() => {
    setActiveTab("")
  }, [setActiveTab])
  return (
    <div>Utilities</div>
  )
}

export default Utilities