import { CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORIES } from "../config";

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
    // {
    //   name: "product_files",
    //   label: "Products File(s)",
    //   type: "relationship",
    //   relationTo: "product_files",
    //   required: true,
    //   hasMany: true,
    // },
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
};
