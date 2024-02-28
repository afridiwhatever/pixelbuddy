import { CollectionConfig } from "payload/types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { User } from "../payload/payload-types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return {
    ...data,
    user: user?.id,
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: (req) => req.user.role !== "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        condition: () => false,
      },
      hasMany: false,
    },
  ],
  hooks: {
    beforeChange: [addUser],
  },
};
