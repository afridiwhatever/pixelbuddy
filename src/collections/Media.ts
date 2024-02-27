import { CollectionConfig } from "payload/types";

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
};
