import { CircularProgress } from "@mui/material";

export default function Loading() {
return(
    <div style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
        <CircularProgress/>
    </div>
)
}