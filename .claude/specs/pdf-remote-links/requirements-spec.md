# Technical Specification: Replace Local PDF Files with Google Drive Remote Links

## Problem Statement
- **Business Issue**: Local PDF files (Lightpaper.pdf and Onepaper.pdf) in /en/assets/ directory have been deleted from the repository but are still referenced by the Papers page, causing broken download functionality
- **Current State**: Papers page at /[locale]/papers contains hardcoded local paths that return 404 errors when users attempt to download PDFs
- **Expected Outcome**: Seamless PDF download functionality using Google Drive hosted files with proper fallback handling and maintained internationalization support

## Solution Overview
- **Approach**: Replace hardcoded local PDF paths with Google Drive URLs while maintaining current download behavior and testing infrastructure
- **Core Changes**: Modify PDF URL generation functions in Papers page component, update test expectations to handle remote URLs, and implement environment variable configuration for flexibility
- **Success Criteria**: Users can download PDFs successfully from Google Drive URLs, all existing tests pass with updated remote URL expectations, and functionality works across all supported locales

## Technical Implementation

### Database Changes
- **Tables to Modify**: None required
- **New Tables**: None required  
- **Migration Scripts**: No database changes needed

### Code Changes
- **Files to Modify**: 
  - `/Users/henryliu/obelisk/Dubhe/dubhe-website/apps/web/app/[locale]/papers/page.tsx` - Update PDF URL generation functions
  - `/Users/henryliu/obelisk/Dubhe/dubhe-website/apps/web/tests/papers-feature.spec.ts` - Update test expectations for remote URLs
  - `/Users/henryliu/obelisk/Dubhe/dubhe-website/apps/web/tests/papers-i18n-simple.test.tsx` - Remove locale-specific PDF fallback logic and update mocks
  - `/Users/henryliu/obelisk/Dubhe/dubhe-website/apps/web/.env.example` - Add Google Drive URL environment variables

- **New Files**: None required

- **Function Signatures**: 
  - `getLightpaperUrl(): string` - Return Google Drive URL for Lightpaper
  - `getOnepaperUrl(): string` - Return Google Drive URL for Onepager
  - Add optional `getGoogleDriveDownloadUrl(fileId: string): string` helper function

### API Changes
- **Endpoints**: No new endpoints required
- **Request/Response**: No API changes needed
- **Validation Rules**: No additional validation required

### Configuration Changes
- **Settings**: Add Google Drive PDF URLs to environment variables
- **Environment Variables**: 
  - `NEXT_PUBLIC_LIGHTPAPER_URL` - Google Drive URL for Lightpaper
  - `NEXT_PUBLIC_ONEPAGER_URL` - Google Drive URL for Onepager
- **Feature Flags**: None required

## Implementation Sequence

### Phase 1: Environment Configuration
- Add Google Drive URL environment variables to `.env.example`
- Update PDF URL generation functions in `page.tsx` to use environment variables with fallback to hardcoded Google Drive URLs
- Test local development with new URLs

### Phase 2: Component Updates  
- Modify `getLightpaperUrl()` function to return: `https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing`
- Modify `getOnepaperUrl()` function to return: `https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing`
- Remove locale-specific PDF fallback logic since same PDFs are used for all locales
- Add optional Google Drive download URL conversion helper

### Phase 3: Test Updates
- Update `papers-feature.spec.ts` to expect remote Google Drive URLs instead of local paths
- Modify test assertions to handle Google Drive URL patterns
- Update `papers-i18n-simple.test.tsx` to remove locale-specific PDF logic and mock remote URLs
- Remove network HEAD request mocking for local PDF files
- Add test coverage for Google Drive URL generation

## Validation Plan

### Unit Tests
- Verify `getLightpaperUrl()` returns correct Google Drive URL
- Verify `getOnepaperUrl()` returns correct Google Drive URL  
- Test PDF card click behavior opens Google Drive URLs in new tab
- Validate environment variable fallback behavior

### Integration Tests
- End-to-end test PDF download functionality works with Google Drive URLs
- Verify download behavior across different browsers (Chrome, Firefox, Safari)
- Test Google Drive URL accessibility and download success
- Validate functionality across all supported locales (en, fr, zh-TW, etc.)

### Business Logic Verification
- Confirm PDF files are accessible via Google Drive URLs
- Verify download functionality matches previous local file behavior
- Test fallback handling if Google Drive is temporarily unavailable
- Validate internationalization still works correctly with single PDF source

## Implementation Details

### Current PDF URL Generation (Before)
```typescript
const getLightpaperUrl = () => {
  return `/en/assets/Lightpaper.pdf`;
};

const getOnepaperUrl = () => {
  return `/en/assets/Onepaper.pdf`;
};
```

### Updated PDF URL Generation (After)  
```typescript
const getLightpaperUrl = () => {
  return process.env.NEXT_PUBLIC_LIGHTPAPER_URL || 
         'https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing';
};

const getOnepaperUrl = () => {
  return process.env.NEXT_PUBLIC_ONEPAGER_URL || 
         'https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing';
};
```

### Environment Variables Configuration
```bash
# Google Drive PDF URLs
NEXT_PUBLIC_LIGHTPAPER_URL=https://drive.google.com/file/d/18VPJaivmd5FXYuFFhhhvUOWpeQyP-q1F/view?usp=sharing
NEXT_PUBLIC_ONEPAPER_URL=https://drive.google.com/file/d/1aUwBNGsEuZ4cg0qeDpqDC4LbyEb9Q5OY/view?usp=sharing
```

### Test Updates Required

#### papers-feature.spec.ts Changes
- Update URL expectations from `/papers/whitepaper-*.pdf` to Google Drive URLs
- Modify network request mocking to handle Google Drive domain
- Update download filename expectations to handle Google Drive response headers

#### papers-i18n-simple.test.tsx Changes  
- Remove locale-based PDF URL generation logic
- Update mock implementations to return Google Drive URLs
- Remove HEAD request mocking for local PDF file existence checks
- Simplify test logic since all locales use same PDF files

### Error Handling Strategy
- Maintain existing error handling in `handleDownload` function
- Add optional logging for Google Drive URL access failures
- Consider adding user notification if Google Drive is unavailable
- Preserve existing graceful degradation for network issues

### Accessibility Considerations
- Google Drive URLs maintain same `_blank` target behavior
- Preserve existing `noopener,noreferrer` security attributes
- Maintain keyboard navigation functionality
- Keep existing ARIA labels and semantic structure

### Performance Considerations  
- Google Drive URLs load faster than local files for global users
- No impact on initial page load since URLs are generated on click
- Consider implementing URL preloading if needed for performance optimization
- Monitor Google Drive response times vs previous local file performance

This specification provides complete implementation guidance for replacing local PDF files with Google Drive remote links while maintaining all existing functionality and testing infrastructure.