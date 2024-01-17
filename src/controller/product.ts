import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  BaseQuery,
  NewProductRequestBody,
  SearchRequestQuery,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHanler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { json } from "stream/consumers";
import { revalidateCache } from "../utils/features.js";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, category, price, stock } = req.body;

    const photo = req.file;

    if (!photo) return next(new ErrorHanler("Please Add Photo", 400));

    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHanler("Please Enter All Fields", 400));
    }

    const product = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    await revalidateCache({ product: true });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);

//Update Product
export const updateProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const { name, category, price, stock } = req.body;
  const photo = req.file;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHanler("Product not Found", 404));

  if (photo) {
    rm(product.photo, () => {
      console.log("Old photo Deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  await revalidateCache({ product: true });

  return res
    .status(200)
    .json({ success: true, message: "Product Updated Successfully" });
});

//get a product
export const getProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  let product;

  if (myCache.has(`product-${id}`))
    product = JSON.parse(myCache.get(`product-${id}`) as string);
  else {
    product = await Product.findById(id);

    if (!product) return next(new ErrorHanler("Product Is not Found", 400));

    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  return res.status(200).json({
    status: true,
    product,
  });
});

//latest Product

export const getLatestPRoducts = TryCatch(async (req, res, next) => {
  let products;

  if (myCache.has("latest-products"))
    products = JSON.parse(myCache.get("latest-products") as string);
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

    myCache.set("latest-products", JSON.stringify(products));
  }

  return res.status(200).json({ success: true, products });
});

// get category Product
export const getCategoryPRoducts = TryCatch(async (req, res, next) => {
  let categories;

  if (myCache.has("categories"))
    categories = JSON.parse(myCache.get("categories") as string);
  else {
    categories = await Product.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({ success: true, categories });
});

//get all Product

export const getAdminProducts = TryCatch(async (req, res, next) => {
  let products;

  if (myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-products") as string);
  else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  return res.status(200).json({ success: true, products });
});

//delete a Product
export const deleteProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHanler("product not found", 404));

  rm(product.photo, () => {
    console.log("Deleted");
  });

  await product.deleteOne();

  await revalidateCache({ product: true });

  return res
    .status(200)
    .json({ success: true, message: "Product Deleted susscessfully" });
});

//get all product
export const getAllProduct = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PERPAGE) || 8;

    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };

    if (category) baseQuery.category = category;

    const productPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
      productPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(products.length / limit);

    return res.status(200).json({
      status: true,
      products,
      totalPage,
    });
  }
);
