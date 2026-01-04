'use client'
import React,{useEffect} from 'react'
import { useGlobalContext } from '@/app/Context/store';

function Migrators() {
  const {setActiveTab}=useGlobalContext();
  useEffect(() => {
    setActiveTab("")
  }, [setActiveTab])
  return (
    <div>Migrators</div>
  )
}

export default Migrators