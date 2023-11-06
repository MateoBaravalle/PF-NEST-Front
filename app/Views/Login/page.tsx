"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { loginUserAsync, logout } from "../../../redux/features/UserSlice";
import Link from "next/link";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoginError(null);
      const response = await dispatch(loginUserAsync({
        email,
        password,
      }));
      console.log(response);
    } catch (error) {      
      setLoginError((error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Error desconocido");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Autenticación</h1>

          {isAuthenticated ? (
            <div>
              <p>¡Inicio de sesión exitoso!</p>
              <button onClick={handleLogout} className="bg-blue-500 rounded-lg px-5 py-3 text-sm font-medium text-white mt-4">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <form className="space-y-4 max-w-md mx-auto mt-8">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  No tienes cuenta?
                  <Link href="../../Views/Register" passHref>
  <p className="underline cursor-pointer">Regístrate</p>
</Link>


                </p>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          )}

          {loginError && <p className="text-red-500">Error en el inicio de sesión: {loginError}</p>}
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://www.skolskenoviny.sk/wp-content/uploads/2021/07/immo2.png.webp"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Login;
