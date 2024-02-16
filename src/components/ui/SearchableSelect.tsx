import { Fragment, useMemo, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
export type Option = {
  label: string;
  value: string;
};
const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];
interface SearchableSelectProps {
  selected: Option[];
  setSelected: React.Dispatch<React.SetStateAction<Option[]>>;
  options: Option[] | undefined;
  isLoading: boolean;
}
export const SearchableSelect = ({
  setSelected,
  selected,
  options,
  isLoading,
}: SearchableSelectProps) => {
  // const [selected, setSelected] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(
    () =>
      query === ""
        ? options
        : options?.filter((option) =>
            option?.label
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")),
          ),
    [query],
  );
  console.log("selected ", selected);
  return (
    <Combobox
      value={selected}
      onChange={(opts) => {
        console.log("opts ", opts);
        setSelected(opts);
      }}
      multiple
      // disabled={isLoading}
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0"
            // displayValue={(person) => person?.name}
            placeholder="Tags ..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredOptions?.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredOptions?.map((option) => (
                <Combobox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-200 text-gray-500" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected: isSelected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected.includes(option)
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected.includes(option) ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900`}
                        >
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
