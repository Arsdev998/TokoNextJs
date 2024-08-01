"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BannerColumn } from "./column";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface CellActionProps {
  data: BannerColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
     const onCopy = (id:string) => {
       navigator.clipboard.writeText(id);
       toast.success("Banner Id Dicopy");
     }; 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onCopy(data.id)} className="cursor-pointer">
          <Copy className="mr-2 md:mt-1 h-4 w-2" /> Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 md:mt-1 h-4 w-2" /> Update
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 md:mt-1 w-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
