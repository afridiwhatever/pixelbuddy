import { Access, CollectionConfig } from "payload/types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { User } from "../payload/payload-types";

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return {
    ...data,
    user: user?.id,
  };
};

const youOwnOrPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") return true;
  if (!user) return false;

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });
  


  

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
  access: {
    read: youOwnOrPurchased,
  },
  hooks: {
    beforeChange: [addUser],
  },
};
