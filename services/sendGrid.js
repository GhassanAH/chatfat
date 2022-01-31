const keys = require('../config/keys')

const sendGridMail = require('@sendgrid/mail')
sendGridMail.setApiKey(keys.SENDGRID_API_KEY)


const sendEmail = async (destination, passcode) => {
    try {
        const user_passcode = 'The passcode is '+passcode
        const msg = {
            to: destination,
            from: 'gassanalhttali@gmail.com',
            subject: 'Reset your ChatFat account password',
            text:user_passcode
          }
          await sendGridMail.send(msg)
    } catch (error) {
        return new Error(e)
    }
    
        
}
module.exports = sendEmail
