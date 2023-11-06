# Serverless business card

Create your digital business card by using only [AWS Free Tier](https://aws.amazon.com/free/) resources.

![iPhone screenshot](https://github.com/suhajda3/serverless-business-card/blob/main/assets/iPhone.jpeg?raw=true)

## Easy installation

### Create AWS Resources

[Launch CloudFormation](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1) in the us-east-1 region and create a stack with the following S3 template URL:\
`https://serverless-business-card.s3.amazonaws.com/template.yaml`

Specify a unique name for your S3 bucket.

![CloudFormation](https://github.com/suhajda3/serverless-business-card/blob/main/assets/CloudFormation.png?raw=true)

Be sure to check the CloudFormation warning at the bottom of the page. These are required so that Lambda can access your S3 bucket (where your photo is stored) and get the Lambda Function URL.

![IAM warning](https://github.com/suhajda3/serverless-business-card/blob/main/assets/IAM-warning.png?raw=true)

When your business card is ready, CloudFormation displays the CREATE_COMPLATE message. You may get an error if your S3 name is not unique. Simply delete the stack and restart the process by choosing a different S3 bucket name.

![IAM warning](https://github.com/suhajda3/serverless-business-card/blob/main/assets/CloudFormation-stack-deployed.png?raw=true)

Now head over to the [Lambda console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/business-card?tab=code) and fill in your personal information in the Code source then click `Deploy`. Your business card URL is your Function URL. You can use this address to program an NFC sticker or link it to your personal domain.

### Attach your Photo

You can add a photo to your business card. Upload your photo to the [S3 bucket](https://s3.console.aws.amazon.com/s3/home) you specified earlier. Be sure to name your photo `avatar.jpeg`.

### Create a custom Domain

For simplicity, you can forward your own subdomain to the Lambda Function URL with a CNAME record. This way, you don't have to remember the complex Lambda Function URL. You can also use a [free-for.life domain](https://free-for.life/#/?id=domains) for this purpose. e.g.: [misi.is-a.dev](https://misi.is-a.dev)

### Program an NFC chip with your Function URL

Purchase an NFC sticker for a few bucks and program your Lambda Function URL to it, then stick it on any of your current cards. Here is a great YouTube video on how to do this: [https://youtu.be/gbZDTGqoVks?si=bIlqtgAXWRVulKw_](https://youtu.be/gbZDTGqoVks?si=bIlqtgAXWRVulKw_)

## Donate

<a href="https://www.buymeacoffee.com/misi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Please consider donating. 🙏

## License

All content is [Apache-2.0][1].

[1]: https://www.apache.org/licenses/LICENSE-2.0
