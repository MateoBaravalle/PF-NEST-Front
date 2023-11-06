"use client";
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import validate from "@/app/Handlers/validation";
import axios from "axios";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/app/components/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

interface Values {
  days: string;
  condition: string;
  type: string;
  images: string[];
  title: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  floorNumber: string;
  aptNumber: string;
  price: string;
  description: string;
}

export default function Formulario() {
  const [focused, setFocused] = useState<string | null>(null);

  const [files, setFile] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Values>({
    days: "",
    condition: "",
    type: "",
    images: [],
    title: "",
    country: "",
    city: "",
    streetName: "",
    streetNumber: "",
    floorNumber: "",
    aptNumber: "",
    price: "",
    description: "",
  });

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      handleImages(acceptedFiles);
    },
  });

  const disable = () => {
    for (let error in errors) {
      if (errors[error] !== "" && errors[error].length !== 0) {
        return true;
      }
    }
    return false;
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setErrors(
      validate({
        ...values,
        [event.target.name]: event.target.value,
      })
    );
  }

  const handleImages = async (files: File[]) => {
    const promises = files.map(async (file) => {
      const formFile = new FormData();
      formFile.append("files", file);

      try {
        const response = await axios.post("http://localhost:3001/posts/upload", formFile);
        return response.data;
      } catch (error) {
        console.error("Error al realizar la solicitud POST:", error);
        throw error;
      }
    });

    try {
      const newImages = await Promise.all(promises);

      setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, ...newImages],
      }));

      setErrors(
        validate({
          ...values,
          images: [...values.images, ...newImages],
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formErrors = validate(values);
    setErrors(formErrors);
    try {
      const response = await axios.post("http://localhost:3001/posts", values);

      console.log("respuesta de la solicitud post:", response.data);

      if (response.status === 200 || response.status === 201) {
        if (response.data && response.data.id) {
          Swal.fire({
            icon: "success",
            title: "Creado con Éxito",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al Crear",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al Crear",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud POST:", error);

      Swal.fire({
        icon: "error",
        title: "Error al Crear",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  useEffect(() => {}, []);

  return (
    <div>
      <div className="p-4 bg-[#fc9a84]">
        <nav className="flex items-center justify-between sm:h-10">
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <Link href="../../Views/home" className="font-medium text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="../../Views/Buy" className="font-medium text-gray-500 hover:text-gray-900">
              Venta
            </Link>
            <Link href="../../Views/Rent" className="font-medium text-gray-500 hover:text-gray-900">
              Alquiler
            </Link>
            <Link href="" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in
            </Link>
          </div>
        </nav>
      </div>

      <div className="flex items-center justify-center min-h-screen p-5 md:p-10 mt-0 z-10">
        <div className="md:flex md:items-center z-10">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-100 p-5 md:p-5 rounded-lg shadow-md max-w-3x1 z-10"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="mb-5">
              <label className="block text-gray-800 font-bold mb-2">Título: </label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused(null)}
                className="border-2 border-gray-300 p-2 w-3/4 rounded-lg"
              />
              <div className="mb-2">
                {errors.title && focused === "title" && (
                  <span className="text-red-500 text-sm">{errors.title}</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
