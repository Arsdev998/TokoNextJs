"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export const BannerClient = () => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Banner"
          description="Tambahkan dan atur banner untuk Store"
        />
        <Button onClick={()=>router.push(`/${params.storeId}/banner/new}`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator/>
    </>
  );
};
