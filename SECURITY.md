# 🔒 Security Checklist

Before pushing to GitHub, ensure ALL sensitive information is protected:

## ✅ Environment Variables (CRITICAL)

- [ ] `.env.local` file exists and contains your real credentials
- [ ] `.env.local` is in `.gitignore` (should NOT be committed)
- [ ] `env.example` contains only placeholder values
- [ ] No real database URLs in any committed files
- [ ] No real admin credentials in any committed files

## ✅ Database Security

- [ ] Database URL is only in `.env.local`
- [ ] Database has strong password
- [ ] Database is not publicly accessible
- [ ] Admin user credentials are secure

## ✅ Code Security

- [ ] No hardcoded passwords in source code
- [ ] No hardcoded database URLs in source code
- [ ] No hardcoded API keys in source code
- [ ] All sensitive values use environment variables

## ✅ Git Security

- [ ] `.gitignore` properly configured
- [ ] No sensitive files in git history
- [ ] Repository is private (if contains sensitive code)
- [ ] No accidental commits of `.env` files

## 🚨 What to Check Before Pushing

1. **Run this command to see what will be committed:**

   ```bash
   git status
   ```

2. **Ensure these files are NOT staged:**

   - `.env.local`
   - `.env`
   - Any files with real credentials

3. **Verify only these files are staged:**
   - Source code
   - `env.example` (with placeholder values)
   - `README.md`
   - Configuration files (without secrets)

## 🔍 Quick Security Check

Run this command to search for potential secrets:

```bash
# Search for email patterns
grep -r ".*@.*\.com" . --exclude-dir=node_modules --exclude-dir=.git

# Search for potential passwords
grep -r "password.*=" . --exclude-dir=node_modules --exclude-dir=.git

# Search for database URLs
grep -r "postgresql://" . --exclude-dir=node_modules --exclude-dir=.git
```

## 📋 Pre-Push Checklist

- [ ] All environment variables are in `.env.local`
- [ ] `.env.local` is in `.gitignore`
- [ ] `env.example` has only placeholder values
- [ ] No real credentials in any source files
- [ ] Database connection is secure
- [ ] Admin credentials are strong
- [ ] Repository is properly configured

## 🆘 If You Accidentally Commit Secrets

1. **Immediately change the exposed credentials**
2. **Use `git filter-branch` to remove from history**
3. **Force push to overwrite remote history**
4. **Consider the credentials compromised**

---

**⚠️ REMEMBER: When in doubt, don't commit! It's better to be safe than sorry.**
