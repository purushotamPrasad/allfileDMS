'use client'
import React,{useEffect} from 'react'
import { useGlobalContext } from '@/app/Context/store';

function CoordinatorConfiguration() {
  const {setActiveTab}=useGlobalContext();
  useEffect(() => {
    setActiveTab("")
  }, [setActiveTab])
  
  return (
    <div>CoordinatorConfiguration</div>
  )
}

export default CoordinatorConfiguration