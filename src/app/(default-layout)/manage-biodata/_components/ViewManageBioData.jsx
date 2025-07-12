"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/ui/CustomPagination";
import Search from "@/components/ui/Search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";

const API_URL = process.env.API_URL || "http://localhost:5000/api";

// Helper function to format date
const dateWithTimeConverter = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper to calculate age from dateOfBirth
const getAge = (dateOfBirth) => {
  if (!dateOfBirth) return "N/A";
  const dob = new Date(dateOfBirth);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
};

const ViewManageBioData = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [itemsPerPage] = useState(10);
  const [biodata, setBiodata] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  // Fetch biodata from API
  useEffect(() => {
    const fetchBiodata = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          currentPage: currentPage.toString(),
          limit: itemsPerPage.toString(),
          type: filter,
          search: search,
        });
        const res = await fetch(`${API_URL}/admin/manage-biodata?${params}`);
        if (!res.ok) throw new Error("Failed to fetch biodata");
        const data = await res.json();
        console.log("Fetched biodata:", data);
        setBiodata(data?.data?.allBioData || []);
        setTotalPages(data?.data?.totalPages || 1);
      } catch (err) {
        setError(err.message);
        setBiodata([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBiodata();
  }, [search, currentPage, itemsPerPage, filter]);

  // Calculate pagination (from API)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = biodata;

  return (
    <div className="space-y-5 px-4 md:space-y-7 lg:space-y-10">
      {/* header & search */}
      <div className="dashboard-pb">
        <div className="rounded-md border border-gray-200 bg-white p-4 md:p-5">
          <h2 className="mb-4 text-center text-xl font-medium md:mb-7 md:text-2xl md:font-bold md:tracking-wide">
            Manage Biodata
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
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Not Submitted">Not Submitted</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && <div className="py-8 text-center">Loading...</div>}
      {error && <div className="py-8 text-center text-red-500">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <Table className="border border-gray-200 bg-white">
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-200">
              <TableHead>SN</TableHead>
              <TableHead>Biodata ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((biodata, index) => (
              <TableRow key={biodata._id}>
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell className="font-medium text-nowrap text-blue-600">
                  {biodata.biodataId || biodata.BiodataId || biodata.biodata_id}
                </TableCell>
                <TableCell className="font-medium text-nowrap">
                  {biodata.whosBiodata?.fullName || "N/A"}
                </TableCell>
                <TableCell className="text-nowrap">
                  {getAge(biodata.personalInfo?.dateOfBirth)} years
                </TableCell>
                <TableCell className="text-nowrap">
                  {biodata.addressInfo?.currentAddress?.city ||
                    biodata.addressInfo?.currentAddress?.district ||
                    "N/A"}
                </TableCell>
                <TableCell
                  className="max-w-[200px] truncate text-nowrap"
                  title={biodata.educationInfo?.educationCategory}
                >
                  {biodata.educationInfo?.educationCategory || "N/A"}
                </TableCell>
                <TableCell
                  className="max-w-[150px] truncate text-nowrap"
                  title={biodata.professionalInfo?.profession}
                >
                  {biodata.professionalInfo?.profession || "N/A"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      biodata.bioDataStatus === "Approved"
                        ? "default"
                        : "secondary"
                    }
                    className={`font-medium text-nowrap capitalize ${
                      biodata.bioDataStatus === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {biodata.bioDataStatus || "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-nowrap text-gray-600">
                  {dateWithTimeConverter(
                    biodata.createdAt || biodata.created_at,
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3"
                    onClick={() =>
                      router.push(`/manage-biodata/${biodata._id}`)
                    }
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ViewManageBioData;
