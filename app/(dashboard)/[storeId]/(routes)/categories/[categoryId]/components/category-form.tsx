"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface CategoriesProps {
  initinalData: Category | null;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name tidak boleh kosong",
  }),
 bannerId: z.string().min(1, {
    message: "imageUrl tidak boleh kosong",
  }),
});

type CategoriesValues = z.infer<typeof formSchema>;
export const CategoriesForm: React.FC<CategoriesProps> = ({ initinalData }) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const title = initinalData ? "Edit Category" : "Buat Category";
  const description = initinalData ? "Edit Category Store" : "Buat Category Store";
  const toastMessage = initinalData
    ? "Category Berhasil diupdate"
    : "Category Berhasil Dibuat";
  const action = initinalData ? "Simpan Category" : "Buat Category";

  const form = useForm<CategoriesValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initinalData || {
      name: "",
      bannerId: "",
    },
  });

  const onSubmit = async (data: CategoriesValues) => {
    try {
      setLoading(true);
      if(initinalData) {
        await axios.patch(`/api/${params.storeId}/banners/${params.bannerId}`, data);
      }else{
        await axios.post(`/api/${params.storeId}/banners`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/banner`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("cek kembali data yang diInput");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`);
      router.refresh();
      router.push(`/${params.storeId}/banner`);
      toast.success("Banner Berhasil dihapus");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus Banners");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initinalData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama category"
                      disabled={loading}
                      {...field}
                      className="w-[250px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
