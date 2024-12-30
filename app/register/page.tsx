"use client";

import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useCreateUserMutation } from '../../redux/features/user/userApi'
import { PageTitle } from "components/pageTitle";
import { useEffect } from "react";
import { handleError, handleSuccess } from "core/commons";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [registerUser, {isError, error, isSuccess}] = useCreateUserMutation() ;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      registerUser(values);
      setSubmitting(false);
      resetForm();
    },
  });

  useEffect(() => {
    if (isError) {
      const apiError = error as ApiError; 
      handleError(apiError.data.message || 'An error occurred');
    };
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      handleSuccess('Successful');
      router.push('/login');
    };
  }, [isSuccess, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <PageTitle title={'Register'}/>

        <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-black border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nicolas"
                required
              />
              <small>{formik.errors.name && formik.touched.name && formik.errors.name}</small>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-black border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="nicolas@coally.com"
                required
              />
              <small>{formik.errors.email && formik.touched.email && formik.errors.email}</small>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Your password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <small>{formik.errors.password && formik.touched.password && formik.errors.password}</small>
            </div>
            <div className="mb-6">
              <label htmlFor="password_confirmation" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Confirm your password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password_confirmation}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <small>{formik.errors.password_confirmation && formik.touched.password_confirmation && formik.errors.password_confirmation}</small>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              type="submit"
                disabled={formik.isSubmitting}
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Register
              </button>
              <Link
                href={'/login'}
                passHref
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                >
                Go Back
              </Link>
            </div>
          </form>
      </main>
    </div>
  );
}
