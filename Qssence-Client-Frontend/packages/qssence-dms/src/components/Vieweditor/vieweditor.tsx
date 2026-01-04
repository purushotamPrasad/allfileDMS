import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

import { Recogito } from '@recogito/recogito-js';


function Vieweditor(props) {

  const [numPages, setNumPages] = useState();
  const textContainerRef = useRef(null);
  const recogitoInstance = useRef(null);
  const scale = 1;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (textContainerRef.current && !recogitoInstance.current) {
      recogitoInstance.current = new Recogito({
        content: textContainerRef.current,
        widgets: [
          { widget: 'COMMENT' },
          { widget: 'TAG' }
        ]
      });

      recogitoInstance.current.on('createAnnotation', () => {
        // Handle annotation creation
      });

      recogitoInstance.current.on('deleteAnnotation', annotation => {
        console.log('Annotation deleted:', annotation);
      });
      
    }
  }, [textContainerRef]);

  return (
  
    <div ref={textContainerRef}  style={{
      height: "590px",       
      overflowY: "scroll",    
    }}>
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess} externalLinkTarget="_blank">
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        ))}
      </Document>
   
    </div>
    
  );
}

export default Vieweditor;