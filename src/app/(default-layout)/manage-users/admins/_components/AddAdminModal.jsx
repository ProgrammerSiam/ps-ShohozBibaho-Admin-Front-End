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
import { createNewAdmin, fetchAdmins } from "@/redux/features/admin/adminSlice";
import { createAdminSchema } from "@/validation/adminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AddAdminModal = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAdminSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(createNewAdmin(data));

      if (response?.payload?.success) {
        reset();
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
        <Button>+ New Admin</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
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
                  defaultValue={"true"}
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
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminModal;
