import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create Nodemailer transport
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }

  // Fallback dev transport using console logging
  return {
    sendMail: async (options: nodemailer.SendMailOptions) => {
      console.log("---------------- EMAIL SIMULATION ----------------");
      console.log(`TO: ${options.to}`);
      console.log(`SUBJECT: ${options.subject}`);
      console.log(`HTML BODY:\n${options.html}`);
      console.log("--------------------------------------------------");
      return { messageId: "simulated-email-id" };
    },
  };
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM || "DearDiary <noreply@deardiary.app>";

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, ""),
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyLink = `${baseUrl}/verify-email?token=${token}`;

  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #fdfbf7; border-radius: 12px; border: 1px solid #e8e2d5; color: #2c2925;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #6b46c1; margin: 0; font-size: 28px; font-weight: 700;">DearDiary</h1>
        <p style="color: #718096; font-size: 14px; margin-top: 4px;">Your Private Digital Sanctuary</p>
      </div>
      <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #edf2f7;">
        <h2 style="font-size: 20px; font-weight: 600; margin-top: 0;">Verify your email address</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
          Thank you for creating an account with DearDiary! Please verify your email address to unlock full access to your personal diary sanctuary.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyLink}" style="background-color: #6b46c1; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 15px;">Verify Email Address</a>
        </div>
        <p style="font-size: 13px; color: #a0aec0; line-height: 1.4;">
          This link will expire in 24 hours. If you did not create a DearDiary account, you can safely ignore this email.
        </p>
        <p style="font-size: 12px; color: #cbd5e0; word-break: break-all;">
          Or copy & paste this URL into your browser: <br>${verifyLink}
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Verify your email address - DearDiary",
    html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetLink = `${baseUrl}/reset-password?token=${token}`;

  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #fdfbf7; border-radius: 12px; border: 1px solid #e8e2d5; color: #2c2925;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #6b46c1; margin: 0; font-size: 28px; font-weight: 700;">DearDiary</h1>
        <p style="color: #718096; font-size: 14px; margin-top: 4px;">Your Private Digital Sanctuary</p>
      </div>
      <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #edf2f7;">
        <h2 style="font-size: 20px; font-weight: 600; margin-top: 0;">Reset Your Password</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
          We received a request to reset your password for your DearDiary account. Click the button below to set a new password:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #e53e3e; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; font-size: 15px;">Reset Password</a>
        </div>
        <p style="font-size: 13px; color: #a0aec0; line-height: 1.4;">
          This link will expire in 1 hour. If you did not request a password reset, please ignore this email or contact support if you suspect unauthorized access.
        </p>
        <p style="font-size: 12px; color: #cbd5e0; word-break: break-all;">
          Or copy & paste this URL into your browser: <br>${resetLink}
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Reset your password - DearDiary",
    html,
  });
}
