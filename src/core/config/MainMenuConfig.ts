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
      {
        heading: "dashboard",
        route: "/dashboard",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia", "Agente"],
      },
      {
        heading: "Agenzie",
        route: "/agencies",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin"],
      },
      {
        heading: "Agenti",
        route: "/agents",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia"],
      },
      {
        heading: "Clienti",
        route: "/clients",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia", "Agente"],
      },
      {
        heading: "Modulistica",
        route: "/documentations",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia", "Agente"],
      },
      {
        heading: "Richieste",
        route: "/requests",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia", "Agente"],
      },
      {
        heading: "Immobili",
        route: "/properties",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia", "Agente"],
      },
      {
        heading: "Località",
        route: "/locations",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia"],
      },
      {
        heading: "Calendario",
        route: "/calendar",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
        roleEnabled: ["Admin", "Agenzia", "Agente"],
      },
    ],
  }
];

export default MainMenuConfig;
