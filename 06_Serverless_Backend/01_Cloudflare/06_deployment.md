# Creating and Deploying a Cloudflare Worker

## Prerequisites
  - A Cloudflare account

  - Node.js and npm installed on your machine

  - Wrangler CLI (Cloudflare's command-line tool)
## Step 1: Install Wrangler CLI
```bash
npm install -g wrangler

```
## Step 2: Authenticate with Cloudflare
```bash
wrangler login

```
This will open a browser window where you'll need to log in to your Cloudflare account and authorize Wrangler.

## Step 3: Create a New Worker Project
```bash 
wrangler init my-worker

```

When prompted, you can choose:
- JavaScript or TypeScript

- Module or Service Worker format

- Whether to use git for version control

- Whether to deploy immediately

## Step 4: Navigate to Your Project Directory
```bash
cd my-worker

```

## Step 5: Edit Your Worker Code
Open the `src/index.js` (or `src/index.ts` if you chose TypeScript) file and write your worker code:
```js
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  }
};

```

## Step 6: Configure Your Worker
The `wrangler.toml` file contains your worker's configuration. Make sure it has the correct account ID and name:
```toml
name = "my-worker"
main = "src/index.js"
compatibility_date = "2023-10-02"

[vars]
MY_VARIABLE = "my-value"

# Add additional configuration as needed

```
## Step 7: Test Your Worker Locally
```bash
wrangler dev

```
This starts a local development server, typically at `http://localhost:8787`.

## Step 8: Deploy Your Worker to Cloudflare
```bash
wrangler deploy

```
## Step 9: Verify Your Deployment
After deployment, Wrangler will output a URL where your worker is accessible, typically in the format `https://my-worker.<your-subdomain>.workers.dev`.

## Additional Configuration Options
### Custom Domains
To use a custom domain, add the following to your `wrangler.toml`:
```toml
routes = [
  { pattern = "example.com/*", zone_name = "example.com" }
]

```
### Environment Variables
For environment variables:
```toml
[vars]
API_KEY = "your-api-key"

# For secrets (will prompt for value)
# Run: wrangler secret put SECRET_KEY

```
### KV Namespaces
To use KV storage:
```toml
kv_namespaces = [
  { binding = "MY_KV", id = "your-kv-id" }
]

```
### Scheduled Tasks
For cron triggers:
```toml
[triggers]
crons = ["0 0 * * *"] # Run at midnight every day

```
After making configuration changes, redeploy your worker using `wrangler deploy`.