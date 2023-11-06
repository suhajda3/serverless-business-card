import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; import { LambdaClient, GetFunctionUrlConfigCommand } from "@aws-sdk/client-lambda";
export const handler = async (event) => {

  //////////////////////////////////////////////
  // Fill out your personal information below //
  //////////////////////////////////////////////

  // Required fields
  var familyName = '';
  var givenName = '';

  // Optional name fields
  var middleNames = '';
  var honorificPrefixes = '';
  var honorificSuffixes = '';
  var nickname = '';

  // Organization
  var organization = '';

  // E-mails
  var eMails = [
    {
      'type': '',  // Options: HOME, WORK, OTHER
      'email': '',
      'default': true
    }
  ];

  // Phone numbers
  var phoneNumbers = [
    {
      'type1': '',  // Options: IPHONE, VOICE, PAGER, FAX, MSG, BBS, MODEM, CAR, ISDN, VIDEO, PCS
      'type2': '',  // Options: CELL, WORK, HOME, OTHER
      'number': '',
      'default': true
    }
  ];

  // Addresses
  var addresses = [
    {
      'type': '',  // Options: HOME, WORK
      'extAddress': '',  // Extended address (e.g. apartment or suite number)
      'street': '',
      'locality': '',
      'region': '',
      'postalCode': '',
      'country': '',
      'default': true
    }
  ];

  // URL
  var url = '';  // e.g. https://roadtoaws.com

  // Birthday
  var birthday = '';  // e.g. 1982-06-07

  // IMPP
  var IMPPs = [
    {
      'service': '',  // Options: Facebook, Gadu-Gadu, Google Talk, ICQ, Jabber, MSN, QQ, Skype, Yahoo
      'type': '',  // Options: HOME, WORK
      'handle': '',
      'default': true
    }
  ];

  // Social
  var socials = [
    {
      'type': '',  // Options: Twitter, Facebook, Flickr, LinkedIn, Myspace, Sina Weibo, Tencent Weibo, Yelp, gamecenter
      'url': ''
    }
  ];

  // Title
  var title = '';  // e.g. Cloud Architect

  // Timestamp for the last time the vCard was updated
  var rev = '';  // e.g. 20121201T134211Z

  // Public encryption key
  var key = '';  // e.g. http://example.com/key.pgp

  // UID
  var uid = '';  // e.g. da418720-3754-4631-a169-db89a02b831b

  /////////////////////////////////
  // END OF PERSONAL INFORMATION //
  /////////////////////////////////

  var photo = '';
  const s3Bucket = process.env.bucketName;

  const s3Client = new S3Client();
  const s3Command = new GetObjectCommand({ Bucket: s3Bucket, Key: 'avatar.jpeg' });
  try {
    const avatarJpeg = await s3Client.send(s3Command);
    photo = await avatarJpeg.Body.transformToString('base64');
  }
  catch (e) {
    console.log('No avatar.jpeg found in S3 bucket.');
  }

  const lambdaClient = new LambdaClient();
  const lambdaCommand = new GetFunctionUrlConfigCommand({ FunctionName: 'business-card' });
  const functionUrl = await lambdaClient.send(lambdaCommand);

  // Build vCard
  var vCard = 'BEGIN:VCARD\r\nVERSION:3.0\r\nPRODID:-//serverless-business-card//v1.0.0//EN\r\n';
  vCard += 'N:' + familyName + ';' + givenName + ';' + middleNames + ';' + honorificPrefixes + ';' + honorificSuffixes + '\r\n';
  vCard += 'FN:' + givenName + ' ' + familyName + '\r\n';
  vCard += 'SOURCE:' + functionUrl.FunctionUrl + '\r\n';
  if (nickname) vCard += 'NICKNAME:' + nickname + '\r\n';
  if (organization) vCard += 'ORG:' + organization + '\r\n';
  eMails.forEach((eMail) => {
    if (eMail.type) {
      vCard += 'EMAIL;type=INTERNET;type=' + eMail.type;
      if (eMail.default) vCard += ';type=pref';
      vCard += ':' + eMail.email + '\r\n';
    }
  });
  phoneNumbers.forEach((phoneNumber) => {
    if (phoneNumber.type1) {
      vCard += 'TEL;type=' + phoneNumber.type1 + ';type=' + phoneNumber.type2;
      if (phoneNumber.default) vCard += ';type=pref';
      vCard += ':' + phoneNumber.number + '\r\n';
    }
  });
  addresses.forEach((address) => {
    if (address.type) {
      vCard += 'ADR;type=' + address.type;
      if (address.default) vCard += ';type=pref';
      vCard += ':;' + address.extAddress + ';' + address.street + ';' + address.locality + ';' + address.region + ';' + address.postalCode + ';' + address.country + '\r\n';
    }
  });
  IMPPs.forEach((impp) => {
    if (impp.service) {
      vCard += 'IMPP';
      if (impp.default) vCard += ';type=pref';
      vCard += ';X-SERVICE-TYPE=' + impp.service + ';type=' + impp.type;
      if (impp.default) vCard += ';type=pref';
      vCard += impp.service + ':' + impp.handle + '\r\n';
    }
  });
  socials.forEach((social) => {
    if (social.type) {
      vCard += 'X-SOCIALPROFILE;';
      vCard += 'type=' + social.type + ':' + social.url + '\r\n';
    }
  });
  if (birthday) vCard += 'BDAY:' + birthday + '\r\n';
  if (photo) vCard += 'PHOTO;ENCODING=b;TYPE=JPEG:' + photo + '\r\n';
  if (url) vCard += 'URL:' + url + '\r\n';
  if (title) vCard += 'TITLE:' + title + '\r\n';
  if (rev) vCard += 'REV:' + rev + '\r\n';
  if (key) vCard += 'KEY;TYPE=PGP:' + key + '\r\n';
  if (uid) vCard += 'UID:' + uid + '\r\n';
  vCard += 'END:VCARD';

  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/vcard',
      'Content-Disposition': 'inline; filename="' + givenName + ' ' + familyName + '.vcf"'
    },
    body: vCard,
  };
  return response;
};
