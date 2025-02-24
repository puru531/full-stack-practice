# Cloudflare Security Configuration

## Web Application Firewall (WAF)

1. Managed Rules
    - OWASP Core Rule Set
    - Cloudflare Managed Rules
    - Custom Rules

2. Custom Rules Example:
```javascript
// WAF Custom Rule
if (http.request.uri.path matches "^/admin/*") {
  if (ip.src.country != "US") {
    block()
  }
```

```javascript
// Example WAF Rule
{
  "rules": [
    {
      "action": "block",
      "expression": "http.request.uri.path contains \"wp-admin\"",
      "description": "Block WordPress admin access"
    }
  ]
}
```
2. **Rate Limiting**
```javascript
// Rate Limiting Rule
{
  "rules": [
    {
      "threshold": 100,
      "period": 60,
      "action": {
        "mode": "challenge",
        "timeout": 300
      },
      "match": {
        "request": {
          "methods": ["POST"],
          "url_pattern": "/api/*"
        }
      }
    }
  ]
}
```

# DDoS Protection
1. Layer 3/4 Protection

    - UDP/TCP protection

    - SYN flood mitigation

   - DNS amplification protection

2. Layer 7 Protection

   - Rate limiting

   - Challenge pages

   - Browser integrity check