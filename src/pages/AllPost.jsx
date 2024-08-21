import React, { useEffect, useState } from "react";
import { TiEdit, TiTrash } from "react-icons/ti";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function AllPost() {
    let [data, setData] = useState([])
    const [filter, setFilter] = useState("Publish")

    const fetchData = async () => {
        axiosInstance.get("/article/100/0").then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

   const dataFilter = () => {
    return data.filter((d) => d.status === filter);
  };

  const handleSubmit = (id,status) => async() => {
    console.log(status)
    const fetchData = await axiosInstance.get(`/article/${id}`);
    await axiosInstance.put(`/article/${id}`, {
      title: fetchData.data.data.title,
      content: fetchData.data.data.content,
      category: fetchData.data.data.category,
      status: status
    }).then((res) => {
        window.location.reload();
    }).then((err) => {
        console.log("error", err)
    })
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dataFilter();
  }, [filter]);
  return (
    <div>
      <div className="flex flex-row space-x-3 justify-center mb-10">
        <div className="bg-green-300 p-2  min-w-[100px] rounded-lg text-center cursor-pointer" onClick={() => setFilter("Publish")}>
          Published
        </div>
        <div className="bg-yellow-300 p-2 min-w-[100px] rounded-lg text-center cursor-pointer" onClick={() => setFilter("Draft")}>
          Draft
        </div>
        <div className="bg-red-300 p-2 min-w-[100px] rounded-lg text-center cursor-pointer" onClick={() => setFilter("Thrash")}>
          Trashed
        </div>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataFilter().map((article, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {article.title}
                </th>
                <td className="px-6 py-4">{article.category}</td>
                <td className="px-6 py-4 flex flex-row justify-center items-center">
                  <Link
                    to={"/edit/" + article.id}
                    className="font-medium text-2xl text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <TiEdit />
                  </Link>
                  <button
                    onClick={handleSubmit(article.id,"Thrash")}
                    className="font-medium text-2xl text-red-600 dark:text-red-500 hover:underline ml-4"
                  >
                    <TiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
