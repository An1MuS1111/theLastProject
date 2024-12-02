import { useState, useEffect, useMemo } from "react";
import TableHeading from "../../components/Table/TableHeading";
import TablePaginationNav from "../../components/Table/TablePaginationNav";
import { UsersType } from "../../types/UsersType";
import axiosInstance from "../../axiosInstance/axiosInstance";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Users = () => {
  const [usersData, setUsersData] = useState<UsersType[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Items per page

  useEffect(() => {
    //  Fetching UsersData
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
  }, [usersData]);

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

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

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
  }, [sortField, sortDirection, usersData]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedUsers.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, sortedUsers]);

  const formatDateTime = (date: Date | string) => {
    const parsedDate = date instanceof Date ? date : new Date(date);
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
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search Members"
            aria-label="Search Members"
            className="dark:bg-gray-800 border dark:border-gray-700 text-sm rounded-lg pl-10 pr-3 py-2 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto  border border-gray-700 text-xs">
          <thead className="bg-gray-800">
            <tr>
              {headers.map((key) => (
                <TableHeading
                  key={key}
                  name={key}
                  sortable={
                    key === "password" ||
                    key === "telephone" ||
                    key === "is_admin"
                      ? false
                      : true
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
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {paginatedUsers.map((user, rowIndex) => (
              <tr key={rowIndex}>
                {Object.entries(user).map(([, value], colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-3 py-3 text-xs text-gray-300 border-collapse border border-gray-700"
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
      <TablePaginationNav
        currentPage={currentPage}
        totalPages={Math.ceil(usersData.length / pageSize)}
        pageSize={pageSize}
        totalItems={usersData.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // Reset to first page
        }}
      />
    </div>
  );
};

export default Users;
