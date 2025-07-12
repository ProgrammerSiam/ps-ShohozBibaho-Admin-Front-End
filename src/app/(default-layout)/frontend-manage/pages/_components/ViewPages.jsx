"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/ui/CustomPagination";
import Search from "@/components/ui/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteDynamicPageById,
  fetchDynamicPages,
  resetPages,
} from "@/redux/features/dynamicPage/dynamicPageSlice";
import handleDelete from "@/utils/handleDelete";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

const ViewPages = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { pages, status } = useSelector((state) => state.page);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search?.value);
    setCurrentPage(1);
  };

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage?.selected + 1);
  };

  // handling delete page
  const handleDeletePage = (id) => {
    handleDelete({
      id,
      deleteAction: deleteDynamicPageById,
      fetchAction: fetchDynamicPages,
      dispatch,
      currentPage,
    });
  };

  useEffect(() => {
    let query = {
      currentPage,
      limit: itemsPerPage,
      search,
    };
    dispatch(fetchDynamicPages(query));
    // reset
    return () => {
      dispatch(resetPages());
    };
  }, [dispatch, search, currentPage, itemsPerPage]);

  return (
    <div>
      {/* Header & Search */}
      <div className="mb-5 rounded-md bg-white p-4 md:mb-7 md:p-5">
        <h2 className="mb-4 text-center text-xl font-medium md:mb-7 md:text-2xl md:font-bold md:tracking-wide">
          All Pages
        </h2>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Search handleSearch={handleSearch} />
          <div>
            <Button asChild>
              <Link href="/frontend-manage/pages/add">+ Create Page</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Table */}
      <Table className="border border-gray-200 bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages?.dynamicPages?.map((page, index) => (
            <TableRow key={page._id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>{page.title}</TableCell>
              <TableCell>{page.slug}</TableCell>
              <TableCell
                className={`font-medium text-nowrap capitalize ${page.is_active ? "text-green-500" : "text-red-500"}`}
              >
                {page.is_active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="space-x-3">
                <Link href={`/frontend-manage/pages/${page.slug}`}>
                  <button type="button" title="edit" className="edit-btn">
                    <TiEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeletePage(page._id)}
                  type="button"
                  title="delete"
                  className="delete-btn"
                >
                  <RiDeleteBinLine />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={pages?.totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewPages;
