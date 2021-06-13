import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "../../components/Layout/Dashboard";
import CategoryService from "../../services/CategoryService";
import { useFormik } from "formik";
import slugify from "slugify";
import { useRouter } from "next/router";
import ProductService from "../../services/ProductService";
import App from "../../constants/App";
import ProductValidation from "../../validations/ProductValidation";
import ErrorValidation from "../../components/ErrorValidation";

const productService = new ProductService();

export default () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      slug: '',
      description: ''
    },
    validationSchema: ProductValidation,
    onSubmit: async values => {
      values.slug = slugify(values.name);
      await productService.create(values);
      router.push(App.ROUTES.PRODUCT);
    },
  });

  return (
    <>
      <Dashboard title="Criar produto">
        <>
          {/* component */}
          <div className="container">
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Name</label>
                    <input id="username" type="text" name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white
                     border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300
                      dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500
                       focus:outline-none focus:ring" />
                       <ErrorValidation value={formik.errors["name"]} />
                  </div>
                  <div>
                    <label className="text- ray-700 dark:text-gray-200" htmlFor="emailAddress">Slug</label>
                    <input id="emailAddress"
                      onChange={formik.handleChange}
                      value={slugify(formik.values.name)}
                      name="slug"
                      type="text" 
                      readOnly={true} 
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white 
                    border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 
                    dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 
                    focus:outline-none focus:ring" />
                      <ErrorValidation value={formik.errors["slug"]} />
                  </div>
                  <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Description</label>
                    <textarea id="username" name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white
                     border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300
                      dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500
                       focus:outline-none focus:ring" ></textarea>
                    <ErrorValidation value={formik.errors["description"]} />

                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                </div>
              </form>
            </section>

          </div>

        </>

      </Dashboard>
    </>
  );
}