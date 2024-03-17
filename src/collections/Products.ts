import { CollectionConfig, PayloadRequest } from "payload/types";
import { PRODUCT_CATEGORIES } from "../config";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Product } from "../payload/payload-types";
import { stripe } from "../lib/stripe";

const addUser: BeforeChangeHook<Product> = (args) => {
  const user = args.req.user;
  return {
    ...args.data,
    user: user?.id,
  };
};

export const Products: CollectionConfig = {
  slug: "products",
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Product Description",
      type: "textarea",
    },
    {
      name: "price",
      label: "Price in USD",
      type: "number",
      min: 0,
      max: 1000,
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => {
        return {
          label,
          value,
        };
      }),
      required: true,
    },
    {
      name: "product_files",
      label: "Products File(s)",
      type: "relationship",
      relationTo: "product_files",
      required: true,
      hasMany: true,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      label: "Product Image(s)",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
    },
  ],
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;

          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: "USD",
              unit_amount: Math.round(data.price * 100),
            },
          });

          const finalProduct: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          };

          return finalProduct;
        } else if (args.operation === "update") {
          const data = args.data as Product;
          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          });

          const finalProduct: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          };
          return finalProduct;
        }
      },
    ],
  },
};
