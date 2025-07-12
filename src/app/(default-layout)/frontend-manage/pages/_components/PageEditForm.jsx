"use client";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
import {
  Select as CustomSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dynamicPageSchema } from "@/validation/dynamicPageSchema";
import {
  fetchDynamicPage,
  fetchDynamicPages,
  resetPage,
  updateDynamicPageById,
} from "@/redux/features/dynamicPage/dynamicPageSlice";

const PageEditForm = ({ slug }) => {
  const { page, status } = useSelector((state) => state.page);
  const editor = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: page?.dynamicPage || {},
    resolver: zodResolver(dynamicPageSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (!page?.dynamicPage?._id) {
        toast.error("Page id is missing");
        return;
      }

      const response = await dispatch(
        updateDynamicPageById({ id: page.dynamicPage._id, data }),
      );

      if (response?.payload?.success) {
        reset();
        await dispatch(fetchDynamicPages({}));
        router.push("/frontend-manage/pages");
        toast.success(response.payload.message);
      } else {
        toast.error(response.payload.message || "Failed! Please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred!");
    }
  };

  // fetching values
  useEffect(() => {
    if (slug) {
      dispatch(fetchDynamicPage(slug));
    }

    return () => resetPage();
  }, [slug]);

  // handling default values
  useEffect(() => {
    if (page?.dynamicPage) {
      reset({
        ...page.dynamicPage,
      });
    }
  }, [page?.dynamicPage, reset]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <Label className="mb-2.5 block">Title</Label>
            <Input type="text" {...register("title")} />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
          </div>
          <div>
            <Label className="mb-2.5 block">Status</Label>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  defaultValue={
                    page?.dynamicPage?.is_active?.toString() ?? "true"
                  }
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
        </div>
        <div>
          <Label className="mb-2.5 block">Content</Label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <JoditEditor
                ref={editor}
                value={field.value}
                onBlur={(content) => field.onChange(content)}
              />
            )}
          />
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => reset()} type="button" variant="destructive">
            Reset
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PageEditForm;
