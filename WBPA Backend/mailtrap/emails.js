import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from '../mailtrap/emailTemplate.js';

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: 'Email Verification'
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        console.error('Error ', error.message);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: '691e5a9e-b219-45df-b7b7-ea3eefd18b0d',
            template_variables: {
                company_info_name: 'WBAP-QA',
                name: name
            }
        })
        console.log(response);
        res.status(200).json({ success: true, message: 'Email verified successfully', user: { ...user, password: undefined } });
    } catch (error) {
        console.log('Error ', error.message);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: 'Password Reset'
        });
    } catch (error) {
        console.error('Error ', error.message);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password reset success',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        });

        console.log(response);
    } catch (error) {
        console.error('Error ', error.message);
    }
}

export const sendContactFormEmail = async (email, name, userEmail, phone, subject, message) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Contact Form Submission',
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #2c3e50; border-bottom: 1px solid #ccc; padding-bottom: 10px;">📬 New Contact Form Submission</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="font-weight: bold; padding: 8px; color: #555;">👤 Name:</td>
        <td style="padding: 8px; color: #333;">${name}</td>
      </tr>
      <tr style="background-color: #f0f0f0;">
        <td style="font-weight: bold; padding: 8px; color: #555;">📧 User Email:</td>
        <td style="padding: 8px; color: #333;">${userEmail}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px; color: #555;">📱 Phone:</td>
        <td style="padding: 8px; color: #333;">${phone}</td>
      </tr>
      <tr style="background-color: #f0f0f0;">
        <td style="font-weight: bold; padding: 8px; color: #555;">📝 Subject:</td>
        <td style="padding: 8px; color: #333;">${subject}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; padding: 8px; color: #555;">💬 Message:</td>
        <td style="padding: 8px; color: #333;">${message}</td>
      </tr>
    </table>
    <p style="margin-top: 30px; font-size: 13px; color: #999;">This message was sent via the WBPA-QA contact form.</p>
  </div>`
        });

        console.log(response);
    } catch (error) {
        console.error('Error ', error.message);
    }
}