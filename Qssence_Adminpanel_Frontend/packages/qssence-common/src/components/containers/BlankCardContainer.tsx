import { Card, Typography } from "@mui/material";

type Props = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const BlankCardContainer = ({ children, className }: Props) => {
  return (
    <Card
      sx={{ p: 0, position: "relative" }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      
      {children}
    </Card>
  );
};

export default BlankCardContainer;