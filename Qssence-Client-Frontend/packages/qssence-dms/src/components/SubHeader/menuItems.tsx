// menuItems.ts
interface MenuItem {
    id: string;
    title: string;
    link?: string;
    type: 'single' | 'multiple';
    data?: MenuItem[];
  }
  
  export const menuItems: MenuItem[] = [
    { id: "Home", title: "Home", link: "/home", type: "single" },
    { id: "MyLearnings", title: "My Learnings", link: "/", type: "single" },
    {
      id: "DocumentActions",
      title: "Document Actions",
      type: "multiple",
      data: [
        { id: "Learning1", title: "Learning 1", link: "/my-learnings/1", type: "single" },
        { id: "Learning2", title: "Learning 2", link: "/my-learnings/2", type: "single" },
        { id: "Learning3", title: "Learning 3", link: "/my-learnings/3", type: "single" },
      ],
    },
    { id: "QualityManagement", title: "Quality Management", link: "/quality-management", type: "single" },
    {
      id: "RiskManagement",
      title: "Risk Management",
      type: "multiple",
      data: [
        { id: "Risk1", title: "Risk 1", link: "/risk/1", type: "single" },
        { id: "Risk2", title: "Risk 2", link: "/risk/2", type: "single" },
        { id: "Risk3", title: "Risk 3", link: "/risk/3", type: "single" },
      ],
    },
    { id: "menu6", title: "menu6", link: "/home", type: "single" },
    { id: "menu7", title: "menu7", link: "/", type: "single" },
  ];
  