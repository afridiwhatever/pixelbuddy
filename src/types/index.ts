import { PRODUCT_CATEGORIES } from "@/config";
import { InitOptions } from "payload/config";

export type Category = (typeof PRODUCT_CATEGORIES)[number];

export interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
  close: () => void;
}

export interface Args {
  initOptions?: Partial<InitOptions>;
}

export interface VerifyEmailProps {
  token: string;
}

export interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
