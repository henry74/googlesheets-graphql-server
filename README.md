# Simple GraphQL API for Google Sheets

## Setup

1. Enable Google Sheets API & download credentials: [Node.js QuickStart](https://developers.google.com/sheets/api/quickstart/nodejs)
2. Share Googlesheet with email address from credentials
3. Assign environment variables `CLIENT_EMAIL` and `PRIVATE_KEY` to credential values (e.g. create `.env` file)

```bash
# Sample .env file
CLIENT_EMAIL="sheets-reader-account@yourgoogleprojectname.iam.gserviceaccount.com"
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nabunchofnonsensecharacters\n-----END PRIVATE KEY-----\n"
```

### API Usage

Terminal/CLI

```bash
yarn start # start graphql playground on http://localhost:4000
```

Dockerfile (after building)

```
docker run -d \
   -p 4001:4000 \
   -e GOOGLE_OAUTH2_CLIENT_ID="123412341234-randombunchofcharacters.apps.googleusercontent.com" \
   -e GOOGLE_OAUTH2_CLIENT_SECRET="1234asdf1234" \
   -e GOOGLE_OAUTH2_REDIRECT_URL="urn:ietf:wg:oauth:2.0:oob" \
   -e TOKEN_PATH=./token.json \
   your/image:latest


**spreadsheetId** is located in the spreadsheet URL: `https://docs.google.com/spreadsheet/d/`spreadsheetId`/edit`

Click schema tab within graphQL playground for details
```
