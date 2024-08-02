import db from "@/lib/db";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/column";
import {format} from "date-fns"
import { formater } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { productId: string } }) => {
  const products = await db.product.findMany({
    where: { storeId: params.productId },
    include:{
      category: true
    },
    orderBy: { createdAt: "desc" },
  });

   const formattedProducts: ProductColumn[] = products.map((item) => ({
     id: item.id,
     name: item.name,
     isFeatured: item.isFeatured,
     isArchived: item.isArchived,
     price: formater.format(item.price.toNumber()),
     category: item.category.name,
     createdAt: format(item.createdAt, "MMM do, yyyy"),
   }));

   
   
  return (
    <div className="flex-col">
      <div className="flex-1 spcace-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
