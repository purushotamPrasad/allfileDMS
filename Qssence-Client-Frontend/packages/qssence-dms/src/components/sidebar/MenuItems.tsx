import {
  IconDeviceDesktop,
  IconBrandDatabricks,
  IconNotification,
  IconUsers,
  IconTool,
  IconRocket,
  IconSettings,
  IconFileText,
  IconCircleCheck,
  IconDownload,
  IconRectangularPrism,
  IconRectangle,
  IconChevronUp,
  IconCheckbox,
  IconUser,
} from "@tabler/icons-react";


const Menuitems = [
  {
    id: "Views",
    title: "Views",
    icon: IconFileText,
    active: true,
    subMenu: [
      {
        id: "All Tasks",
        title: "All Tasks",
        icon: IconCheckbox,
        href: "/",
        value:"21"
      },
      {
        id: "My Tasks",
        title: "My Tasks",
        icon: IconUser,
        href: "/my-tasks",
        value:"08"
      },
      {
        id: "Available Tasks",
        title: "Available Tasks",
        icon: IconDownload,
        href: "/available-tasks",
        value:"13"
      },
      {
        id: "Active Workflows",
        title: "Active Workflows",
        icon: IconBrandDatabricks,
        href: "/active-workflows",
        value:"06"
      },
    ],
  },
];

export default Menuitems;

const item = [
  { id: "Home", title: "Home", link: "/home", type: "single" },
  {
    id: "My learnings",
    title: "My learnings",
    link: "/my-learnings",
    type: "single",
  },
  {
    id: "Consumer Library",
    title: "Consumer Library",
    link: "/consumer-library",
    type: "single",
  },
  {
    id: "Full Library",
    title: "Full Library",
    link: "/library",
    type: "single",
  },
  {
    id: "Document Management",
    title: "Document Management",
    type: "multiple",
    data: [
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
    ],
  },
  {
    id: "Quality Management",
    title: "Quality Management",
    type: "multiple",
    data: [
      { id: "All", title: "All", link: "/quality-management/all-qms" },
      { id: "Change Controls", title: "Change Controls", link: "/quality-management/change-controls" },
      { id: "Complaints", title: "Complaints", link: "/quality-management/complaints" },
      { id: "Continuous Improvement", title: "Continuous Improvement", link: "/quality-management/continous-improvement" },
      { id: "Deviations", title: "Deviations", link: "/quality-management/deviations" },
      { id: "External Finding", title: "External Finding", link: "/quality-management/external-finding" },
      { id: "Internal Finding", title: "Internal Finding", link: "/quality-management/internal-finding" },
      { id: "Lab Investigations", title: "Lab Investigations", link: "/quality-management/lab-investigation" },
    ],
  },

  {
    id: "Audit & Action",
    title: "Audit & Action",
    type: "multiple",
    data: [
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
    ],
  },


  {
    id: "Risk Management",
    title: "Risk Management",
    type: "multiple",
    data: [
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
    ],
  },

  {
    id: "Training Management",
    title: "Training Management",
    type: "multiple",
    data: [
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
    ],
  },

 
  {
    id: "Loader",
    title: "Loader",
    link: "/loader",
    type: "single",
  },
  {
    id: "Reporting & Dashboard",
    title: "Reporting & Dashboard",
    type: "multiple",
    data: [
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
      { id: "My learnings", title: "My learnings", link: "/my-learnings" },
    ],
  },
  // {
  //   id: "Anthem Organization",
  //   title: "Anthem Organization",
  //   type: "multiple",
  //   data: [
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //   ],
  // },
  
 
  // {
  //   id: "Forms",
  //   title: "Forms",
  //   type: "multiple",
  //   data: [
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //   ],
  // },
  // {
  //   id: "Binders",
  //   title: "Binders",
  //   type: "multiple",
  //   data: [
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //     { id: "My learnings", title: "My learnings", link: "/my-learnings" },
  //   ],
  // },
];

export {item}

