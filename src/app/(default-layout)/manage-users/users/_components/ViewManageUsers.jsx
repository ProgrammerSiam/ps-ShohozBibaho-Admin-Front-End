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
import EditUserModal from "./EditUserModal";
import {
  deleteUserData,
  fetchUsers,
  resetUsers,
} from "@/redux/features/user/userSlice";
import { dateWithTimeConverter } from "@/utils/date_time_converter";
import handleDelete from "@/utils/handleDelete";
// import EditUserModal from "./EditUserModal";

const ViewManageUsers = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("true");
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.user);

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

  // Function to handle filter
  const handleSelectChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  // handling delete user
  const handleDeleteUser = (id) => {
    handleDelete({
      id,
      deleteAction: deleteUserData,
      fetchAction: fetchUsers,
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

    if (filter !== null && filter !== "all") {
      query.is_active = filter;
    }

    dispatch(fetchUsers(query));
    // reset
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch, search, currentPage, itemsPerPage, filter]);

  return (
    <div className="space-y-5 px-4 md:space-y-7 lg:space-y-10">
      {/* header & search */}
      <div className="dashboard-pb">
        <div className="rounded-md border border-gray-200 bg-white p-4 md:p-5">
          <h2 className="mb-4 text-center text-xl font-medium md:mb-7 md:text-2xl md:font-bold md:tracking-wide">
            All Users
          </h2>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Search handleSearch={handleSearch} />

            <div>
              <Select onValueChange={(value) => handleSelectChange(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="opacity-80">Status</SelectLabel>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                    <SelectItem value="all">All Users</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
            <TableHead>Register At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.users?.map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell className="text-nowrap">{user.name}</TableCell>
              <TableCell className="text-nowrap">{user.email}</TableCell>
              <TableCell className="text-nowrap">
                {dateWithTimeConverter(user.created_at)}
              </TableCell>

              <TableCell
                className={`font-medium text-nowrap capitalize ${user.is_active ? "text-green-500" : "text-red-500"}`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="space-x-3">
                {/* edit user */}
                <EditUserModal user={user} setCurrentPage={setCurrentPage} />

                <button
                  type="button"
                  title="Delete"
                  onClick={() => handleDeleteUser(user._id)}
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
        totalPages={users?.totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewManageUsers;
