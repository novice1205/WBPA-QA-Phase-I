import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from '../mailtrap/emailTemplate.js';

export const sendVerificationEmail = async(email,verificationToken) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationToken),
            category: 'Email Verification'
        });

        console.log('Email sent successfully',response);
    } catch (error) {
        console.error('Error ',error.message);
    }
}

export const sendWelcomeEmail = async(email,name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: '901c3fbd-8332-4120-ba44-d973f3578329',
            template_variables:{
                company_info_name: 'WBAP-QA',
                name: name
            }
        })
        console.log(response);
        res.status(200).json({success: true,message:'Email verified successfully',user:{...user,password: undefined}});
    } catch (error) {
        console.log('Error ',error.message);
    }
}

export const sendPasswordResetEmail = async(email,resetURL) =>{
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: 'Password Reset'
        });
    } catch (error) {
        console.error('Error ',error.message);
    }
}

export const sendResetSuccessEmail = async(email) =>{
    const recipient = [{email}];

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
        console.error('Error ',error.message);
    }
}