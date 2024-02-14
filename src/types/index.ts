import { PRODUCT_CATEGORIES } from "@/config";

export type Category = (typeof PRODUCT_CATEGORIES)[number];

export interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
  close: () => void;
}
