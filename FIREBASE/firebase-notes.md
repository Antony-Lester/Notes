//TODO set security axcess from domain only..
firestore().collection('message').add({
  to: 'someone@example.com',
  message: {
    subject: 'subject text',
    html: 'This is an <code>HTML</code> email body.',
  },
})



to: ['someone@example.com'],
message: {
  subject: 'Hello from Firebase!',
  text: 'This is the plaintext section of the email body.',
  html: 'This is the <code>HTML</code> section of the email body.',
}

to: A single recipient email address or an array containing multiple recipient email addresses.
from: The sender's email address. If not specified in the document, uses the configured "Default FROM address" parameter.
replyTo: The reply-to email address. If not specified in the document, uses the configured "Default REPLY-TO address" parameter.
//=== EMAIL TEMPLATE ===
//the add
firestore().collection('message').add(
//the send to myself obj
{
to: ['me@antonylester.com'],
from: [userEmail],
replyTo: [userEmail],
message: {
	subject: `${userName} ${userOrganization} ${userReason}`,
	text: `Name:${userName}		Organization:${userOrganization}	Reason:${userReason}\n
		Email:${userEmail}	Number:${userNumber}\n\n
		Message:\n${userMessage}`
	},
};
//the add
firestore().collection('message').add(
//the send confermation
{
to: [userEmail],
from: ['me@antonylester.com'],
replyTo: [`${userReason}@antonylester.com`],
message: {
	subject: `your ${userReason} enquiry for Antony Lester`,
	text: 
	`Greetings ${UserName},

    

    Your Enquiry placed on antonylester.com has been received, 



    I will be looking into it shortly.

    

    Regards

        Antony Lester.`
	},
};


html: The HTML content of the email.

cc: A single recipient email address or an array containing multiple recipient email addresses.
bcc: A single recipient email address or an array containing multiple recipient email addresses.

