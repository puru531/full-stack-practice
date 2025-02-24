# Advanced Cloudflare Features

## Workers
Cloudflare Workers are serverless functions that run on the edge.

### Example Worker (Basic):
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response('Hello World!')
}
```

# Example Worker (Advanced): 
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Parse URL
  const url = new URL(request.url)
  
  // Route based on path
  switch (url.pathname) {
    case '/api':
      return handleAPI(request)
    case '/cache':
      return handleCache(request)
    default:
      return new Response('Not Found', { status: 404 })
  }
}

async function handleAPI(request) {
  const data = {
    message: 'This is an API response',
    timestamp: new Date().toISOString()
  }
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  })
}

async function handleCache(request) {
  // Check cache first
  const cache = caches.default
  let response = await cache.match(request)
  
  if (!response) {
    // If not in cache, generate response
    response = new Response('Cached Content', {
      headers: {
        'Cache-Control': 'max-age=3600',
        'Content-Type': 'text/plain',
      }
    })
    // Store in cache
    await cache.put(request, response.clone())
  }
  
  return response
}
