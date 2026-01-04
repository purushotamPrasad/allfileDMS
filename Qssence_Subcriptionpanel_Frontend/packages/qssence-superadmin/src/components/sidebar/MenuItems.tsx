import {
  IconSettings,
  IconUser,
  IconCashBanknote,
  IconLayoutDashboard,
  IconBuildingSkyscraper,
  IconBuildingBank,
  IconBuilding,
  IconBrandFlightradar24,
} from "@tabler/icons-react";


const Menuitems = [
  {
    id: "Dashboard",
    title: "Dashboard",
    href:'/',
    icon: IconLayoutDashboard,
    active: true,
  },
  {
    id: "Company",
    title: "Company",
    href:'/company/all-company',
    icon: IconBuildingSkyscraper,
    active: false,
    subMenu: [
      {
        id: "All Company",
        title: "All Company",
        icon: IconBuilding,
        href: "/company/all-company",
      },
      {
        id: "User License",
        title: "User License",
        icon: IconUser,
        href: "/company/user-license",
      },
    ],
  },
  {
    id: "Plans",
    title: "Plans",
    href:'/plans/plans',
    icon: IconBrandFlightradar24,
    active: false,
    subMenu: [
      {
        id: "Plans",
        title: "Plans",
        icon: IconBrandFlightradar24,
        href: "/plans/plans",
      },
      {
        id: "Company Plans",
        title: "Company Plans",
        icon: IconBrandFlightradar24,
        href: "/plans/company-plan",
      },
    ],
  },
  {
    id: "Subscriptions",
    title: "Subscriptions",
    href:'/subscriptions/subscriptions',
    icon: IconBuildingBank,
    active: false,
    subMenu: [
      {
        id: "Subscriptions",
        title: "Subscriptions",
        icon: IconBuildingBank,
        href: "/subscriptions/subscriptions",
      },
    ],
  },
  {
    id: "Transactions",
    title: "Transactions",
    href:'/transactions/transactions',
    icon: IconCashBanknote,
    active: false,
    subMenu: [
      {
        id: "Transactions",
        title: "Transactions",
        icon: IconCashBanknote,
        href: "/transactions/transactions",
      },
    ],
  },
  {
    id: "Settings",
    title: "Settings",
    href:'/settings/settings',
    icon: IconSettings,
    active: false,
    subMenu: [
      {
        id: "Settings",
        title: "Settings",
        icon: IconSettings,
        href: "/settings/settings",
      },
    ],
  },
];

export default Menuitems;





