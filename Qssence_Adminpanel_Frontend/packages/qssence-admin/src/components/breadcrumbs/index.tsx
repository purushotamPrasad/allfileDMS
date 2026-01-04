import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { IconChevronRight } from '@tabler/icons-react';

interface BreadcrumbProps {
  url: string;
  activeTab:string
}

const DynamicBreadcrumb: React.FC<BreadcrumbProps> = ({ url ,activeTab}) => {

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Function to replace '_' with '&' and '-' with ' '
  const formatBreadcrumbItem = (str: string) => {
    return str.replace(/_/g, ' & ').replace(/-/g, ' ');
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<IconChevronRight height={18} width={18} />}>
      {url.split('/').filter(item => item !== '').map((item, index) => (
        <Typography color="textPrimary" key={index}>
          {capitalizeFirstLetter(formatBreadcrumbItem(item))}
        </Typography>
      ))}
      {activeTab!==""&&
      <Typography color="primary">
        {activeTab||""}
      </Typography>}
    </Breadcrumbs>
  );
};

export default DynamicBreadcrumb;
