"use client";

import { Label } from "./label";
import { Input } from "./input";
import { CiSearch } from "react-icons/ci";
export interface SearchProps {
  placeholder?: string;
}
export const Search = ({ placeholder = "Search..." }: SearchProps) => {
  return (
    <div className="relative flex w-full">
      <Label
        className="absolute left-2 flex h-full items-center pr-2"
        htmlFor="search"
      >
        <CiSearch className=" text-xl text-gray-500" />
      </Label>
      <Input
        type="text"
        name="search"
        id="search"
        className="rounded-3xl border-gray-600 pl-8 text-gray-700 outline-none placeholder:text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-gray-300"
        placeholder={placeholder}
      />
    </div>
  );
};
