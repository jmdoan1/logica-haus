import { NextApiRequest, NextApiResponse } from "next";
import qs from "querystring"; // For encoding request bodies
import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
const tokenEndpoint = "https://accounts.spotify.com/api/token";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    const response = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
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

    const { access_token, refresh_token, expires_in } = response.data;

    // You might want to encrypt the refresh token here for security.
    res.status(200).json({
      access_token,
      expires_in,
      refresh_token, // Ideally, encrypt this or return a reference to it
    });
  } catch (error) {
    console.error(
      "Error during token swap:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to swap token" });
  }
}
