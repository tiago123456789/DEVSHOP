import React from "react";
import Dashboard from "../../components/Layout/Dashboard";
import ErrorValidation from "../../components/ErrorValidation";
import CategoryService from "../../services/CategoryService";
import App from "../../constants/App";
import { useFormik } from "formik";
import slugify from "slugify";
import { useRouter } from "next/router";
import CategoryValidation from "../../validations/CategoryValidation";
import AuthService from "../../services/AuthService";

const authService = new AuthService()

const NewCategory = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    validationSchema: CategoryValidation,
    onSubmit: async values => {
      values.slug = slugify(values.name);
      await new CategoryService().create(values);
      router.push(App.ROUTES.CATEGORY);
    },
  });

  return (
    <>
      <Dashboard title="Criar categoria">
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
                    <ErrorValidation value={formik.errors["name"]}/>
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
                    <ErrorValidation value={formik.errors["slug"]}/>
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



export async function getServerSideProps(context) {
  if (!authService.isAuthenticated(context)) {
    context.res.writeHead(302, { Location: '/login' }).end()
    return {
      props: {}
    };
  }
  return {
    props: {}
  }
}

export default NewCategory