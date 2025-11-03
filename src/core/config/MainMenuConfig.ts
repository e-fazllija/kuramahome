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
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin"],
      },
      {
        heading: "Agenti",
        route: "/dashboard/agents",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency"],
      },
      {
        heading: "Clienti",
        route: "/dashboard/clients",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Modulistica",
        route: "/dashboard/documentations",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Richieste",
        route: "/dashboard/requests",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Immobili",
        route: "/dashboard/properties",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
      {
        heading: "Località",
        route: "/dashboard/locations",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency"],
      },
      {
        heading: "Calendario",
        route: "/dashboard/calendar",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agency", "Agent"],
      },
    ],
  }
];

export default MainMenuConfig;
