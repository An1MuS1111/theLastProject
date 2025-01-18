import React, { useState, ReactNode } from "react";
import { Page } from "@/dashboard/ProductsDashboard";
import Header from "@/components/Header";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { Pagination } from "@/components/Pagination";
const ProductsDashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* remove bg-gray-300 */}
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-gray-300">
            <div className="flex items-center gap-2 px-4">
              {/* Here was the SideBarTrigger */}
              {/* <SidebarTrigger className="-ml-1" /> */}
            </div>
          </header>
          <div>
            <Breadcrumb className="pl-4 py-2 bg-gray-200">
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <SidebarTrigger className="-ml-1" />

                  {/* <BreadcrumbLink href="#">Products</BreadcrumbLink> */}
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
              {children}
            </div>
          </div>
          {/* Here goes the pagination */}
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default ProductsDashboard;
