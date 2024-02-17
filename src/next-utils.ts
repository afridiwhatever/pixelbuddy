import next from "next";

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  port: Number(process.env.PORT) || 3000,
});

export const nextHandler = nextApp.getRequestHandler();
