"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchAdmins,
  updateAdminData,
} from "@/redux/features/admin/adminSlice";
import { updateAdminSchema } from "@/validation/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TiEdit } from "react-icons/ti";
import { useDispatch } from "react-redux";

const EditAdminModal = ({ user, setCurrentPage }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: user,
  });

  const onSubmit = async (data) => {
    try {
      const updatedData = { data, id: user._id };
      const response = await dispatch(updateAdminData(updatedData));
      if (response?.payload?.success) {
        // reset();
        setOpen(false);
        await dispatch(fetchAdmins({}));
        setCurrentPage(1);
        toast.success(response.payload.message);
      } else {
        toast.error(
          response.payload.response.data.message || "Failed! Please try again",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" title="edit" className="edit-btn cursor-pointer">
          <TiEdit />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Admin Info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-2.5 block">Name</Label>
            <Input type="text" {...register("name")} />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </div>
          <div>
            <Label className="mb-2.5 block">Email</Label>
            <Input type="email" {...register("email")} />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div>
            <Label className="mb-2.5 block">Password</Label>
            <Input type="text" {...register("password")} />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>
          <div>
            <Label className="mb-2.5 block">Status</Label>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  defaultValue={user?.is_active?.toString() ?? "true"} // default to true
                  onValueChange={(val) => field.onChange(val === "true")} // convert string to boolean
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <ErrorMessage>{errors.is_active?.message}</ErrorMessage>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdminModal;
