# sts

sts, a fully open-source status page for Gatus backend

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

## ✨ Features

- **Gatus Integration**: Works with [Gatus](https://github.com/TwiN/gatus) backend for monitoring.
- **Beautiful UI**: A modern UI with perfect Lighthouse results (100 in every category).
- **Fully Responsive**: Great experience on all devices from mobile to desktop.
- **Supports Dark Mode**: Theme detection with an option to toggle manually.
- **Status Updates on Real-time**: Status information is automatically updated using SWR.
- **Customizable**: Easily update the site title, description, logo and more.
- **Brand-free Footer**: No attribution required
- **Subpath Deployment Ready**: Easily deploy under a subpath (e.g., `/frontend`) ideal for reverse proxies and Kubernetes.

## 🛠️ Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (with App Router).
- **UI**: [Radix UI Primitives](https://www.radix-ui.com/), so everything is accessible.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom OKLCH colour palettes.
- **Data Fetching**: [SWR](https://swr.vercel.app/) for effective real-time updates.
- **Icons**: [Tabler Icons](https://tabler-icons.io/).

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (default) or Node.js.
- [Gatus](https://github.com/TwiN/gatus) backend.

### Installation

```bash
# Clone the repository
git clone https://github.com/sparanoid/sts.git
cd sts

# Install dependencies.
bun install

# Set environment variables (create .env.local)
echo "GATUS_API_BASE=https://your-gatus-instance.com/api/v1" > .env.local

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with a browser to see the output.

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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsparanoid%2Fsts&env=NEXT_PUBLIC_SITE_TITLE,NEXT_PUBLIC_SITE_DESC,NEXT_PUBLIC_SITE_LOGO,NEXT_PUBLIC_SITE_BACK_TITLE,NEXT_PUBLIC_SITE_BACK_URL,NEXT_PUBLIC_FOOTER_TEXT,GATUS_API_BASE&envDescription=%60GATUS_API_BASE%60%20is%20required%2C%20ie.%20%60https%3A%2F%2Fstatus.twin.sh%2Fapi%2Fv1%60&project-name=sts&repository-name=sts)

### Self-hosting

sts can be deployed with any hosting provider that supports Next.js applications.

## 📝 License

Apache-2.0
