import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthLayout } from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/components/LoginPage";
import { RegisterPage } from "./auth/components/RegisterPage";
import { Suspense } from "react";
import React from "react";
import { sleep } from "./lib/sleep";
import { MySpinner } from "./components/ui/MySpinner";
import { PrivateRoute } from "./auth/components/PrivateRoute";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "./fake/fake-data";
//import ChatLayout from "./chat/layout/ChatLayout";
//! Importar de manera perezosa el componente ChatLayout
const MyChatLayout = React.lazy(async () => {
  await sleep(2000);
  return import("./chat/layout/ChatLayout");
});
const MyChatPage = React.lazy(async () => {
  await sleep(2000);
  return import("./chat/components/ChatPage");
});
const MyNoChatSelected = React.lazy(
  () => import("./chat/components/contact-details/NoChatSelected")
);
export const AppRouter = () => {
  //! Hacemos la verificacion del token que debe de estar en el localStorage
  //! Cada vez que se invalida la query, se vuelve a ejecutar el useQuery en el AppRouter y va ejecutar el checkAuth y crear en el cache de la entrada user.
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (!token) {
        throw new Error("No token found");
      }
      return checkAuth(token);
    },
    retry: 0,
  });

  if (isLoading) {
    return <MySpinner />;
  }

  // if (isError) {
  //   console.log("Error al verificar el token", error);
  //   return <div>{error.message}</div>;
  // }
  return (
    <BrowserRouter>
      <Routes>
        {/* AuthLayout  es el cascaron para las paginas de autenticacion*/}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/chat"
          element={
            <Suspense fallback={<MySpinner />}>
              {/* Envolvemos el componente MyChatLayout con el componente PrivateRoute para que solo se pueda acceder a la pagina de chat si el usuario esta autenticado */}

              {/* En este punto user puede ser undefined o un objeto */}
              <PrivateRoute isAuthenticated={Boolean(user)}>
                <MyChatLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<MyNoChatSelected />} />
          <Route
            path="/chat/:id"
            element={
              <Suspense fallback={<MySpinner />}>
                <MyChatPage />
              </Suspense>
            }
          />
        </Route>

        {/* En caso de que se quiera ir a la raiz se redirigira a la pagina de autenticacion */}
        <Route path="/" element={<Navigate to="/auth" />} />
        {/* En caso de ruta no encontrada  */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
