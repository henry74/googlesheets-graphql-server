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

API Usage

```bash
yarn start # start graphql playground on http://localhost:4000
```

**spreadsheetId** is located in the spreadsheet URL: `https://docs.google.com/spreadsheet/d/`spreadsheetId`/edit`

Click schema tab within graphQL playground for details
