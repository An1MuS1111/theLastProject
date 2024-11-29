import React from 'react'

const TableComponent = () => {
  return (
    <div className="bg-gray-900 text-gray-200 p-4 rounded-lg shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">Team Members</h2>
      <input
        type="text"
        placeholder="Search Members"
        className="bg-gray-800 border border-gray-700 text-sm rounded-lg px-3 py-2 text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
              <input type="checkbox" className="rounded border-gray-700 text-blue-500 focus:ring-blue-500" />
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Member</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Location</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">

          <tr>
            <td className="px-4 py-2">
              <input type="checkbox" className="rounded border-gray-700 text-blue-500 focus:ring-blue-500" />
            </td>
            <td className="px-4 py-2 flex items-center gap-3">
              <img
                src="https://via.placeholder.com/32"
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Tyler Hero</p>
                <p className="text-sm text-gray-500">26 tasks</p>
              </div>
            </td>
            <td className="px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🇪🇪</span>
                <p className="text-sm">Estonia</p>
              </div>
            </td>
            <td className="px-4 py-2">
              <span className="bg-green-500 text-sm text-white px-3 py-1 rounded-full">Active</span>
            </td>
            <td className="px-4 py-2">
              <button className="text-blue-500 text-sm font-medium hover:underline">Edit</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  
    <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <label  className="text-gray-400">Show</label>
        <select
          id="rowsPerPage"
          className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-2 py-1 focus:ring-blue-500 focus:outline-none"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span>per page</span>
      </div>
  
      <div className="flex items-center gap-3">
        <span>1-5 of 9</span>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
            disabled
          >
            &lt;
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">1</button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">2</button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">&gt;</button>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default TableComponent