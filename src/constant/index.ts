export const MENU_LIST = [
  {
    text: "Home",
    icon: "home",
  },
  {
    text: "Dashboard",
    icon: "dashboard",
    isSubList: true,
    subLists: ["Sender", "Notifications", "Analytics", "Reports"],
  },
  {
    text: "Projects",
    icon: "project",
  },
  {
    text: "Tasks",
    icon: "task",
    isSubList: true,
    subLists: ["To do", "Updates"],
  },
  {
    text: "Reporting",
    icon: "report",
  },
  {
    text: "Users",
    icon: "user",
  },
];

export enum FORM_TAB {
  PREPARE = "Prepare",
  SUMMARY = "Summary",
}

export const SAMPLE_DATA = [
  "0xD44123a0419b2d9aF43d821532DCe074675900f0,0.000056",
  "pavlik.eth,12",
  "0xC8c30Fa803833dD1Fd6DBCDd91Ed0b301EFf87cF,13.45",
  "0x7D52422D3A5fE9bC92D3aE8167097eE09F1b347d,1.049",
  "0x64c9525A3c3a65Ea88b06f184F074C2499578A7E,1"
];
