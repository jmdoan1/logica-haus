"use client";

import "./page.css";
import Booknow from "app/components/book-now";
import { FormEvent, useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section>
      <h1 className="h1">Book a free consultation</h1>
      <Booknow />
      <br />
      <p className="or">OR</p>
      <h1 className="h1">Send us a message</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="name">
            Name:
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email:
          </label>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="message">
            Message:
          </label>
          <textarea
            className="input"
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="send">
          <button className="send-button" type="submit">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}
