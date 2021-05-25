import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "../../components/Layout/Dashboard";
import CategoryService from "../../services/CategoryService";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const loadCategories = async () => {
      const categories = await new CategoryService().getAll();
      setCategories(categories);
    }

    loadCategories();
  }, [])

  const remove = async (category) => {
    await new CategoryService().remove(category.id); 
    const registers = categories.filter(item => item.id != category.id);
    setCategories(registers);
  }


  return (
    <>
      <Dashboard title="Dashboard">
        <>
          <div className="container">
            <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
              <thead className="">
                <tr className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="p-3 text-left">Id</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left" width="110px">Actions</th>
                </tr>
              </thead>
              <tbody className="flex-1 sm:flex-none">
                { 
                  (categories || []).map(category => {
                    return (
                      <tr key={category.id} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3">{category.id}</td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">{category.name}</td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                        onClick={() => remove(category)}
                        >Delete
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer"
                        onClick={() => router.push("/categories/edit/" + category.id)}
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