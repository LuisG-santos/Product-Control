import { db } from "@/app/_lib/prisma";

export async function GET() {
    const products = await db.products.findMany({});
    return  Response.json(products,{
        status: 200,
    });
}

export async function POST(request: Request) {
    const body = await request.json();
    const newProduct = await db.products.create({
        data: {
            name: body.name,
            price: body.price,
            stock: body.stock,
        },
    });
    return Response.json(newProduct,{
        status: 201,
    });
}