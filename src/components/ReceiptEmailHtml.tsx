import React from "react";
import { Product } from "@/payload/payload-types";

interface ReceiptEmailProps {
  email: string;
  date: Date;
  orderId: string;
  products: Product[];
}

const ReceiptEmailHtml = (props: ReceiptEmailProps) => {
  return <div>ReceiptEmailHtml</div>;
};

export default ReceiptEmailHtml;
