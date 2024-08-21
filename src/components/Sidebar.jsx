import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='w-[250px] h-screen bg-gray-200 py-3 flex flex-col'>
        <h1 className='text-3xl mt-2 font-medium text-center'>Sidebar</h1>
        <ul className='mt-5 '>
            <li className=''>
                <Link to={"/"} className='block p-2 hover:bg-gray-300 text-xl font-normal '>All Post</Link>
            </li>
            <li className=''>
                <Link to={"/addnew"} className='block p-2 hover:bg-gray-300 text-xl font-normal '>Add New</Link>
            </li>
            <li className=''>
                <Link to={"/preview"} className='block p-2 hover:bg-gray-300 text-xl font-normal '>Preview</Link>
            </li>
        </ul>
    </div>
  )
}
