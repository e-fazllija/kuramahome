export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  roleEnabled?: string[];
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      // {
      //   heading: "dashboard",
      //   route: "/dashboard",
      //   keenthemesIcon: "element-11",
      //   bootstrapIcon: "bi-app-indicator",
      //   roleEnabled: ["Admin", "Agenzia", "Agente"],
      // },
      {
        heading: "Agenzie",
        route: "/dashboard/agencies",
        keenthemesIcon: "briefcase",
        bootstrapIcon: "bi-briefcase",
        roleEnabled: ["Admin"],
      },
      {
        heading: "Agenti",
        route: "/dashboard/agents",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-person",
        roleEnabled: ["Admin", "Agency"],
      },
      {
        heading: "Clienti",
        route: "/dashboard/clients",
        keenthemesIcon: "user-square",
        bootstrapIcon: "bi-people",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Archivio",
        route: "/dashboard/documentations",
        keenthemesIcon: "document",
        bootstrapIcon: "bi-file-text",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Richieste",
        route: "/dashboard/requests",
        keenthemesIcon: "message-programming",
        bootstrapIcon: "bi-envelope",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Immobili",
        route: "/dashboard/properties",
        keenthemesIcon: "home-2",
        bootstrapIcon: "bi-house",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Calendario",
        route: "/dashboard/calendar",
        keenthemesIcon: "calendar",
        bootstrapIcon: "bi-calendar",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
    ],
  }
];

export default MainMenuConfig;
