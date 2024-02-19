import express from "express";
import { getPayloadClient } from "./payload/get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

const app = express();

const PORT = Number(process.env.PORT) || 3001;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { req, res };
};

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin url ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    })
  );

  app.use((req, res) => {
    nextHandler(req, res);
  });

  nextApp.prepare().then(() => {
    payload.logger.info("Nextjs started");

    app.listen(PORT, async () => {
      console.log(`Server started on ${PORT}`);
      payload.logger.info(`next app url ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

start();
