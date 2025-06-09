"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onFocus?: ()=>void; // 変数を渡すことはないので引数はなし
  onBlur?: ()=>void;  // 上に同じ
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select type...",
  className,
  onFocus, // Destructure onFocus
  onBlur,  // Destructure onBlur
}: ComboboxProps) {
  const [open, _setOpen] = React.useState(false)

  // フォーカスをボタンではなくCombobox全体で管理するため、setOpen関数をwrapしてStateとonFocus,onBlurの挙動を一致させる。
  const setOpenWithFocusing=(isOpen:boolean)=>{
    _setOpen(isOpen)
    if (isOpen){
      if(onFocus) onFocus()
    } else {
      if(onBlur) onBlur()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpenWithFocusing}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label} // Use label for search, value for selection
                  onSelect={() => {
                    onValueChange(option.value === value ? "" : option.value)
                    setOpenWithFocusing(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
