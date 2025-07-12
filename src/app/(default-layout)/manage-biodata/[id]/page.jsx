"use client";
import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";

const API_URL = process.env.API_URL || "http://localhost:5000/api";

function dateWithTimeConverter(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAge(dateOfBirth) {
  if (!dateOfBirth) return "N/A";
  const dob = new Date(dateOfBirth);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

export default function BiodataDetailsPage() {
  const params = useParams();
  const id = params?.id;
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const requiredText = "DELETE";

  useEffect(() => {
    if (!id) return;
    const fetchBiodata = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/admin/manage-biodata/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        console.log("Fetched biodata by id:", data);
        setBiodata(data?.data || null);
      } catch (err) {
        setError(err.message);
        setBiodata(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBiodata();
  }, [id]);

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error || !biodata) return notFound();

  // Fallback helpers
  const get = (obj, path, fallback = "N/A") => {
    return (
      path
        .split(".")
        .reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj) ??
      fallback
    );
  };

  const handleApprove = () => {
    Swal.fire({
      icon: "success",
      title: "Approved!",
      text: "The biodata has been approved.",
      confirmButtonText: "OK",
    });
  };

  const handleReject = () => {
    Swal.fire({
      icon: "warning",
      title: "Rejected!",
      text: "The biodata has been rejected.",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mt-8 rounded bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Biodata Details -{" "}
          {biodata.biodataId || biodata.BiodataId || biodata.biodata_id}
        </h1>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-4 w-full justify-between">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="educational">Educational</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="expectations">Expectations</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{get(biodata, "whosBiodata.fullName")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Age</TableCell>
                  <TableCell>
                    {getAge(get(biodata, "personalInfo.dateOfBirth", null))}{" "}
                    years
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marital Status</TableCell>
                  <TableCell>
                    {get(biodata, "personalInfo.maritalStatus")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>
                    {get(biodata, "personalInfo.bloodGroup")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hobbies</TableCell>
                  <TableCell>{get(biodata, "personalInfo.hobbies")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Languages</TableCell>
                  <TableCell>
                    {get(biodata, "personalInfo.languages")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>{biodata.bioDataStatus || "N/A"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell>
                    {dateWithTimeConverter(
                      biodata.createdAt || biodata.created_at,
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="professional">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Profession</TableCell>
                  <TableCell>
                    {get(biodata, "professionalInfo.profession")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Job Type</TableCell>
                  <TableCell>
                    {get(biodata, "professionalInfo.jobType")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Institute</TableCell>
                  <TableCell>
                    {get(biodata, "professionalInfo.institution")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Monthly Income</TableCell>
                  <TableCell>
                    {get(biodata, "professionalInfo.monthlyIncome")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Financial Stability</TableCell>
                  <TableCell>
                    {get(biodata, "professionalInfo.financialStability")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="educational">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Education</TableCell>
                  <TableCell>
                    {get(biodata, "educationInfo.educationCategory")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Board</TableCell>
                  <TableCell>{get(biodata, "educationInfo.board")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="family">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Father's Name</TableCell>
                  <TableCell>{get(biodata, "familyInfo.fatherName")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mother's Name</TableCell>
                  <TableCell>{get(biodata, "familyInfo.motherName")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Number of Brothers</TableCell>
                  <TableCell>
                    {get(biodata, "familyInfo.numberOfBrothers")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Number of Sisters</TableCell>
                  <TableCell>
                    {get(biodata, "familyInfo.numberOfSisters")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Family Type</TableCell>
                  <TableCell>{get(biodata, "familyInfo.familyType")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Family Status</TableCell>
                  <TableCell>
                    {get(biodata, "familyInfo.financialCondition")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="address">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>
                    {get(biodata, "addressInfo.currentAddress.city")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>
                    {get(biodata, "addressInfo.currentAddress.address")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact Email</TableCell>
                  <TableCell>{get(biodata, "userId.email")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact Phone</TableCell>
                  <TableCell>{get(biodata, "whosBiodata.phone")}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="expectations">
            <div className="py-8 text-center text-gray-400">
              No data available
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="default"
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleApprove}
          >
            Approve
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            Reject
          </Button>
        </div>
      </div>
      {/* Delete Biodata Section */}
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <div className="mt-10 rounded border border-red-700 bg-red-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-red-700">
                Delete this biodata
              </div>
              <div className="mt-1 text-sm text-red-500">
                Once you delete a biodata, there is no going back. Please be
                certain.
              </div>
            </div>
            <DialogTrigger asChild>
              <Button variant="destructive" className="ml-4">
                Delete this biodata
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              biodata. If you want to delete, please type{" "}
              <span className="font-semibold">{requiredText}</span>
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            className="mt-4 w-full rounded border border-red-400 px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder={`Type ${requiredText} to confirm`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={confirmText !== requiredText}
              onClick={() => {
                // TODO: Add delete logic here
                setOpen(false);
                setConfirmText("");
              }}
            >
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