const filter = [

  {
    id: "Task Type",
    title: "Task Type",
    data: [
      { id: "Task Type", title: "Task Type", link: "/task-type" },
      { id: "Task Type", title: "Task Type", link: "/task-type" },
      { id: "Task Type", title: "Task Type", link: "/task-type" },
    ],
  },
  {
    id: "Task Due Date",
    title: "Task Due Date",
    data: [
      { id: "Task Due Date", title: "Task Due Date", link: "/task-due-date" },
      { id: "Task Due Date", title: "Task Due Date", link: "/task-due-date" },
      { id: "Task Due Date", title: "Task Due Date", link: "/task-due-date" },
    ],
  },
  {
    id: "Task Assignment Date",
    title: "Task Assignment Date",
    data: [
      { id: "Task Assignment Date", title: "Task Assignment Date", link: "/task-assignment-date" },
      { id: "Task Assignment Date", title: "Task Assignment Date", link: "/task-assignment-date" },
      { id: "Task Assignment Date", title: "Task Assignment Date", link: "/task-assignment-date" },
    ],
  },
];

export {filter}

const FulllibraryMenuitems = [
  {
    id: "Views",
    title: "Views",
    icon: IconFileText,
    active: true,
    subMenu: [
      {
        id: "All Full Library",
        title: "All Full Library",
        icon: IconCheckbox,
        href: "/all-full-library",
      },
      {
        id: "My Full Library",
        title: "My Full Library",
        icon: IconUser,
        href: "/my-full-library",
      },
      {
        id: "Recent Full Library",
        title: "Recent Full Library",
        icon: IconDownload,
        href: "/recent-full-library",
      },
      {
        id: "Favourite",
        title: "Favourite",
        icon: IconBrandDatabricks,
        href: "/favourite",
      },
      {
        id: "Document Inbox",
        title: "Document Inbox",
        icon: IconBrandDatabricks,
        href: "/document-inbox",
        value:"0"
      },
    ],
  },
];

export {FulllibraryMenuitems};

const fulllibraryfilter = [

  {
    id: "Document Type",
    title: "Document Type",
    data: [
      { id: "Document Type", title: "Document Type", link: "/document-type" },
      { id: "Document Type", title: "Document Type", link: "/document-type" },
      { id: "Document Type", title: "Document Type", link: "/document-type" },
    ],
  },
  {
    id: "Status",
    title: "Status",
    data: [
      { id: "Status", title: "status", link: "/status" },
      { id: "Status", title: "status", link: "/status" },
      { id: "Status", title: "status", link: "/status" },
    ],
  },
  {
    id: "Owning Internal Site/ Division > Owning Plant",
    title: "Owning Internal Site/ Division > Owning Plant",
    data: [
      { id: "Owning Internal Site/ Division > Owning Plant", title: "Owning Internal Site/ Division > Owning Plant", link: "/owning-internal-site" },
      { id: "Owning Internal Site/ Division > Owning Plant", title: "Owning Internal Site/ Division > Owning Plant", link: "/owning-internal-site" },
      { id: "Owning Internal Site/ Division > Owning Plant", title: "Owning Internal Site/ Division > Owning Plant", link: "/owning-internal-site" },
    ],
  },

  {
    id: "Owning Department",
    title: "Owning Department",
    data: [
      { id: "Owning Department", title: "Owning Department", link: "/owning-department" },
      { id: "Owning Department", title: "Owning Department", link: "/owning-department" },
      { id: "Owning Department", title: "Owning Department", link: "/owning-department" },
    ],
  },

  {
    id: "Impacted Department",
    title: "Impacted Department",
    data: [
      { id: "Impacted Department", title: "Impacted Department", link: "/impacted-department" },
      { id: "Impacted Department", title: "Impacted Department", link: "/impacted-department" },
      { id: "Impacted Department", title: "Impacted Department", link: "/impacted-department" },
    ],
  },

  {
    id: "Country",
    title: "Country",
    data: [
      { id: "Country", title: "Country", link: "/country" },
      { id: "Country", title: "Country", link: "/country" },
      { id: "Country", title: "Country", link: "/country" },
    ],
  },
  {
    id: "Training Impact",
    title: "Training Impact",
    data: [
      { id: "Training Impact", title: "Training Impact", link: "/training-department" },
      { id: "Training Impact", title: "Training Impact", link: "/training-department" },
      { id: "Training Impact", title: "Training Impact", link: "/training-department" },
    ],
  },
  {
    id: "Scope",
    title: "Scope",
    data: [
      { id: "Scope", title: "Scope", link: "/scope" },
      { id: "Scope", title: "Scope", link: "/scope" },
      { id: "Scope", title: "Scope", link: "/scope" },
    ],
  },
];

export {fulllibraryfilter}


