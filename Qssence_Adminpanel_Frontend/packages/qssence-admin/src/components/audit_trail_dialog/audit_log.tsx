import { Grid, Typography } from "@mui/material"

const AuditLog = () => {
    const logHistory = [{
        date: "Apr 05 2024",
        day: "Today",
        time: "06:32",
        userName: "Ayush Tamrakar",
        userId: "123456",
        action: "Login",
        borderColor:"1px solid #23608E"
    }, {
        date: "Apr 05 2024",
        day: "Today",
        time: "07:32",
        userName: "Shreya Paliwal",
        userId: "123457",
        action: "Logout",
        borderColor:"1px solid #2D9D5A"
    },
    {
        date: "Apr 04 2024",
        day: "Yesterday",
        time: "06:32",
        userName: "Vivek Sharma",
        userId: "123458",
        action: "View Document",
        borderColor:"1px solid #23608E"
    },
    {
        date: "Apr 04 2024",
        day: "Yesterday",
        time: "06:32",
        userName: "Nikhil Sharma",
        userId: "123458",
        action: "View Document",
        borderColor:"1px solid #2D9D5A"
    },
    {
        date: "Apr 03 2024",
        day: "Monday",
        time: "06:32",
        userName: "Varsha Rane",
        userId: "123458",
        action: "View Document",
        borderColor:"1px solid #23608E"
    },{
        date: "Apr 03 2024",
        day: "Monday",
        time: "06:32",
        userName: "Varsha Rane",
        userId: "123458",
        action: "View Document",
        borderColor:"1px solid #2D9D5A"
    },]
    return (
        <div>
            {logHistory?.map((item, index) => (
                <>
                <div style={{ display: "flex", marginTop: "0.8rem" }} key={index}>
                    <div style={{ width: "25%", padding: "0.5rem" }}>
                        {logHistory[index - 1]?.date !== item?.date ?
                            <>
                                <Typography sx={{ fontSize: { md: "12px", lg: "14px" }, color: "#434343" }}>{item?.day}</Typography>
                                <Typography sx={{ fontSize: "12px", color: "#6B6B6B" }}>{item?.date}</Typography>
                            </> : null}
                    </div>
                    <div style={{ width: "10%", padding: "0.5rem 1rem" }}>
                        <Typography sx={{ fontSize: { md: "12px", lg: "13px" }, color: "#434343", textAlign: "end" }}>{item?.time}</Typography>
                    </div>
                    <div style={{ width: "65%", background: "#f2f5f8", padding: "0.5rem", borderLeft: item?.borderColor }}>
                        <Grid container>
                            <Grid item xs={2.5} sx={{ textAlign: "end" }}>
                                <Typography sx={{ fontSize: "12px", color: "#6B6B6B" }} style={{ lineHeight: "20px" }}>User Name: &nbsp;</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography sx={{ fontSize: "12px", color: "#434343",fontWeight:"700px" }} style={{ lineHeight: "20px" }}>{item?.userName}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2.5} sx={{ textAlign: "end" }}>
                                <Typography sx={{ fontSize: "12px", color: "#6B6B6B" }} style={{ lineHeight: "20px" }}>User Id: &nbsp;</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography sx={{ fontSize: "12px", color: "#434343" ,fontWeight:"700px"}} style={{ lineHeight: "20px" }}>{item?.userId}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={2.5} sx={{ textAlign: "end" }}>
                                <Typography sx={{ fontSize: "12px", color: "#6B6B6B" }} style={{ lineHeight: "20px" }}>Action: &nbsp;</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography sx={{ fontSize: "12px", color: "#434343",fontWeight:"700px" }} style={{ lineHeight: "20px" }}>{item?.action}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                {logHistory[index - 1]?.date !== item?.date && <hr style={{marginTop:"0.8rem"}}/>}
                </>
            ))}

        </div>
    )
}
export default AuditLog