import {
  IconBrandDatabricks,
  IconUsers,
  IconDashboard,
  IconUser,
  IconUsersGroup,
  IconKey,
  IconUserBolt,
  IconFile,
  IconHistory,
  IconDivide,
  IconPlus,
  IconHome,
  IconLayoutDashboard,
  IconPlant,
  IconUserCircle,
  IconSettings,
  IconFileInvoice,
  IconBrandTabler,
  IconBuildingCommunity,
  IconMail,
} from "@tabler/icons-react";


const Menuitems = [
 
  {
    id: "Dashboard",
    title: "Dashboard",
    href:'/home',
    icon: IconLayoutDashboard,
    active: true,
  },
  {
    id: "Plants/Departments",
    title: "Plants/Departments",
    icon: IconBuildingCommunity,
    active: false,
    href: "/plants_department/all-plants",
    urlContent: "plants_divisions",
    subMenu: [
      {
        id: "Plants/Departments",
        title: "Plants/Departments",
        icon: IconDivide,
        href: "/plants_department/all-plants",
      },
    ],
  },
  {
    id: "Accounts & Privileges",
    title: "Accounts & Privileges",
    icon: IconUserCircle,
    active: false,
    href: "/accounts_privileges/users/all-users",
    urlContent: "accounts_privileges",
    subMenu: [
      {
        id: "Users",
        title: "Users",
        icon: IconUsers,
        href: "/accounts_privileges/users/all-users",
      },
      {
        id: "Groups",
        title: "Groups",
        icon: IconUsersGroup,
        href: "/accounts_privileges/groups/all-group",
      },
      {
        id: "Roles",
        title: "Roles",
        icon: IconUserBolt,
        href: "/accounts_privileges/roles/all-roles",
      },
      {
        id: "Permissions",
        title: "Permissions",
        icon: IconBrandDatabricks,
        href: "/accounts_privileges/permission/all-permission",
      },
    ],
  },
  // {
  //   id: "Coordinator configuration",
  //   title: "Coordinator configuration",
  //   icon: IconBrandDatabricks,
  //   active: false,
  //   href:"/coordinator_configuration",
  //   urlContent:"coordinator_configuration",
  //   subMenu: [
  //     {
  //       id: "User roles",
  //       title: "User roles",
  //       icon: IconDeviceDesktop,
  //       href: "/coordinator_configuration",
  //     },
  //     {
  //       id: "Desktop layouts",
  //       title: "Desktop layouts",
  //       icon: IconBrandDatabricks,
  //       href: "/home2",
  //     },
  //     {
  //       id: "Desktop Search",
  //       title: "Desktop search",
  //       icon: IconBrandDatabricks,
  //       href: "/home2",
  //     },
  //   ],
  // },
  
  {
    id: "workflow Configurations",
    title: "Workflow Configurations",
    icon: IconFileInvoice,
    active: false,
    href: "/workflow-configuration/workflow-config",
    urlContent: "workflow-configuration",
    subMenu: [
      {
        id: "workflow Configuration",
        title: "Workflow Configuration",
        icon: IconPlus,
        href: "/workflow-configuration/workflow-config",
      },
    ],
  },

  {
    id: "System Configuration",
    title: "System Configuration",
    icon: IconSettings,
    active: false,
    href: "/system-configuration/authentication-configuration",
    urlContent: "system-configuration",
    subMenu: [
      {
        id: "Authentication Config",
        title: "Authentication Config",
        icon: IconKey,
        href: "/system-configuration/authentication-configuration",
      },
      {
        id: "SSO Configurations",
        title: "SSO Configurations",
        icon: IconUserBolt,
        href: "/system-configuration/SSO-Configurations/identity-provider",
      },
      {
        id: "Audit Trail Config",
        title: "Audit Trail Config",
        icon: IconFile,
        href: "/system-configuration/audit-trail-config",
      },
      {
        id: "Email Config",
        title: "Email Config",
        icon: IconMail,
        href: "/system-configuration/email-config",
      },
    ],
  },

  {
    id: "Audit Trail Logs",
    title: "Audit Trail Logs",
    icon: IconBrandTabler,
    active: false,
    href: "/audit-trail-logs/audit-history",
    urlContent: "audit-trail-logs",
    subMenu: [
      {
        id: "Audit History",
        title: "Audit History",
        icon: IconHistory,
        href: "/audit-trail-logs/audit-history",
      },
    ],
  },
  
  // {
  //   id: "Utilities",
  //   title: "Utilities",
  //   icon: IconTool,
  //   active: false,
  //   href:"/utilities",
  //   urlContent:"utilities",
  //   subMenu: [
  //     {
  //       id: "User roles",
  //       title: "User roles",
  //       icon: IconDeviceDesktop,
  //       href: "/utilities",
  //     },
  //     {
  //       id: "Desktop layouts",
  //       title: "Desktop layouts",
  //       icon: IconBrandDatabricks,
  //       href: "/home2",
  //     },
  //   ],
  // },
  // {
  //   id: "Migrators",
  //   title: "Migrators",
  //   icon: IconRocket,
  //   active: false,
  //   href:"/migrators",
  //   urlContent:"migrators",
  //   subMenu: [
  //     {
  //       id: "User roles",
  //       title: "User roles",
  //       icon: IconDeviceDesktop,
  //       href: "/migrators",
  //     },
  //     {
  //       id: "Desktop layouts",
  //       title: "Desktop layouts",
  //       icon: IconBrandDatabricks,
  //       href: "/home2",
  //     },
  //     {
  //       id: "Desktop Search",
  //       title: "Desktop search",
  //       icon: IconBrandDatabricks,
  //       href: "/home2",
  //     },
  //   ],
  // },
];

export default Menuitems;
