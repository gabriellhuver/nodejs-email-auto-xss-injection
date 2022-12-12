const nodemailer = require("nodemailer");
const fs = require('fs')

async function main() {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "<user@email>", // generated ethereal user
            pass: "<password>", // generated ethereal password
        },
    });


    const file = fs.readFileSync('./payloads.txt', { encoding: 'utf-8' }).toString().split("\n");
    // send mail with defined transport object
    let count = 0;
    for (const payload of file) {
        const ob = {
            from: '<email>', // sender address
            to: "<target>", // list of receivers
            subject: `test payload ${count}`, // Subject line
            html: payload, // html body
        }
        console.log(ob)
        let info = await transporter.sendMail(ob);
        count++;
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }


}


main().catch(console.error);