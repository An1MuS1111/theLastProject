import { useState, useEffect, useMemo } from "react";
import TableHeading from "../../components/Table/TableHeading"; // Assuming TableHeading is in the same folder.
import TablePaginationNav from "../../components/Table/TablePaginationNav";
import { UsersType } from "../../types/UsersType";
import axiosInstance from "../../axiosInstance/axiosInstance";

const Users = () => {
  const [usersData, setUsersData] = useState<UsersType[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  useEffect(() => {
    //  fetching UsersData
    (async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const headers = useMemo(() => {
    return usersData.length > 0 ? Object.keys(usersData[0]) : [];
  }, [usersData]); // **Updated: Used `useMemo` to avoid recalculating headers on every render.**

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    if (!sortField || !sortDirection) return usersData;

    return [...usersData].sort((a, b) => {
      const aValue = a[sortField as keyof UsersType];
      const bValue = b[sortField as keyof UsersType];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      return 0;
    });
  }, [sortField, sortDirection, usersData]); // **Updated: Added `usersData` dependency to prevent stale state.**

  const formatDateTime = (date: Date | string) => {
    const parsedDate = date instanceof Date ? date : new Date(date); // **Updated: Handle string dates.**
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(parsedDate);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 text-xl font-semibold text-black dark:text-white flex items-center justify-between">
        <h2 className="text-lg font-semibold">Team Members</h2>
        <input
          type="text"
          placeholder="Search Members"
          aria-label="Search Members"
          className="dark:bg-gray-800 border dark:border-gray-700 text-sm rounded-lg px-3 py-2 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              {headers.map((key) => (
                <TableHeading
                  key={key}
                  name={key}
                  sortable={
                    key === "email" ||
                    key === "name" ||
                    key === "created_at" ||
                    key === "modified_at"
                      ? true
                      : false
                  }
                  sort_field={sortField}
                  sort_direction={sortDirection}
                  sortChanged={handleSortChange}
                >
                  {key}
                </TableHeading>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {sortedUsers.map((user, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(user).map(([key, value], colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-4 py-2 text-sm text-gray-300"
                  >
                    {value instanceof Date
                      ? formatDateTime(value)
                      : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePaginationNav currentPage={1} totalPages={1} basePath="/" />
    </div>
  );
};

export default Users;