const NewdeviationTimeline=[
    {
      id: "Deviation Details",
      title: "Deviation Details",
      active: false,
    }
]

export {NewdeviationTimeline}

const DeviationTimeline = [
 
  {
    id: "Workflow Timeline",
    title: "Workflow Timeline",
    active: false,
  },

  {
    id: "Deviation Details",
    title: "Deviation Details",
    active: false,
  },
  {
    id: "Roles",
    title: "Roles",
    active: false,
  },
  {
    id: "Additional Documents",
    title: "Additional Documents",
    active: false,
  },

  {
    id: "Impacted Facilities",
    title: "Impacted Facilities",
    active: false,
  },

  {
    id: "Products/Batches",
    title: "Products/Batches",
    active: false,
  },

  {
    id: "Materials/Assets",
    title: "Materials/Assets",
    active: false,
  },
  {
    id: "Studies",
    title: "Studies",
    active: false,
  },
  {
    id: "Investigations",
    title: "Investigations",
    active: false,
  },
  {
    id: "Root Cause",
    title: "Root Cause",
    active: false,
  },

  {
    id: "Summary and Conclusion",
    title: "Summary and Conclusion",
    active: false,
  },

  {
    id: "CAPA Actions",
    title: "CAPA Actions",
    active: false,
  },

  {
    id: "SCARs",
    title: "SCARs",
    active: false,
  },
  {
    id: "Effectiveness Check",
    title: "Effectiveness Check",
    active: false,
  },

  {
    id: "Extension Requests",
    title: "Extension Requests",
    active: false,
  },

  {
    id: "Related Quality Events",
    title: "Related Quality Events",
    active: false,
  },
  {
    id: "Issue Escalations",
    title: "Issue Escalations",
    active: false,
  },

  {
    id: "System Details",
    title: "System Details",
    active: false,
  },

  {
    id: "Attachments",
    title: "Attachments",
    active: false,
  },

  {
    id: "Signatures",
    title: "Signatures",
    active: false,
  },

]

export {DeviationTimeline}

const DeviatoinsMenuitems = [
  {
    id: "Views",
    title: "Views",
    icon: IconFileText,
    active: true,
    subMenu: [
      {
        id: "All Deviations",
        title: "All Deviations",
        icon: IconCheckbox,
        href: "/all-deviations",
      },
      {
        id: "Recent Deviations",
        title: "Recent Deviations",
        icon: IconUser,
        href: "/recent-deviations",
      },
      {
        id: "Favourites",
        title: "Favourites",
        icon: IconBrandDatabricks,
        href: "/favourites",
      },
      {
        id: "Deviation Custom View",
        title: "Deviation Custom View",
        icon: IconBrandDatabricks,
        href: "/document-custom-view",
      },
    ],
  },
];

export {DeviatoinsMenuitems};

const deviationfilter=[
  {
    id: "Department",
    title: "Department",
    data: [
      { id: "Department", title: "Department", link: "/department" },
      { id: "Department", title: "Department", link: "/department" },
      { id: "Department", title: "Department", link: "/department" },
    ],
  },
  {
    id: "Quality Event Type",
    title: "Quality Event Type",
    data: [
      { id: "Quality Event Type", title: "Quality Event Type", link: "/quality-event-type" },
      { id: "Quality Event Type", title: "Quality Event Type", link: "/quality-event-type" },
      { id: "Quality Event Type", title: "Quality Event Type", link: "/quality-event-type" },
    ],
  },
  {
    id: "Rating",
    title: "Rating",
    data: [
      { id: "Rating", title: "Rating", link: "/rating" },
      { id: "Rating", title: "Rating", link: "/rating" },
      { id: "Rating", title: "Rating", link: "/rating" },
    ],
  },

  {
    id: "Date Closed",
    title: "Date Closed",
    data: [
      { id: "Date Closed", title: "Date Closed", link: "/date-closed" },
      { id: "Date Closed", title: "Date Closed", link: "/date-closed" },
      { id: "Date CLosed", title: "Date Closed", link: "/date-closed" },
    ],
  },

  {
    id: "Owning Facility",
    title: "Owning Facility",
    data: [
      { id: "Owning Facility", title: "Owning Facility", link: "/owning-facility" },
      { id: "Owning Facility", title: "Owning Facility", link: "/owning-facility" },
      { id: "Owning Facility", title: "Owning Facility", link: "/owning-facility" },
    ],
  },
]

export {deviationfilter}
