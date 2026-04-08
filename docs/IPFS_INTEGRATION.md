# CLORIT Pinata IPFS Integration

## Overview

Integrated Pinata IPFS for decentralized storage of project metadata, carbon credit NFTs, and retirement certificates. All uploads are tagged with user wallet addresses for proper attribution.

## Features

✅ **Wallet-Tagged Uploads** - All IPFS uploads tagged with user wallet address
✅ **NFT Metadata Standards** - OpenSea-compatible metadata for all NFTs
✅ **Project Metadata** - Comprehensive project information on IPFS
✅ **Carbon Credit NFTs** - ERC-1155 token metadata with attributes
✅ **Retirement Certificates** - Soulbound NFT certificates for carbon retirement
✅ **File Uploads** - Support for images and documents

## API Endpoints

### Upload JSON Metadata
```http
POST /api/ipfs/upload-json
Content-Type: application/json

{
  "metadata": { ... },
  "walletAddress": "0x...",
  "name": "My Metadata",
  "type": "project",
  "keyvalues": { "projectId": "PRJ-001" }
}
```

### Upload Project Metadata
```http
POST /api/ipfs/project-metadata
Content-Type: application/json

{
  "projectData": {
    "projectId": "PRJ-001",
    "name": "Mangrove Restoration",
    "areaHectares": 100,
    "region": "Kerala",
    ...
  },
  "walletAddress": "0x..."
}
```

### Upload Carbon Credit Metadata
```http
POST /api/ipfs/carbon-credit-metadata
Content-Type: application/json

{
  "creditData": {
    "projectId": "PRJ-001",
    "tokenId": 1,
    "totalSupply": 1000,
    ...
  },
  "walletAddress": "0x..."
}
```

### Get Wallet's IPFS Files
```http
GET /api/ipfs/wallet/0x...
```

## Frontend Usage

```typescript
import { uploadProjectToIPFS, uploadCarbonCreditToIPFS } from '@/services/ipfs';

// Upload project metadata
const ipfsUri = await uploadProjectToIPFS(projectData, walletAddress);

// Upload carbon credit metadata
const creditUri = await uploadCarbonCreditToIPFS(creditData, walletAddress);
```

## Metadata Standards

All metadata follows OpenSea NFT standards with:
- `name` - Display name
- `description` - Detailed description
- `image` - Image URL
- `external_url` - Link to project page
- `attributes` - Array of traits
- `properties` - Additional metadata

## Pinata Configuration

Credentials stored in `/backend/.env`:
- `PINATA_API_KEY`
- `PINATA_API_SECRET`
- `PINATA_JWT`

All uploads are tagged with:
- `project: CLORIT`
- `type: project|carbonCredit|retirementCertificate`
- `wallet: 0x...`
- `timestamp: ISO date`
- Custom keyvalues (projectId, tokenId, etc.)

## Files Created

- `/backend/services/pinataService.js` - Backend IPFS service
- `/backend/routes/ipfs.js` - API routes
- `/src/services/ipfs.ts` - Frontend IPFS service
