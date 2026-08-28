# VLSSY Technologies Website

Static Cloudflare Worker website with a Gmail SMTP contact endpoint.

## Configure contact email

Customer enquiries are delivered to `vlssytechnologies.pvtltd@gmail.com` through the `GMAIL_TO` Worker secret.

Set the production secret with Wrangler:

```powershell
npx wrangler secret put GMAIL_TO
```

When prompted, enter:

```text
vlssytechnologies.pvtltd@gmail.com
```

The SMTP account and App Password must be configured separately as `GMAIL_USERNAME` and `GMAIL_APP_PASSWORD`. Never commit `.dev.vars` or real credentials.
