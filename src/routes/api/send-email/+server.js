import nodemailer from 'nodemailer';

export async function POST({ request }) {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Email failed to send' }), { status: 500 });
    }
}
