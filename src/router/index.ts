import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useConfigStore } from "@/stores/config";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layouts/LandingLayout.vue"),
    children: [
      {
        path: "",
        name: "landing",
        component: () => import("@/views/LandingPage.vue"),
        meta: {
          pageTitle: "KuramaHome - Gestione Immobiliare",
        },
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/main-layout/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          pageTitle: "Dashboard",
          breadcrumbs: ["Dashboards"],
        },
      },
      {
        path: "agents",
        name: "agents",
        component: () => import("@/views/pages/agents/List.vue"),
        meta: {
          pageTitle: "Agenti",
          breadcrumbs: ["Agenti"],
          // requiresAdmin: true
        },
      },
      {
        path: "agencies",
        name: "agencies",
        component: () => import("@/views/pages/agencies/List.vue"),
        meta: {
          pageTitle: "Agenzie",
          breadcrumbs: ["Agenzie"],
          requiresAdmin: true
        },
      },
      {
        path: "properties",
        name: "properties",
        component: () => import("@/views/pages/properties/List.vue"),
        meta: {
          pageTitle: "Immobili",
          breadcrumbs: ["Immobili"],
        },
      },
      {
        path: "property/:id",
        name: "property",
        component: () => import("@/views/pages/properties/Update.vue"),
        meta: {
          pageTitle: "Immobile",
          breadcrumbs: ["Immobili"],
        },
      },
      {
        path: "clients",
        name: "clients",
        component: () => import("@/views/pages/customers/Clients.vue"),
        meta: {
          pageTitle: "Clienti",
          breadcrumbs: ["Clienti"],
        },
      },
      {
        path: "client/:id",
        name: "client",
        component: () => import("@/views/pages/customers/Update.vue"),
        meta: {
          pageTitle: "Cliente",
          breadcrumbs: ["Cliente"],
        },
      },
      {
        path: "documentations",
        name: "documentations",
        component: () => import("@/views/pages/documentations/Documentations.vue"),
        meta: {
          pageTitle: "Modulistica",
          breadcrumbs: ["Modulistica"],
        },
      },
      {
        path: "requests",
        name: "requests",
        component: () => import("@/views/pages/requests/List.vue"),
        meta: {
          pageTitle: "Richieste",
          breadcrumbs: ["Richieste"],
        },
      },
      {
        path: "locations",
        name: "locations",
        component: () => import("@/views/pages/locations/List.vue"),
        meta: {
          pageTitle: "Località",
          breadcrumbs: ["Località"],
          requiresAdminOrAgency: true
        },
      },
      {
        path: "request/:id",
        name: "request",
        component: () => import("@/views/pages/requests/Update.vue"),
        meta: {
          pageTitle: "Richiesta",
          breadcrumbs: ["Richiesta"],
        },
      },
      {
        path: "profile-details/:id",
        name: "profile_details",
        component: () => import("@/views/pages/profile/Details.vue"),
        meta: {
          pageTitle: "Richieste",
          breadcrumbs: ["Richieste"],
        },
      },
      {
        path: "calendar",
        name: "calendar",
        component: () => import("@/views/pages/calendar/Calendar.vue"),
        meta: {
          pageTitle: "Calendario",
          breadcrumbs: ["Calendario"],
        },
      },
      {
        path: "subscription/manage",
        name: "manage-subscription",
        component: () => import("@/views/crafted/subscription/ManageSubscription.vue"),
        meta: {
          pageTitle: "Gestisci Abbonamento",
          breadcrumbs: ["Abbonamento"],
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
          middleware: "no-auth",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
        meta: {
          pageTitle: "Sign Up",
          middleware: "no-auth",
        },
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
        meta: {
          pageTitle: "Password reset",
          middleware: "no-auth",
        },
      },
      {
        path: "/email-confirmation/:email/:token(.*)",
        name: "email_confirmation",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/EmailConfirmation.vue"),
        meta: {
          pageTitle: "Password reset",
          middleware: "no-auth",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/SystemLayout.vue"),
    children: [
      {
        // Privacy Policy route
        path: "/privacy-policy",
        name: "privacy-policy",
        component: () => import("@/views/pages/legal/PrivacyPolicy.vue"),
        meta: {
          pageTitle: "Privacy Policy",
        },
      },
      {
        // Cookie Policy route
        path: "/cookie-policy",
        name: "cookie-policy",
        component: () => import("@/views/pages/legal/CookiePolicy.vue"),
        meta: {
          pageTitle: "Cookie Policy",
        },
      },
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/crafted/authentication/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/crafted/authentication/Error500.vue"),
        meta: {
          pageTitle: "Error 500"
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // current page view title
  document.title = `${to.meta.pageTitle} - KuramaHome`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // La verifica del token viene fatta solo all'avvio dell'app (App.vue onMounted)
  // Non serve chiamare verifyAuth() ad ogni cambio di route

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (authStore.isAuthenticated) {
      if (to.meta.requiresAdmin) {
        if (authStore.user.Role == "Admin") {
          next();
        } else {
          authStore.logout()
          next({ name: "sign-in" });
        }
      } else if (to.meta.requiresAdminOrAgency) {
        if (authStore.user.Role == "Admin" || authStore.user.Role == "Agency") {
          next();
        } else {
          authStore.logout()
          next({ name: "sign-in" });
        }
      } else {
        next();
      }
    } else {
      authStore.logout()
      next({ name: "sign-in" });
    }
  } else if (to.meta.middleware == "no-auth") {
    // Se l'utente è già autenticato, reindirizza alla dashboard
    if (authStore.isAuthenticated) {
      next({ name: "dashboard" });
    } else {
      // Se non è autenticato, permette l'accesso alla pagina (sign-in, sign-up, etc.)
      next();
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
