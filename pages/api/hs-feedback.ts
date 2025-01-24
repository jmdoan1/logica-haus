/**
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY ?? "";
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID ?? "";
const BASE_URL = "https://us10.api.mailchimp.com/3.0";

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: "us10",
});

type FeedbackRequestBody = {
  name: string;
  email: string;
  testimony: string;
};

type MailchimpError = {
  title: string;
  detail: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, testimony }: FeedbackRequestBody = req.body;

  if (!name || !email || !testimony) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const emailContent = `
      New Testimonial From Homesight Mobile App

      Name: ${name}
      Email: ${email}

      Testimonial: 

      ${testimony}
    `;

    const campaignResponse = await mailchimp.campaigns.create({
      type: "plaintext",
      recipients: { list_id: AUDIENCE_ID },
      settings: {
        subject_line: "New App Testimonial",
        title: "App Testimonial Campaign",
        from_name: "HomeSight Mobile App",
        reply_to: "noreply@homesightwa.org",
      },
    });
    // console.log({ campaignResponse: campaignResponse });
    const campaignId = campaignResponse.id;

    const contentResponse = await mailchimp.campaigns.setContent(campaignId, {
      plain_text: emailContent,
    });
    // console.log({ contentResponse: contentResponse });

    if (contentResponse?.status && contentResponse.status >= 300) {
      console.log({ contentResponse: contentResponse });
      throw new Error("Content not successfully set for the campaign.");
    }

    const readyCheckResponse = await mailchimp.campaigns.getSendChecklist(
      campaignId
    );
    // console.log({ readyCheckResponse: readyCheckResponse });

    if (!readyCheckResponse.is_ready) {
      console.log({ readyCheckResponse: readyCheckResponse });
      throw new Error(
        "Campaign content is not fully prepared. Please check content details."
      );
    }

    const sendResponse = await mailchimp.campaigns.send(campaignId);
    // console.log({ sendResponse: sendResponse });

    if (sendResponse?.status && sendResponse.status >= 300) {
      console.log({ sendResponse: sendResponse });
      throw new Error("Campaign content was ready but failed to send.");
    }

    res.status(200).json({ message: "Feedback email sent successfully!" });
  } catch (error: unknown) {
    const axiosError = error as { response?: { data: MailchimpError } };
    console.error(
      "Error sending feedback email:",
      axiosError.response?.data || error
    );
    res
      .status(500)
      .json({ error: "Failed to send feedback email. Please try again." });
  }
}
   */
