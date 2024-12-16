import { DevtoolsProvider } from "@providers/devtools";
import { GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { FaUsers, FaHome, FaCity } from "react-icons/fa"; // FontAwesome
import { MdBusiness, MdPerson } from "react-icons/md"; // Material Design
import { ColorModeContextProvider } from "@contexts/color-mode";
import customDataProvider from "../providers/data-provider/index";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const metadata: Metadata = {
  title: "Limitless",
  description: "Lab 0 Limitless",
  icons: {
    icon: "/favicon.ico",
  },
};

const CustomIcon = () => (
  <SvgIcon>
    <image
      href="/favicon.ico" // Ruta del logo
      height="24"
      width="24"
      x="0"
      y="0"
    />
  </SvgIcon>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="es">
      <body>
        <Suspense>
          <RefineKbarProvider>
            <ColorModeContextProvider defaultMode={defaultMode}>
              <RefineSnackbarProvider>
                <DevtoolsProvider>
                  <Refine
                    routerProvider={routerProvider}
                    dataProvider={customDataProvider}
                    notificationProvider={notificationProvider}
                    resources={[
                      // {
                      //   name: "blog_posts",
                      //   list: "/blog-posts",
                      //   create: "/blog-posts/create",
                      //   edit: "/blog-posts/edit/:id",
                      //   show: "/blog-posts/show/:id",
                      //   meta: {
                      //     canDelete: true,
                      //   },
                      // },
                      // {
                      //   name: "categories",
                      //   list: "/categories",
                      //   create: "/categories/create",
                      //   edit: "/categories/edit/:id",
                      //   show: "/categories/show/:id",
                      //   meta: {
                      //     canDelete: true,
                      //   },
                      // },

                      {
                        name: "personas",
                        list: "/personas",
                        create: "/personas/create",
                        edit: "/personas/edit/:id",
                        show: "/personas/show/:id",
                        meta: {
                          canDelete: true,
                          icon: <MdPerson />, // Ícono para "personas"
                        },
                      },
                      {
                        name: "viviendas",
                        list: "/viviendas",
                        create: "/viviendas/create",
                        edit: "/viviendas/edit/:id",
                        show: "/viviendas/show/:id",
                        meta: {
                          canDelete: true,
                          icon: <FaHome />, // Ícono para "viviendas"
                        },
                      },
                      {
                        name: "municipios",
                        list: "/municipios",
                        create: "/municipios/create",
                        edit: "/municipios/edit/:id",
                        show: "/municipios/show/:id",
                        meta: {
                          canDelete: true,
                          icon: <FaCity />, // Ícono para "municipios"
                        },
                      },
                      {
                        name: "alcaldias",
                        list: "/alcaldias",
                        create: "/alcaldias/create",
                        edit: "/alcaldias/edit/:id",
                        show: "/alcaldias/show/:id",
                        meta: {
                          canDelete: true,
                          icon: <MdBusiness />, // Ícono para "alcaldias"
                        },
                      },
                      {
                        name: "empleados",
                        list: "/empleados",
                        create: "/empleados/create",
                        edit: "/empleados/edit/:id",
                        show: "/empleados/show/:id",
                        meta: {
                          canDelete: true,
                          icon: <FaUsers />, // Ícono para "empleados"
                        },
                      },
                    ]}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      projectId: "qmfdZ5-skRLLz-JjtP04",
                      title: {
                        text: "Limitless",
                        icon: <CustomIcon />,
                      },
                    }}
                  >
                    {children}
                    <RefineKbar />
                  </Refine>
                </DevtoolsProvider>
              </RefineSnackbarProvider>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  );
}
