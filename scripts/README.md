# Sanity Content Import Script

This script imports content from `.context/content.md` into your Sanity CMS.

## Prerequisites

1. You need a Sanity project with the schemas defined in `/sanity/schemas/`
2. You need a Sanity API token with write permissions

## Setup

1. Get your Sanity project ID from your Sanity project dashboard
2. Create a Sanity API token:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to API > Tokens
   - Click "Add API token"
   - Give it a name (e.g., "content-import")
   - Set permissions to "Editor" or "Administrator"
   - Copy the token

## Usage

Run the script with your environment variables:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id \
SANITY_API_TOKEN=your_token \
node scripts/import-content.mjs
```

Or set them in your environment first:

```bash
export SANITY_STUDIO_PROJECT_ID=your_project_id
export SANITY_API_TOKEN=your_token
node scripts/import-content.mjs
```

Optional environment variables:

- `SANITY_STUDIO_DATASET` - defaults to "production"

## What Gets Imported

The script creates the following documents in Sanity:

### Sidebar Widgets (3)

1. **Service Schedule** - Lists worship service times
2. **Support Our Work** - Donation information with PayPal link
3. **Connect With Us** - Social media links

### Pages (8)

1. **Home** - Welcome message and church description
2. **Contact Us** - Email, phone, donations, and location info
3. **Clergy and Staff** - Staff biographies and vestry information
4. **Worship** - Service times and children in worship info
5. **Livestream Archive** - Information about recorded services
6. **Outreach** - Community health team, breakfast program, and safe space
7. **Our Neighbourhood** - Kensington Market info and poverty advocacy
8. **Arts** - Art in Common, readings/concerts, and music recordings

### Site Settings (1)

- Church name, tagline, address, footer copyright, and donation link

## Content Structure

The script parses the `content.md` file and converts it to Sanity's Portable Text format. It creates:

- Block-level content (paragraphs, headings)
- Links (email addresses are converted to mailto: links)
- Section headings are converted to h2 and h3 blocks

## Notes

- The script creates new documents on each run. If you run it multiple times, you'll get duplicate content.
- Before re-running, you may want to delete existing documents in Sanity Studio.
- The script uses the `@sanity/client` package which is already installed in the project.

## Troubleshooting

### "SANITY_STUDIO_PROJECT_ID and SANITY_API_TOKEN environment variables are required"

Make sure you've set both environment variables before running the script.

### "Error during import: Project not found"

Check that your project ID is correct. It should be the string from your Sanity project dashboard.

### "Error during import: Token is invalid"

Check that your API token is correct and has not expired. Create a new token if needed.

### "Error during import: Insufficient permissions"

Your token needs write permissions. Make sure you created it with "Editor" or "Administrator" permissions.
