import { User } from "./../payload/payload-types";
import { CollectionConfig } from "payload/types";
import { Access } from "payload/types";

const isAdminOrHasAccessToImages = (): Access => {
  return async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    return {
      user: { equals: req.user.id },
    };
  };
};

export const Media: CollectionConfig = {
  slug: "media",
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
  ],
  upload: {
    staticDir: "media",
    staticURL: "/media",
    imageSizes: [
      {
        name: "thumbnail",
        height: 400,
        width: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return {
          ...data,
          user: req.user.id,
        };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      return await isAdminOrHasAccessToImages()({ req });
    },
    delete: ({ req }) => {
      return isAdminOrHasAccessToImages()({ req });
    },
  },
};
