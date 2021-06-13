import React from "react";
import Dashboard from "../../components/Layout/Dashboard";
import ErrorValidation from "../../components/ErrorValidation";
import CategoryService from "../../services/CategoryService";
import App from "../../constants/App";
import { useFormik } from "formik";
import slugify from "slugify";
import { useRouter } from "next/router";
import CategoryValidation from "../../validations/CategoryValidation";

export default () => {
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

  const renderError = () => {
    if (Object.keys(formik.errors).length == 0) {
      return false;
    }
    // @ts-ignore
    return (
      <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
        {
          Object.keys(formik.errors).map(key => {
            return (<><br/><p>{formik.errors[key]}</p><br/></>)
          })
        }
      </div>

    )
  }

  return (
    <>
      <Dashboard title="Criar categoria">
        <>
          {/* component */}
          <div className="container">
          {/* {renderError()} */}

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