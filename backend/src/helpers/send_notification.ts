// import AWS from "aws-sdk"
// import fcm from "fcm-notification"
// const AwsConfig = {
//     accessKeyId: 'AKIAWTG6NFNISO5ZCREE',
//     secretAccessKey: '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',
//     region: 'ap-south-1',
// };

// const FCM = new fcm({
//     "type": "service_account",
//     "project_id": "fir-notifications-c6ed9",
//     "private_key_id": "059c8b528d1baa620783fc3cb3bf34032c4105dd",
//     "private_key": "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDg2nmAUtERp5W8\nPbjU/4zyjIV2JbCPnegMUg9TKXEdnJU2Sm9kwojcI06H5GBmRWlZ00j05i5rh3nN\nRwOniNI+FBbBEkgZPoUNI+zZnV0WC30CbAbeKfR+LCyPFka/Bv8fpgWsfspAnMq1\nDyAEFBync4qV0ojX15oxRU5XPnNea2d6sMPjjM7ig7kjFLPN7gHaoYKcSKu0/KLy\n7ecpNwGREhiUVjqMwUkLWNB5hNKK5rX/tPGbp9uZ7IsSH0MGZYXJ5OglkyCHxPL5\nBvWSdRB/kjQflr5Q+Snermn42ZXbTuEQgLZH3t2fq7JQaeCqKsrzEdf1H8eM28Jm\nXXVn5jULAgMBAAECggEAWEuSYKCktoEPXG8EUKfVKj2h/uYH8i14vLXQjMB+Sbl+\nImaSXYfChGdc5CH69M4W843zXS+yVMlLPB/BwJ0KqhPrZ3+NTlRtnN5ZmI6hyhFS\n0ounGsBw4Mbp7Ho757GQp1XjbnwPYdXwB69bzB41rk/BwNl+oPtp8iUcAUhlt1JL\nT03/n/NrwNkd9tvVE8pH8LfOMajeflDNh5EZOY6foeXW9xl/C8WC+KTFOyG/bQJV\nnwXeSvhqrOtY0Jm0jz0+nt5/ZZfU2lWwrMP4yfp9DJDGqV/xU1FKV9xjSkc4YNaX\nT/8TxJF+nxgzdLA+7t9siIyPqlYOE8QrJB8iGYClWQKBgQDxAfjIilRwGjWdAsHf\nqj8lmfZmKyprQgAJOdwgNNoE5nu9ZAFZt/kgar864a6kGfKGs4iCuEECf35BWXZW\nBzHTOVcWBERgxKH0HMa1ladSWviXnME4MU85DtziacIhKoLswKP5diH6V21LiETY\nGW8dB+AbjYVoyLoGftWZRPcW5wKBgQDu1z9CWDmYw5TRoR3MiISJR7lG+53/Hy+I\nj0sgd0jKpRn+TyeGpOOL/eaHoz8m+6UV6GospjKJltWlROKcJ1yz4vVP+b50nerk\nLTAMwhcs28u0dpez8w2MfUQ5IscX0dzVdXM8fVSQ6SMXCx1O1/Q3l82Xh7n1n1VX\nv+q3ZNRAPQKBgBROiDnNfgPcEXxjSRahb6Spblt5c5+J9hrQ5z1Hdr9G9FIm5P48\nRB95HxfFAEQPc6Hp6qyo/cFKIMc81H23KXmUsUPHpENLDiJVcmDGdUy5IY0UxisH\n7JbwK6hgJN1KibGNIcPZMk+3ohvlJXfX3MbjbPylVgJYN2Rot3Ksnu0tAoGAOj6H\nkLhPI2/epNhzmeNY3tl811CZERQb1WOMYJh2SeTFV/0ZmH4xd3wtcbpftjP76EHL\nUqQdAuyjoTARSx9WPhAE3sH6rhmspIRYiWPznt7i6FlbWWjWTwJlVsGiZ66n+e4w\ncfnmW4hfJElzljyXs87zNhbFRJ7cgw+sP5j5IckCgYAo/nF6GYf/5vw3Cwclb12Q\n0+Z+vBAIIqY2M3PTsJIHfDoNjZY9QYw8KSRU/FujeYSlQPbFzhygfvUkaM1KnQYN\nkVXR6CZxfWBqvmk7OeWIAZbUQjWBOpSpb83cWQsLiDPqtEu8Jp+v9F2ceNqAOixx\nvlZmq0CtUSRO6+bn/mRdIg==",
//     "client_email": "firebase-adminsdk-9yeqf@fir-notifications-c6ed9.iam.gserviceaccount.com",
//     "client_id": "108061267826388609062",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9yeqf%40fir-notifications-c6ed9.iam.gserviceaccount.com"
// })

// export const send_notifications = async (
//     phoneNumberList: any[],
//     message: string,
//     tokens: string[],
//     web_push_validate: number,
//     sms_validate: number
// ) => {
//     try {
//         let sms_response: any = null;
//         let web_push_response: any = null;
//         var sns = new AWS.SNS(AwsConfig);
//         if (phoneNumberList?.length !== 0 && sms_validate === 1) {
//             phoneNumberList?.map(async (phone_number) => {
//                 sms_response = await sns
//                     .publish({
//                         Message: `New instruction Added for ${message}`,
//                         PhoneNumber: phone_number,
//                         MessageAttributes: {
//                             'AWS.SNS.SMS.SenderID': {
//                                 DataType: 'String',
//                                 StringValue: 'hello',
//                             },
//                         },
//                     })
//                     .promise();
//             });
//         }

//         // send notifications
//         if (web_push_validate === 1) {
//             FCM.sendToMultipleToken(message, tokens, async (err: any, response: any) => {
//                 web_push_response = response;
//                 if (err) {
//                     web_push_response = null;
//                 } else {
//                     // console.log('response-----', response);
//                 }
//             });
//         }
//         return {
//             sms_response: sms_response?.MessageId ? 'success' : null,
//             web_push_response,
//         };
//     } catch (error) {
//         console.log(error);
//     }
// };