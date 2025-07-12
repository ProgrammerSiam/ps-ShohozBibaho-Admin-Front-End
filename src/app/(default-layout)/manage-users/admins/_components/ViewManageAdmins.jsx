"use client";

import { Badge } from "@/components/ui/badge";
import CustomPagination from "@/components/ui/CustomPagination";
import Search from "@/components/ui/Search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import EditAdminModal from "./EditAdminModal";
import { dateWithTimeConverter } from "@/utils/date_time_converter";
import AddAdminModal from "./AddAdminModal";
import {
  deleteAdminData,
  fetchAdmins,
  resetAdmins,
} from "@/redux/features/admin/adminSlice";
import handleDelete from "@/utils/handleDelete";

const ViewManageAdmins = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { admins, status } = useSelector((state) => state.admin);

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

  // handling delete admin
  const handleDeleteUser = (id) => {
    handleDelete({
      id,
      deleteAction: deleteAdminData,
      fetchAction: fetchAdmins,
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

    dispatch(fetchAdmins(query));
    // reset
    return () => {
      dispatch(resetAdmins());
    };
  }, [dispatch, search, currentPage, itemsPerPage]);

  return (
    <div className="space-y-5 px-4 md:space-y-7 lg:space-y-10">
      {/* header & search */}
      <div className="dashboard-pb">
        <div className="rounded-md border border-gray-200 bg-white p-4 md:p-5">
          <h2 className="mb-4 text-center text-xl font-medium md:mb-7 md:text-2xl md:font-bold md:tracking-wide">
            Manage Admins
          </h2>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Search handleSearch={handleSearch} />

            <AddAdminModal setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table className="border border-gray-200 bg-white">
        <TableHeader>
          <TableRow className="bg-gray-200 hover:bg-gray-200">
            <TableHead>SN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin Since</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins?.admins?.map((admin, index) => (
            <TableRow key={admin._id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell className="text-nowrap">{admin.name}</TableCell>
              <TableCell className="text-nowrap">{admin.email}</TableCell>
              <TableCell className="text-nowrap">
                {dateWithTimeConverter(admin.created_at)}
              </TableCell>

              <TableCell
                className={`font-medium text-nowrap capitalize ${admin.is_active ? "text-green-500" : "text-red-500"}`}
              >
                {admin.is_active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="space-x-3">
                {/* edit admin */}
                <EditAdminModal admin={admin} setCurrentPage={setCurrentPage} />

                <button
                  type="button"
                  title="Delete"
                  onClick={() => handleDeleteUser(admin._id)}
                  className="delete-btn cursor-pointer"
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
        totalPages={admins?.totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewManageAdmins;
