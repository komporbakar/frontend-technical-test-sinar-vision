import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axiosInstance from '../../utils/axiosInstance';

export default function Preview() {
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit] = useState(5); // Limit per halaman

  const fetchPosts = async (page = 0) => {
    try {
      const response = await axiosInstance.get(`/article/${limit}/${page * limit}`);
      setPosts(response.data.data);
      setPageCount(Math.ceil(response.data.total / limit)); // Total halaman
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Published Posts</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Content</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id} className="border-b">
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4 w-96 line-clamp-4">{post.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"flex space-x-2"}
          pageClassName={"pagination-item"}
          pageLinkClassName={"pagination-link"}
          previousClassName={"pagination-item"}
          previousLinkClassName={"pagination-link"}
          nextClassName={"pagination-item"}
          nextLinkClassName={"pagination-link"}
          breakClassName={"pagination-item"}
          breakLinkClassName={"pagination-link"}
          activeClassName={"bg-blue-500 text-white"}
        />
      </div>
    </div>
  );
}
