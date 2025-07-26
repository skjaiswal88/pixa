import React from "react";
import { Control, Path, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";

import { formSchema } from "./TransformationForm";

type FormData = z.infer<typeof formSchema>;

type CustomFieldProps = {
  control: Control<FormData> | undefined;
  render: (props: { field: ControllerRenderProps<FormData, Path<FormData>> }) => React.ReactNode;
  name: keyof FormData;
  formLabel?: string;
  className?: string;
};

export const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name as Path<FormData>}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};