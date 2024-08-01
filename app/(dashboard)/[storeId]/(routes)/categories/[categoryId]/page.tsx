import db from "@/lib/db";
import { CategoriesForm} from "./components/category-form";

const BannerPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await db.category.findUnique({ where: { id: params.categoryId } });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesForm initinalData={category}/>
      </div>
    </div>
  );
};

export default BannerPage;
