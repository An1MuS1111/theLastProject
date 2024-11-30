import React from "react";
import TableHeading from "./TableHeading"; // Assuming TableHeading is in the same folder.

interface Users {
  email: string;
  password: string;
  name: string;
  telephone: number;
  is_admin: boolean;
  created_at: Date;
  modified_at: Date;
}

const UsersInfo: Users[] = [
  {
    email: "johndoe@example.com",
    password: "hashed_password_123",
    name: "John Doe",
    telephone: 1234567890,
    is_admin: false,
    created_at: new Date("2024-11-30T12:34:56Z"),
    modified_at: new Date("2024-11-30T12:34:56Z"),
  },
  {
    email: "janedoe@example.com",
    password: "hashed_password_456",
    name: "Jane Doe",
    telephone: 9876543210,
    is_admin: true,
    created_at: new Date("2024-10-15T09:15:30Z"),
    modified_at: new Date("2024-11-01T10:20:45Z"),
  },
  {
    email: "michael.smith@example.com",
    password: "hashed_password_789",
    name: "Michael Smith",
    telephone: 5551234567,
    is_admin: false,
    created_at: new Date("2023-08-20T14:00:00Z"),
    modified_at: new Date("2024-11-28T18:45:20Z"),
  },
];

const headers = UsersInfo.length > 0 ? Object.keys(UsersInfo[0]) : [];

const TableComponent = () => {
  // State for sorting
  const [sortField, setSortField] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc" | null>(null);

  const handleSortChange = (field: string) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      // New field, set to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Optionally sort the data
  const sortedUsers = React.useMemo(() => {
    if (!sortField || !sortDirection) return UsersInfo;
    return [...UsersInfo].sort((a, b) => {
      const aValue = a[sortField as keyof Users];
      const bValue = b[sortField as keyof Users];
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
      return 0; // Handle other cases if necessary
    });
  }, [sortField, sortDirection]);

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
                  sortable={true}
                  sort_field={sortField}
                  sort_direction={sortDirection}
                  sortChanged={handleSortChange}
                >
                  {key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
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
                    {value instanceof Date ? value.toISOString() : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
