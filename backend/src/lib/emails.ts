import Handlebars from "handlebars";
import { join } from "path";
import { readFile } from "fs/promises";
import nodemailer from "nodemailer";
import config from "./config";

export async function getEmailHtml(filename: string, data: unknown) {
  let html;
  try {
    const path = join(__dirname, "emails", `${filename}.handlebars`);
    const fileContent = await readFile(path, "utf-8");
    const template = Handlebars.compile(fileContent);
    html = template(data);
  } catch (error) {
    console.error(error);
    throw new Error("Could not get email html");
  }
  return html;
}

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: config.SENDGRID_API_TOKEN,
    },
  });

  let info;
  try {
    info = await transporter.sendMail({
      from: "rameshkm1729@gmail.com",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Could not send email");
  }

  console.log("Message sent: %s", info.messageId);

  return info;
}
