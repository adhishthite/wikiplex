"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CitationProps {
  id: string;
  content: string;
}

export function Citation({ id, content }: CitationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="align-super text-xs font-normal h-auto p-0"
          onClick={() => setIsOpen(true)}
        >
          [{id}]
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p className="text-sm">{content}</p>
      </PopoverContent>
    </Popover>
  );
}
