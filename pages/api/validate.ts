import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  for (const url in req.body) {
    res.revalidate(url);
  }
  res.status(200).json({ revalidate: true });
}
