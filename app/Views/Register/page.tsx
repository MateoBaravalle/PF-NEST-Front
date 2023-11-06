"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { registerUserAsync, setUserStatus } from "../../../redux/features/UserSlice";
import { validate } from "./validate";
import Link from "next/link";

const Register: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = async () => {
    setErrors(validate(fields));
    if (Object.keys(errors).length === 0) {
      try {
        const resultAction = await dispatch(registerUserAsync(fields));

        if (registerUserAsync.fulfilled.match(resultAction)) {
          const cookies = resultAction.payload.cookies;
          const responseData = resultAction.payload.responseData;

          dispatch(setUserStatus({ isAuthenticated: true, user: responseData }));
        } else if (registerUserAsync.rejected.match(resultAction)) {
          console.error("Error en el registro:", resultAction.error);
        }
      } catch (error) {
        console.error("Error en el registro:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFields({ ...fields, [name]: value });
    setErrors(validate({ ...fields, [name]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 h-screen flex justify-center items-center">
      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl text-center">Autenticación</h2>
        {isAuthenticated ? (
          <div>
            <p>¡Registro exitoso! Puedes iniciar sesión ahora.</p>
            <Link href="../../Views/Login">Iniciar Sesión</Link>
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-600 dark:text-gray-200">First Name</label>
              <input
                type="text"
                name="firstName"
                value={fields.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-600 dark:text-gray-200">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={fields.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
            </div>
            <div>
              <label htmlFor="username" className="block text-sm text-gray-600 dark:text-gray-200">Username</label>
              <input
                type="text"
                name="username"
                value={fields.username}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.username && <p className="text-red-500">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-200">Email Address</label>
              <input
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-600 dark:text-gray-200">Password</label>
              <input
                type="password"
                name="password"
                value={fields.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div>
              <button
                onClick={handleRegister}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Registrarse
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
