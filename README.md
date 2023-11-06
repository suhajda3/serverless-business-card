# Serverless business card

Create your digital business card by using only [AWS Free Tier](https://aws.amazon.com/free/) resources.

## Easy installation

[Launch CloudFormation](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1) in the us-east-1 region and create a stack with the following S3 template:\
`https://serverless-business-card.s3.amazonaws.com/template.yaml`

Choose a unique name for your S3 bucket and CloudFormation will do the rest. After the stack is created, head over to the [Lambda console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/business-card?tab=code) and fill in your personal information and click `Deploy`. Your business card URL is your Function URL. You can use this address to program an NFC sticker or link it to your personal domain.

## Donate

<a href="https://www.buymeacoffee.com/misi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

Please consider donating. 🙏

## License

All content is [Apache-2.0][1].

[1]: https://www.apache.org/licenses/LICENSE-2.0
