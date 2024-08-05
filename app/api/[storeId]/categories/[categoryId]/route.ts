import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: {  categoryId: string} }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("category Id dibutuhkan", { status: 400 });
    }
    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include:{
        banner:true
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY-GET-ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, bannerId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Nama Category perlu diinput", { status: 400 });
    }
    if (!bannerId) {
      return new NextResponse(" toko perlu diinput", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("bannerId dibutuhkan", { status: 400 });
    }

     const storeByUserId = await db.store.findFirst({
       where: {
         id: params.storeId,
         userId,
       },
     });

     if (!storeByUserId) {
       return new NextResponse("Unatuhorized", { status: 403 });
     }

    const category= await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        bannerId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY-PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//delete banners
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse("category Id dibutuhkan", { status: 400 });
    }

     const storeByUserId = await db.store.findFirst({
       where: {
         id: params.storeId,
         userId,
       },
     });

     if (!storeByUserId) {
       return new NextResponse("Unatuhorized", { status: 403 });
     }

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY-DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
