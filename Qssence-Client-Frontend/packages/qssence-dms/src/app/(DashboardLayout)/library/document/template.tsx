'use client';

import React, { useState, useEffect, useRef } from "react";
import * as docx from "docx-preview";

import createReport from 'docx-templates'; 
import { Box, Button } from "@mui/material";
import { pdfjs } from "react-pdf";

import dynamic from "next/dynamic";


const Vieweditor = dynamic(() => import('@/components/Vieweditor/vieweditor'), { ssr: false });

const Editeditor = dynamic(() => import('@/components/Editeditor/editeditor'), { ssr: false });


//  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Soptemplate = () => {
  
   const [doccontent, setDocContent] = useState(null);

   const [Sopgeneral, setSopgeneral] = useState(null);
   const [viewdata, setviewdata] = useState(false);
   const [loading, setLoading] = useState(false);
 
   useEffect(() => {

      if (typeof window !== "undefined") {
        
         pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

         const sopgeneralData = JSON.parse(localStorage.getItem('Sopgeneral'));
         const vieweditorData = JSON.parse(localStorage.getItem('view'));

         setSopgeneral(sopgeneralData);
         setviewdata(vieweditorData ? true : false);
      }
      
   }, []);

 


   useEffect(() => {
      
         
      const fetchDoc = async () => {
         try {
            const response = await fetch('/document-template.docx');
            const arrayBuffer = await response.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            const buffer = await createReport({ template: uint8Array });

            const tempElement = document.createElement('div');
            document.body.appendChild(tempElement);
            await docx.renderAsync(buffer, tempElement);
            const tempElements = tempElement.querySelector('.docx-wrapper');
            const htmlContent = tempElements ? tempElements.innerHTML : '';

            setDocContent(htmlContent);

            setLoading(true);

            document.body.removeChild(tempElement);
         } catch (err) {
            console.error('Error fetching document:', err);
         }
      };
      
         fetchDoc();
      
   }, []);
   
 
   const toggleReadOnly = (mode) => {
      if (typeof window !== "undefined") {
         if (mode === "view") {
            localStorage.setItem("view", JSON.stringify(true));
            setviewdata(true);
         } else {
            localStorage.setItem("view", JSON.stringify(false));
            setviewdata(false);
         }
      }
   };

      


  
   return (
      <>
         {Sopgeneral ? (
            <>
              
               
               {(doccontent && loading) &&
       <Box>
              <Box style={{ display: 'flex', gridColumnGap: "12px", justifyContent: 'flex-end' }}>
                  <Button style={{ color: '#000000', paddingInline:"0px", paddingBottom:"0px" }} onClick={() => toggleReadOnly('edit')}>Edit</Button>
                  <Button style={{ color: '#000000', paddingInline:"0px" , paddingBottom:"0px"}} onClick={() => toggleReadOnly('view')}>View</Button>
               </Box>
              <Box>
                {viewdata ?
                <>
                <div style={{border:"1px solid #000000"}}>
                  <Vieweditor pdfFile="/template.pdf"/>
                  </div>
                </> :
                
                <Editeditor doccontent={doccontent}/>}
              </Box>
              </Box>
              
                }
            </>
         ) : (
            <div className="sop_template">
               <img src="/soptemplate.svg" style={{ transform: "scale(0.8)" }} alt="check-circle-icon" />
               <div style={{ fontSize: "12px" }}>SOP template</div>
               <div className="grey">Your template file has been retrieved</div>
            </div>
         )}
      </>
   );
};

export default Soptemplate;



