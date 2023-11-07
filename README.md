# Serverless business card

Create your digital business card by using only [AWS Free Tier](https://aws.amazon.com/free/) resources.\
Example: [misi.is-a.dev](https://misi.is-a.dev)

![iPhone screenshot](https://github.com/suhajda3/serverless-business-card/blob/main/assets/iPhone.jpeg?raw=true)

## Easy Installation

### Create AWS Resources

[Launch CloudFormation](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1) in the us-east-1 region and create a stack with the following S3 template URL:\
`https://serverless-business-card.s3.amazonaws.com/template.yaml`

Specify a unique name for your S3 bucket.

![CloudFormation](https://github.com/suhajda3/serverless-business-card/blob/main/assets/CloudFormation.png?raw=true)

Be sure to check the CloudFormation warning at the bottom of the page. These permissions are required so that Lambda can access your S3 bucket (where your photo is stored) and we can include the Lambda Function URL in the vCard.

![IAM warning](https://github.com/suhajda3/serverless-business-card/blob/main/assets/IAM-warning.png?raw=true)

When your business card is ready, CloudFormation displays the CREATE_COMPLETE message. You may get an error if your S3 name is not unique. Simply delete the stack and restart the process by choosing a different S3 bucket name.

![IAM warning](https://github.com/suhajda3/serverless-business-card/blob/main/assets/CloudFormation-stack-deployed.png?raw=true)

Now head over to the [Lambda console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/business-card?tab=code) and fill in your personal information in the Code source then click `Deploy`.\
Your business card URL is your Function URL. You can use this address to program an NFC sticker or link it to your personal domain.

### Attach your Photo

You can add a photo to your business card. Upload your photo to the [S3 bucket](https://s3.console.aws.amazon.com/s3/home) you specified earlier. Be sure to name your photo `avatar.jpeg`.

### Program an NFC chip with your Function URL

Purchase an [NFC sticker](https://www.amazon.com/s?k=NFC+stickers) for a few bucks and program your Lambda Function URL to it, then stick it on any of your current cards. You can program the NFC sticker with [NFC Tools](https://www.wakdev.com/en/apps.html).

## Advanced Installation

If you want to deploy the CloudFormaton template other than the us-east-1 region, you can use the template-with-code.yaml instead with the following S3 template URL:\
`https://serverless-business-card.s3.amazonaws.com/template-with-code.yaml`

This does not download the zipped Lambda code from S3, it contains the code itself. Be sure to select the region before deploying the template.

The issue with this method is that CloudFormation automatically creates an index.js file and doesn't look for the specified Node.js version. Since Node.js 18.x index.js is no longer default. You will need to rename index.js to index.mjs. Everything else is the same.

![CloudFormation template](https://github.com/suhajda3/serverless-business-card/blob/main/assets/CloudFormation-template.png?raw=true)

### Use a custom Domain

For a more friendly URL, you can use your own subdomain instead of the Lambda Function URL. Don't forget that Lambda Function URL's are HTTPS only. You will need a redirect or if you prefer to use DNS (CNAME) you will need a valid HTTPS certificate for that domain. You can use one of the [free-for.life domains](https://free-for.life/#/?id=domains) for this purpose.

## Files

- **template.yaml**: CloudFormation template that downloads the source code (serverless-business-card.zip) from an S3 bucket located in us-east-1
- **template-with-code.yaml**: CloudFormation template that contains the source code. (There is currently an [issue](https://github.com/aws-cloudformation/cloudformation-coverage-roadmap/issues/1832) with CloudFormation and Node.js 18.x)
- **serverless-business-card.zip**: Lambda source code in a zipped archive

## Donate

<a href="https://www.buymeacoffee.com/misi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Please consider donating. 🙏

## License

All content is [Apache-2.0][1].

[1]: https://www.apache.org/licenses/LICENSE-2.0
