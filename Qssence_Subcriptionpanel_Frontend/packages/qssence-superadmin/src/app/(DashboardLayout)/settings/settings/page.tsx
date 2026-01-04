import { PageContainer, CardContainer } from "qssence-common";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Container,
} from '@mui/material';
import { IconCheckbox, IconEdit, IconPencil } from "@tabler/icons-react";

export default function Home() {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      
      <div style={{
								width: "100%!important",
								background: "#E5EEF5",
								minHeight: "100vh",
                paddingInline:"20px"
						}}>

        <div className="description">

        <h1 className="header_title primary_color">All Task</h1>

        </div>
      
      <PageContainer title="Dashboard" description="this is Dashboard">

        <CardContainer>
     
      <Table>
        <TableHead >
          <TableRow>
            <TableCell style={{ fontWeight: 'bold', fontSize:"16px" }}>Task</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Record id</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Due Date</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Assigned to</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Status</TableCell>
            <TableCell style={{ fontWeight: 'bold',fontSize:"16px" }}>Edit</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody style={{position:"relative",top:"6px"}}>
        <TableRow>
        <TableCell >
      
          <div style={{display:'flex',gridColumnGap:"8px", alignItems:"center"}}>
           <img src="/check-circle.svg" style={{backgroundColor:"#65BA35",borderRadius:"50%",padding:"6px"}} alt="check-circle-icon"/>
           {truncateText('Change Execuation & Release', 27)}
          </div>
          
          </TableCell>
            <TableCell>QS-000424</TableCell>
            <TableCell>20 mar 2024</TableCell>
            <TableCell>You</TableCell>
            <TableCell>Closed</TableCell>
            <TableCell>
             <IconButton>
             <IconPencil/>
             </IconButton>

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell >
    
          <div style={{display:'flex',gridColumnGap:"8px", alignItems:"center"}}>
           <img src="/check-circle.svg" style={{backgroundColor:"#65BA35",borderRadius:"50%",padding:"6px"}} alt="check-circle-icon"/>
           {truncateText('Change Execuation & Release', 27)}
          </div>
          
          </TableCell>
            <TableCell>QS-000428</TableCell>
            <TableCell>20 mar 2024</TableCell>
            <TableCell>You</TableCell>
            <TableCell>Closed</TableCell>
            <TableCell>
             <IconButton>
             <IconPencil/>
             </IconButton>

            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell> 
          <div style={{display:'flex',gridColumnGap:"8px", alignItems:"center"}}>
           <img src="/Icon.svg" style={{backgroundColor:"#E54345",borderRadius:"50%",padding:"6px"}} alt="check-circle-icon"/>
          {truncateText('Review and Approval the User', 27)}
          </div>
          </TableCell>
            <TableCell>QS-000452</TableCell>
            <TableCell>20 mar 2024</TableCell>
            <TableCell>You</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>
             <IconButton>
              <IconPencil/>
             </IconButton>

            </TableCell>
        </TableRow>
        </TableBody>
      </Table>

        </CardContainer>
      </PageContainer>
      </div>
      </>
  );
}