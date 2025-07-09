'use server';

import { addContactSubmission } from "@/lib/notion";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "All fields are required"
      };
    }

    // Save to Notion
    await addContactSubmission({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Revalidate the contact page if needed
    revalidatePath('/contact');

    return {
      success: true,
      message: "Message sent successfully"
    };
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return {
      success: false,
      error: "Failed to send message. Please try again."
    };
  }
} 