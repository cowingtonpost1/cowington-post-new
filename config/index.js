// import nodemailer from 'nodemailer'
const dev = process.env.NODE_ENV !== 'production'

export const server = dev
    ? 'http://localhost:3000'
    : 'https://www.cowingtonpost.tk'
export const db_url = process.env.MONGODB_URI
// export const transporter = nodemailer.createTransport({
// service: 'gmail',
// auth: {
// user: process.env.EMAIL_SERVER_USER,
// pass: process.env.EMAIL_SERVER_PASSWORD
// }
// })
// export const database = mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true})
// const Article = mongoose.model("Article", { name: String })
