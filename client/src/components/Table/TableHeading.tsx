import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

interface TableHeadingProps {
  name: string;
  sortable?: boolean;
  sort_field?: string | null;
  sort_direction?: "asc" | "desc" | null;
  sortChanged?: (field: string) => void;
  children: React.ReactNode;
}

const TableHeading: React.FC<TableHeadingProps> = ({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
}) => {
  return (
    <th onClick={() => sortable && sortChanged(name)} className="cursor-pointer">
      <div className="px-3 py-3 flex items-center justify-between gap-1">
        {children}
        {sortable && (
          <div className="flex flex-col items-center">
            <ChevronUpIconComponent
              name={name}
              sort_field={sort_field}
              sort_direction={sort_direction}
            />
            <ChevronDownIconComponent
              name={name}
              sort_field={sort_field}
              sort_direction={sort_direction}
            />
          </div>
        )}
      </div>
    </th>
  );
};

interface ChevronIconProps {
  name: string;
  sort_field?: string | null;
  sort_direction?: "asc" | "desc" | null;
}

const ChevronUpIconComponent: React.FC<ChevronIconProps> = ({
  name,
  sort_field,
  sort_direction,
}) => {
  return (
    <ChevronUpIcon
      className={`w-4 ${
        sort_field === name && sort_direction === "asc" ? "text-white" : "text-gray-400"
      }`}
    />
  );
};

const ChevronDownIconComponent: React.FC<ChevronIconProps> = ({
  name,
  sort_field,
  sort_direction,
}) => {
  return (
    <ChevronDownIcon
      className={`w-4 ${
        sort_field === name && sort_direction === "desc" ? "text-white" : "text-gray-400"
      }`}
    />
  );
};

export default TableHeading;
