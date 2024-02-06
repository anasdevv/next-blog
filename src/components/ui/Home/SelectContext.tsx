"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const options = [
  {
    label: "Following",
    value: "following",
  },
  {
    label: "All",
    value: "all",
  },
  {
    label: "Archived",
    value: "archived",
  },
];
const SelectContext = () => {
  return (
    <Select
      onValueChange={(val) => {
        console.log("val", val);
      }}
      defaultValue={options[0]?.value}
    >
      <SelectTrigger className="w-[180px] rounded-3xl border-gray-500 font-semibold">
        <SelectValue placeholder="Theme" className=" text-gray-500" />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem value={value} key={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectContext;
