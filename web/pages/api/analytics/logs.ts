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
    const client = new Redis(REDIS_URL);
    const keys = await client.keys("*");
    const values = await client.mget(keys);
    const logs = values.map((value) => JSON.parse(value as string));
    res.json(logs);
  } catch (err) {
    const error: any = err;
    res.status(405).send(error.message);
  }
}
