import express from "express";
import { getPayloadClient } from "./payload/get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();

const PORT = Number(process.env.PORT) || 3001;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin url ${cms.getAdminURL()}`);
      },
    },
  });

  app.use((req, res) => {
    nextHandler(req, res);
  });

  nextApp.prepare().then(() => {
    // payload.logger.info("Nextjs started");

    app.listen(PORT, async () => {
      // payload.logger.info(`next app url ${process.env.NEXT_PUBLIC_SERVER_URL}`);
    });
  });
};

start();
