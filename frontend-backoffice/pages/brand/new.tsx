import React from "react";
import Dashboard from "../../components/Layout/Dashboard";
import ErrorValidation from "../../components/ErrorValidation";
import CategoryService from "../../services/CategoryService";
import App from "../../constants/App";
import { useFormik } from "formik";
import slugify from "slugify";
import { useRouter } from "next/router";
import BrandValidation from "../../validations/BrandValidation";
import BrandService from "../../services/BrandService";
import { FileUtil } from "../../utils/file-util";
import AuthService from "../../services/AuthService";

const authService = new AuthService()
const brandService = new BrandService();

const NewBrand = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: BrandValidation,
    onSubmit: async values => {
      const brandId = await brandService.create(values);
      // @ts-ignore
      values.file = await FileUtil.parseToBase64Url(values.file);
      // @ts-ignore
      await brandService.updateLogoBrand(brandId, values.file);
      router.push(App.ROUTES.BRAND);
    },
  });

  const handlerFile = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue('file', file)
  }

  return (
    <>
      <Dashboard title="Criar brand">
        <>
          {/* component */}
          <div className="container">

            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid">
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
                </div>
                <div className="grid">
                  <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Logo</label>
                    <input id="username" type="file" name="file"
                    onChange={handlerFile}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white
                     border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300
                      dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500
                       focus:outline-none focus:ring" />
                    {/* <ErrorValidation value={formik.errors["i"]}/> */}
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
    return  {
      props: {}
    };
  }
  return {
    props: {}
  }
}


export default NewBrand