import React from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "./ui/form"
import { Input } from "./ui/input"

import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import { authFormSchema } from "@/lib/utils"

const formSchema = authFormSchema("sign-up")

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>
  name: FieldPath<z.infer<typeof formSchema>>
  label: string
  placeholder: string
}

const CustomInput = ({ control, name, label, placeholder }: CustomInputProps) => {
  return (
    <FormField
      control={control}
   
      name={name}
      render={({ field }) => (
        <FormItem    className="w-full">
          <FormLabel className="font-medium text-gray-700">{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className="border border-brown-500 focus:ring-2 focus:ring-brown-700 outline-none"/>
          </FormControl>
          <FormMessage className="text-red-500"/>
        </FormItem>
      )}
    />
  )
}

export default CustomInput
