import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "../../components/Layout/Dashboard";
import CategoryService from "../../services/CategoryService";
import { useRouter } from "next/router";
import Link from "next/link";
import App from "../../constants/App";
import Button from "../../components/Button";
import BrandService from "../../services/BrandService";
import AuthService from "../../services/AuthService";

const authService = new AuthService()
const brandService = new BrandService();

const BrandList = () => {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const loadbrands = async () => {
      const brands = await brandService.getAll();
      setBrands(brands);
    }

    loadbrands();
  }, [])

  const remove = async (category) => {
    await brandService.remove(category.id);
    const registers = brands.filter(item => item.id != category.id);
    setBrands(registers);
  }


  return (
    <>
      <Dashboard title="Brands" authService={authService}>
        <>
          <div className="container">

            <Button route={App.ROUTES.NEW_BRAND} title="New" />

            <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
              <thead className="">
                <tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th  className="p-3 text-left">Imagem</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left" width="110px">Actions</th>
                </tr>
              </thead>
              <tbody className="flex-1 sm:flex-none">
                {
                  (brands || []).map(item => {
                    return (
                      <tr key={item.id} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3">
                          <img src={item.image} width="100px" height="100px" />
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{item.name}</td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                          onClick={() => remove(item)}
                        >Delete
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                          onClick={() => router.push("/brand/edit/" + item.id)}
                        >Editar
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <style dangerouslySetInnerHTML={{ __html: "\n  html,\n  body {\n    height: 100%;\n  }\n\n  @media (min-width: 640px) {\n    table {\n      display: inline-table !important;\n    }\n\n    thead tr:not(:first-child) {\n      display: none;\n    }\n  }\n\n  td:not(:last-child) {\n    border-bottom: 0;\n  }\n\n  th:not(:last-child) {\n    border-bottom: 2px solid rgba(0, 0, 0, .1);\n  }\n" }} />
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

export default BrandList
