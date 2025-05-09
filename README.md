# sts

sts, a fully open-source status page for Gatus backend

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)

## ✨ Features

- **Gatus Integration**: Seamlessly connects with [Gatus](https://github.com/TwiN/gatus) backend for reliable monitoring
- **Beautiful UI**: Clean, modern interface with perfect Lighthouse scores (100 in all categories)
- **Fully Responsive**: Optimized experience on all devices from mobile to desktop
- **Dark Mode Support**: Automatic theme detection with manual toggle
- **Real-time Updates**: Auto-refreshing status information with SWR
- **Customizable**: Easy configuration of site title, description, logo, and more
- **Brand-free Footer**: No attribution required

## 🛠️ Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI**: [Radix UI Primitives](https://www.radix-ui.com/) for accessible components
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom OKLCH color palettes
- **Data Fetching**: [SWR](https://swr.vercel.app/) for efficient, real-time updates
- **Icons**: [Tabler Icons](https://tabler-icons.io/)
- **Package Manager**: [Bun](https://bun.sh/) for faster installations and builds

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (default) or Node.js
- [Gatus](https://github.com/TwiN/gatus) backend

### Installation

```bash
# Clone the repository
git clone https://github.com/sparanoid/sts.git
cd sts

# Install dependencies
bun install

# Set up environment variables (create .env.local)
echo "GATUS_API_BASE=https://your-gatus-instance.com/api/v1" > .env.local

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚙️ Configuration

Configure STS using environment variables:

| Variable                      | Description                                                   | Required |
| ----------------------------- | ------------------------------------------------------------- | -------- |
| `GATUS_API_BASE`              | Gatus API base URL (e.g. `https://status.example.com/api/v1`) | ✅       |
| `NEXT_PUBLIC_SITE_TITLE`      | Site title                                                    | ❌       |
| `NEXT_PUBLIC_SITE_DESC`       | Site description                                              | ❌       |
| `NEXT_PUBLIC_SITE_LOGO`       | Site logo URL                                                 | ❌       |
| `NEXT_PUBLIC_SITE_BACK_TITLE` | Title for back link                                           | ❌       |
| `NEXT_PUBLIC_SITE_BACK_URL`   | URL for back link                                             | ❌       |
| `NEXT_PUBLIC_FOOTER_TEXT`     | Custom footer text                                            | ❌       |

## 🌐 Deployment

### Deploy on Vercel

The easiest way to deploy STS is with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsparanoid%2Fsts&env=NEXT_PUBLIC_SITE_TITLE,NEXT_PUBLIC_SITE_DESC,NEXT_PUBLIC_SITE_LOGO,NEXT_PUBLIC_SITE_BACK_TITLE,NEXT_PUBLIC_SITE_BACK_URL,NEXT_PUBLIC_FOOTER_TEXT,GATUS_API_BASE&envDescription=%60GATUS_API_BASE%60%20is%20required%2C%20ie.%20%60https%3A%2F%2Fstatus.twin.sh%2Fapi%2Fv1%60&project-name=sts&repository-name=sts)

### Self-hosting

STS can be deployed with any hosting provider that supports Next.js applications.

## 📝 License

Apache-2.0
