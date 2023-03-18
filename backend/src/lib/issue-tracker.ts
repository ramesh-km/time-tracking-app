import config from "./config";
import { sendEmail } from "./emails";
import { stopApplication } from "./process";

export async function createBug(title: string, body: string) {
  try {
    await sendEmail(config.ISSUE_TRACKER_EMAIL, title, body);
  } catch (error) {
    console.error(error);
    console.error("Could not create bug");
    await stopApplication(1);
  }
}
