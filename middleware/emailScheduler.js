const nodemailer = require('nodemailer');
const cron = require('node-cron');

const mailOptions = {
    from: process.env.EMAIL1,
    to: process.env.EMAIL2,
    subject: 'Email from NodeJS App',
    text: 'Hello From NodeJS '
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL1,
        pass: process.env.PASSWORD
    }
});

const scheduler = async (req, res, next) => {
    try {
        const bodyParam = req.body;
        for (let i = 0; i < bodyParam.length; i++) {
            const sche_date = new Date(bodyParam[i].time)
            const sch_year = sche_date.getFullYear();
            const sch_month = sche_date.getMonth();
            const sch_date = sche_date.getDate();
            const sch_hours = sche_date.getHours();
            const sch_min = sche_date.getMinutes();
            const sch_sec = sche_date.getSeconds();
            const sch_milsec = sche_date.getMilliseconds();

            const val = setInterval(() => {
                const curr_date = new Date();
                const cur_year = curr_date.getFullYear();
                const cur_month = curr_date.getMonth();
                const cur_date = curr_date.getDate();
                const cur_hours = curr_date.getHours();
                const cur_min = curr_date.getMinutes();
                const cur_sec = curr_date.getSeconds();
                const cur_milsec = curr_date.getMilliseconds();

                if (sch_year === cur_year && sch_month === cur_month && sch_date === cur_date &&
                    sch_hours === cur_hours && sch_min === cur_min && sch_sec === cur_sec &&
                    sch_milsec === cur_milsec) {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email Send' + info.response);
                        }
                    })
                    clearInterval(val);
                }
            }, 1000)
        }
        next()
    } catch (error) {
        res.status(400).send({ error: "Email scheduler is down" })
    }
}
// below is using node-cron librarys
// cron.schedule('1 * * * * *', () => {
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email Send' + info.response);
//         }
//     })
// });

module.exports = scheduler;