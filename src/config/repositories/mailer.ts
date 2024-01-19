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
    transporter.sendMail({
        from: 'fastdeliverychacurbanos@gmail.com',
        to: user.email,
        subject: 'Recuperación de Contraseña en Fast Delivery',
        html: `<h2>Hola ${user.name}!</h2>
        <p>Ingresa al siguiente link para establecer una nueva contraseña.</p>
        <a href=${originUrl}/confirm-user/${resetToken}>Redirigir al sitio:</a>
        <h4><b>Saludos!</b></h4>`,
    })
}
