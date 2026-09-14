# Northgate Backend

Express and MongoDB API for the Northgate residential access platform.

## Development

```powershell
npm install
npm run dev
```

Create a local `.env` file and provide the MongoDB URI, JWT secret, owner setup key, and allowed frontend origins. Separate multiple origins with commas:

```text
CLIENT_ORIGIN=http://localhost:5173,https://fullomyself.github.io
```

## Seed development users

```powershell
npm run seed:users
```
