# Security Report

## Latest Security Audit: January 2025

### Status: ✅ All Vulnerabilities Fixed

This document tracks security vulnerabilities and their resolutions in the Dubhe Website project.

## Fixed Vulnerabilities (5 total)

### 1. 🔴 Moderate: Babel RegExp Complexity
- **Package**: `@babel/runtime-corejs3`
- **Vulnerable Versions**: `<7.26.10`  
- **Fixed Version**: `>=7.26.10`
- **Issue**: Inefficient RegExp complexity when transpiling named capturing groups
- **CVE**: [GHSA-968p-4wvh-cqc8](https://github.com/advisories/GHSA-968p-4wvh-cqc8)
- **Status**: ✅ Fixed

### 2. 🟡 Low: Brace-expansion RegExp DoS (v1.x)
- **Package**: `brace-expansion`
- **Vulnerable Versions**: `>=1.0.0 <=1.1.11`
- **Fixed Version**: `1.1.12`
- **Issue**: Regular Expression Denial of Service vulnerability
- **CVE**: [GHSA-v6h2-p8h4-qcjw](https://github.com/advisories/GHSA-v6h2-p8h4-qcjw)
- **Status**: ✅ Fixed

### 3. 🟡 Low: Brace-expansion RegExp DoS (v2.x)
- **Package**: `brace-expansion`
- **Vulnerable Versions**: `>=2.0.0 <=2.0.1`
- **Fixed Version**: `2.0.2`
- **Issue**: Regular Expression Denial of Service vulnerability  
- **CVE**: [GHSA-v6h2-p8h4-qcjw](https://github.com/advisories/GHSA-v6h2-p8h4-qcjw)
- **Status**: ✅ Fixed

### 4. 🟡 Low: ESLint Plugin Kit RegExp DoS
- **Package**: `@eslint/plugin-kit`
- **Vulnerable Versions**: `<0.3.4`
- **Fixed Version**: `>=0.3.4`
- **Issue**: RegExp DoS through ConfigCommentParser
- **CVE**: [GHSA-xffm-g5w8-qvg7](https://github.com/advisories/GHSA-xffm-g5w8-qvg7)
- **Status**: ✅ Fixed

### 5. 🟡 Low: TMP Symbolic Link Vulnerability
- **Package**: `tmp`
- **Vulnerable Versions**: `<=0.2.3`
- **Fixed Version**: `>=0.2.4`
- **Issue**: Arbitrary file/directory write via symbolic link
- **CVE**: [GHSA-52f5-9888-hmc6](https://github.com/advisories/GHSA-52f5-9888-hmc6)
- **Status**: ✅ Fixed

## Applied Security Measures

### PNPM Overrides Configuration
The following overrides were added to `package.json` to force secure versions:

```json
{
  "pnpm": {
    "overrides": {
      "@babel/runtime-corejs3@<7.26.10": ">=7.26.10",
      "brace-expansion@>=1.0.0 <=1.1.11": "1.1.12",
      "brace-expansion@>=2.0.0 <=2.0.1": "2.0.2", 
      "@eslint/plugin-kit@<0.3.4": ">=0.3.4",
      "tmp@<=0.2.3": ">=0.2.4"
    }
  }
}
```

### Security Commands

```bash
# Run security audit
pnpm audit

# Run security audit with detailed output
pnpm audit --audit-level low

# Fix vulnerabilities automatically  
pnpm audit --fix

# Check for outdated dependencies
pnpm outdated
```

## Security Best Practices

1. **Regular Audits**: Run `pnpm audit` before each release
2. **Dependency Updates**: Keep dependencies updated regularly
3. **Override Management**: Use PNPM overrides for critical security fixes
4. **Build Verification**: Always test build after security updates
5. **Linting**: Maintain code quality with ESLint rules

## Verification

✅ All security audits pass: `No known vulnerabilities found`
✅ Build succeeds: All packages build successfully  
✅ Linting passes: All ESLint rules pass
✅ Functionality tested: Core features work as expected

## Next Steps

- Schedule monthly security audits
- Monitor security advisories for used packages
- Consider automated security updates in CI/CD pipeline
- Review and update security policies regularly

---

**Last Updated**: January 2025  
**Next Audit**: February 2025