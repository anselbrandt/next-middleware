// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Redis from "ioredis";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { HOST_URL, REDIS_URL } from "../../../constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: HOST_URL,
      optionsSuccessStatus: 200,
    });
    const key = req.query.params as string;
    const logData = req.body;
    const client = new Redis(REDIS_URL);
    client.set(key, JSON.stringify(logData));
    res.send("ok");
  } catch (err) {
    const error: any = err;
    res.status(405).send(error.message);
  }
}

/*
curl -X POST \
-H 'Content-Type: application/json' \
-d '{"data":"some random data"}' \
-k http://localhost:3000/api/metrics

curl -X POST http://localhost:3000/api/metrics -H 'Content-Type: application/json' -d '{"data":"some random data"}'
*/
