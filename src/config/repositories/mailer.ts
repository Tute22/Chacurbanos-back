import * as nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'fastdeliverychacurbanos@gmail.com',
        pass: 'darq kpbq qoxp qtpq',
    },
})

const originUrl = 'http://localhost:3000'

export const resetPasswordEmail = (user, resetToken) => {
    const emailHTML = `
    <html>
        <head>
            <style>
                .email-container {
                    background-color: #AEE3EF;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    border-radius: 30px
                }
                .email-header {
                    color: #55BBD1;
                    font-weight: bold;
                    font-size: 40px; 
                }
                .email-body {
                    color: #333333;
                    margin-top: 15px;
                    font-size: 17px; 
                    
                }
                .email-footer {
                    margin-top: 30px;
                    color: #333333;
                    text-align: left;
                }
                .email-logo {
                    text-align: center;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <h2 class="email-header">Hola ${user.name}!</h2>
                <p class="email-body">Presioná el siguiente botón para restablecer tu contraseña.</p>
                <a href="${originUrl}/confirm-user/${resetToken}" class="reset-button" style="background-color: #F4C455; color: #1B1B1B !important; padding: 15px 30px; text-decoration: none; border: none; border-radius: 30px; display: inline-block; margin-top: 15px; font-weight: bold; font-size: 16px; text-align: center;">Restablecer Contraseña</a>
                <div class="email-footer"><b>Equipo de Fast Delivery!</b></div>
            </div>
        </body>
    </html>`

    transporter.sendMail({
        from: 'fastdeliverychacurbanos@gmail.com',
        to: user.email,
        subject: 'Recuperación de Contraseña en Fast Delivery',
        html: emailHTML,
    })
}
