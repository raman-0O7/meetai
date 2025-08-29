import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { CommandEmpty, CommandInput, CommandItem, CommandResponsiveDialog } from "./ui/command";


interface Props {
  options: Array<{
    id: string;
    value: string;
    children: React.ReactNode
  }>;
  value: string;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  value,
  onSelect,
  onSearch,
  placeholder = "Select an option",
  className
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(option => option.value === value);

  const handleOpenChange = (value: boolean) => {
    onSearch?.("");
    setIsOpen(value);
  }
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        onClick={() => setIsOpen(true)}
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>
          {selectedOption?.children ?? placeholder}
        </div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={isOpen}
        onOpenChange={handleOpenChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandEmpty>
          <span className="text-muted-foreground text-sm">
            No options found
          </span>
        </CommandEmpty>
        {options.map(option => (
          <CommandItem
            key={option.id}
            onSelect={() => {
              onSelect(option.value)
              setIsOpen(false)
            }}
          >
            {option.children}
          </CommandItem>
        ))}
      </CommandResponsiveDialog>
    </>
  )
}