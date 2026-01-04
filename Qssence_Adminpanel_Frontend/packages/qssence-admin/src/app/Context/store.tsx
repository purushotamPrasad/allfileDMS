'use client'

import { createContext ,useContext,Dispatch,SetStateAction,useState} from "react";
interface ContextProps{
    activeTab:string;
    activeTabId:number;
    setActiveTab:Dispatch<SetStateAction<string>>;
    setActiveTabId:Dispatch<SetStateAction<number>>
}

const GlobalContext = createContext<ContextProps>({
    activeTab:"",
    setActiveTab:():string=>'',
    activeTabId:0,
    setActiveTabId:():number=>0
})

export const GlobalContextProvider=({children}: { children: React.ReactNode })=>{
    const [activeTab,setActiveTab]=useState('Admin');
    const [activeTabId,setActiveTabId]=useState(0);
    return(
        <GlobalContext.Provider value={{activeTab,setActiveTab,activeTabId,setActiveTabId}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext=()=>useContext(GlobalContext)