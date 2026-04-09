# Auth Testing Playbook

## Step 1: MongoDB Verification

```bash
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```

Verify:
- bcrypt hash starts with `$2b$`
- Indexes exist on:
  - users.email (unique)
  - login_attempts.identifier
  - password_reset_tokens.expires_at (TTL)

## Step 2: API Testing with curl

### Test Login
```bash
curl -c cookies.txt -X POST https://tech-ct.preview.emergentagent.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@techmasters.com","password":"TechMasters2025!"}'
```

### Check cookies
```bash
cat cookies.txt
```

### Test authenticated endpoint
```bash
curl -b cookies.txt https://tech-ct.preview.emergentagent.com/api/auth/me
```

### Test protected endpoints
```bash
# Get services
curl -b cookies.txt https://tech-ct.preview.emergentagent.com/api/services

# Get settings
curl -b cookies.txt https://tech-ct.preview.emergentagent.com/api/settings

# Get reviews
curl -b cookies.txt https://tech-ct.preview.emergentagent.com/api/reviews

# Get payments
curl -b cookies.txt https://tech-ct.preview.emergentagent.com/api/payments
```

## Step 3: Frontend Testing

1. Navigate to https://tech-ct.preview.emergentagent.com/admin
2. Should redirect to /login
3. Login with admin@techmasters.com / TechMasters2025!
4. Should redirect to /admin
5. Test all tabs:
   - General settings - update and save
   - Services - add, delete
   - Reviews - add, delete
   - Payments - update and save
6. Logout and verify redirect to /login

## Step 4: Brute Force Protection Testing

```bash
# Try 6 failed logins
for i in {1..6}; do
  curl -X POST https://tech-ct.preview.emergentagent.com/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@techmasters.com","password":"wrongpass"}'
done
```

Should return 429 after 5 attempts.

## Expected Behaviors

1. **Login Success**: Returns user object + sets httpOnly cookies
2. **Protected Routes**: Return 401 without valid token
3. **Token Expiry**: Access token expires after 15 min
4. **Refresh**: Can refresh with refresh_token cookie
5. **Logout**: Clears both cookies
6. **Brute Force**: Locks after 5 failed attempts for 15 min
