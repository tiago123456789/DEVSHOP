import React, { useEffect, useState } from "react";
import Dashboard from "../../../components/Layout/Dashboard";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import ErrorValidation from "../../../components/ErrorValidation";
import BrandService from "../../../services/BrandService";
import BrandValidation from "../../../validations/BrandValidation";
import App from "../../../constants/App";
import { FileUtil } from "../../../utils/file-util";

const brandService = new BrandService();

export default ({ id }) => {
    const [brands, setBrands] = useState({});
    const router = useRouter();
    const formik = useFormik({
        initialValues: brands,
        validationSchema: BrandValidation,
        enableReinitialize: true,
        onSubmit: async values => {
            await brandService.update(values);
            // @ts-ignore
            values.file = await FileUtil.parseToBase64Url(values.file);
            // @ts-ignore
            await brandService.updateLogoBrand(brands.id, values.file);
            router.push(App.ROUTES.BRAND);
        },
    });

    const handlerFile = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue('file', file)
    }

    useEffect(() => {
        const loadbrandsById = async () => {
            const brands = await brandService.getById(id);
            setBrands(brands);
        }

        loadbrandsById();
    }, []);


    return (
        <>
            <Dashboard title="Editar categoria">
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
                                        <ErrorValidation value={formik.errors["name"]} />

                                    </div>
                                </div>
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

export function getServerSideProps(context) {
    return {
        props: {
            id: context.params.id
        }
    }
}