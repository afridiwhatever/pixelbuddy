import { User } from "../payload/payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdmin: Access = ({ req }) => {
  return req.user.role === "admin";
};

const yourOwnOrIsAdmin: Access = ({ req }) => {
  if (req.user.role === "admin") return true;
  const user = req.user as User | null;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "Summary of all orders",
  },
  access: {
    read: yourOwnOrIsAdmin,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        // condition: ({ req }) => req.user.role === "admin",
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      label: "Ordered By",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        // condition: ({ req }) => req.user.role === "admin",
        hidden: true,
      },
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
