import { NextApiRequest, NextApiResponse } from "next";
import qs from "querystring";
import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ error: "Missing refresh token" });
  }

  try {
    const response = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
          ).toString("base64")}`,
        },
      }
    );

    const { access_token, expires_in } = response.data;

    res.status(200).json({
      access_token,
      expires_in,
    });
  } catch (error) {
    console.error(
      "Error during token refresh:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to refresh token" });
  }
}
