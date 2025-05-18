import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sendEmail = async (
    to: string,
    subject: string,
    html: string): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from: "TubeIQ",
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendEmail;