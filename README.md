# sts

sts, a fully open-source status page with Gatus backend and Payload CMS

## ✨ Features

- **Gatus Integration**: Works with [Gatus](https://github.com/TwiN/gatus) backend for monitoring.
- **Incident Management**: Built-in CMS for managing and displaying service incidents with status updates. Powered by [Payload CMS](https://payloadcms.com/).
- **Status Updates on Real-time**: Status information is automatically updated using SWR.
- **Customizable**: Easily update the site title, description, logo and more.
- **Brand-free Footer**: No attribution required

## 🛠️ Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Payload CMS](https://payloadcms.com/) for incident management
- **Database**: SQLite (with [Turso](https://turso.tech/) support) for incident storage
- **UI**: [Radix UI Primitives](https://www.radix-ui.com/), so everything is accessible
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom OKLCH colour palettes
- **Data Fetching**: [SWR](https://swr.vercel.app/) for effective real-time updates

## 📢 Incident Management

sts includes a built-in CMS for managing service incidents and status updates.

### How It Works

- **Active Incidents**: Displayed prominently at the top of the status page
- **Status Updates**: Track incident progress with update types (Investigating, Identified, Monitoring, Update, Resolved)
- **Timeline View**: Each incident shows all updates in chronological order
- **Public Access**: Incidents are publicly visible; management requires authentication
- **History**: View past incidents for up to 30 days with pagination

### Managing Incidents

1. Access the admin panel at `/admin`
2. Create your first admin user
3. Navigate to "Incidents" in the sidebar
4. Create a new incident with:
   - Title and description
   - Multiple status updates with timestamps
   - Rich text content for detailed explanations

### Status Update Types

- **Investigating**: Issue identified, investigation in progress
- **Identified**: Root cause found
- **Monitoring**: Fix applied, monitoring the situation
- **Update**: General progress update
- **Resolved**: Issue completely resolved

Active incidents appear at the top of your status page until marked as "Resolved".

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (default) or Node.js.
- [Gatus](https://github.com/TwiN/gatus) backend.
- A SQLite database (or Turso)

### Installation

```bash
# Clone the repository
git clone https://github.com/sparanoid/sts.git
cd sts

# Install dependencies.
bun install

# Set environment variables (create .env.local)
echo "GATUS_API_BASE=https://your-gatus-instance.com/api/v1" > .env.local
echo "PAYLOAD_SECRET=your-secret-key" >> .env.local

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the status page.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the incident management admin panel.

### Installation with subpath

```bash
# Clone the repository
git clone https://github.com/sparanoid/sts.git
cd sts

# Install dependencies.
bun install

# Set environment variables (create .env.local)
echo "NEXT_PUBLIC_API_BASE_PATH=/frontend" >> .env.local
echo "GATUS_API_BASE=https://your-gatus-instance.com/frontend/api/v1" > .env.local
echo "PAYLOAD_SECRET=your-secret-key-min-32-characters" >> .env.local

# Build the app server
bun run build
# Execute server development
bun dev
# Execute server production
bun start
```

Open [http://localhost:3000/frontend](http://localhost:3000/frontend) with a browser to see the output

## ⚙️ Configuration

You can configure sts with environment variables:

| Variable                      | Description                                                   | Required |
| ----------------------------- | ------------------------------------------------------------- | -------- |
| `GATUS_API_BASE`              | Gatus API base URL (e.g. `https://status.example.com/api/v1`) | ✅       |
| `PAYLOAD_SECRET`              | Secret key for Payload CMS (min. 32 characters)               | ✅       |
| `TURSO_DATABASE_URL`          | Or `DATABASE_URI` for Turso database URL (for cloud SQLite)   | ❌       |
| `TURSO_AUTH_TOKEN`            | Or `AUTH_TOKEN` for Turso authentication token                | ❌       |
| `NEXT_PUBLIC_SITE_TITLE`      | Site title                                                    | ❌       |
| `NEXT_PUBLIC_SITE_DESC`       | Site description                                              | ❌       |
| `NEXT_PUBLIC_SITE_LOGO`       | Site logo URL                                                 | ❌       |
| `NEXT_PUBLIC_SITE_BACK_TITLE` | Title for back link                                           | ❌       |
| `NEXT_PUBLIC_SITE_BACK_URL`   | URL for back link                                             | ❌       |
| `NEXT_PUBLIC_FOOTER_TEXT`     | Custom footer text                                            | ❌       |
| `NEXT_PUBLIC_API_BASE_PATH`   | Custom Base path for application (e.g. `/frontend` )          | ❌       |
| `NEXT_PUBLIC_GROUP_SIZE`      | Loading skeleton group size (Default: `3` )                   | ❌       |

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy sts is with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsparanoid%2Fsts&env=GATUS_API_BASE,PAYLOAD_SECRET,TURSO_DATABASE_URL,TURSO_AUTH_TOKEN,NEXT_PUBLIC_SITE_TITLE,NEXT_PUBLIC_SITE_DESC&envDescription=Gatus%20API%20base%20is%20required&envLink=https%3A%2F%2Fgithub.com%2Fsparanoid%2Fsts)

### Self-hosting

sts can be deployed with any hosting provider that supports Next.js applications.

## 📝 License

Apache-2.0
