# Requirements Confirmation - Contact Form Character Limit Feature

## Original Request
Add a character limit indicator (0/4000 format) to the contact form's message field, addressing the "Invalid content detected" error issue shown in the screenshots.

## Repository Context Impact
Based on the repository scan and code analysis:
- **Existing Contact Form**: Located at `/app/[locale]/contact/page.tsx`
- **API Validation**: Message field has a 2000 character limit (not 4000 as user mentioned)
- **Current Issue**: No visual indicator for character limits in the UI
- **I18n System**: next-intl with 16 supported locales
- **Error Handling**: Already has validation error display mechanism

## Requirements Analysis

### Current Situation
1. The contact form message field has a backend validation limit of 2000 characters
2. Users get an "Invalid content detected" error when exceeding the limit
3. No character counter is shown in the UI, causing poor user experience
4. User mentioned 4000 characters, but actual limit is 2000

### Proposed Solution
Add a real-time character counter to the message textarea that:
1. Shows current character count vs maximum (e.g., "235/2000")
2. Updates as user types
3. Changes color when approaching limit (warning at 90%, error at 100%)
4. Prevents submission when over limit
5. Supports all 16 locales

## Quality Assessment (Current Score: 75/100)

### Functional Clarity (25/30 points)
- ✅ Clear requirement: add character counter
- ✅ User interaction: real-time updates
- ✅ Success criteria: prevent validation errors
- ❓ Missing: Should we update limit to 4000 or keep 2000?

### Technical Specificity (20/25 points)
- ✅ Integration point identified (contact form)
- ✅ Validation logic understood
- ✅ Component location known
- ❓ Missing: Exact visual design preferences

### Implementation Completeness (20/25 points)
- ✅ Edge cases identified (limit exceeded)
- ✅ Error prevention strategy
- ❓ Missing: Behavior for other form fields (name has 100 char limit)

### Business Context (10/20 points)
- ✅ Improves user experience
- ❓ Missing: Priority confirmation
- ❓ Missing: Design consistency requirements

## User Clarifications Received

1. **Character Limit Value**: Keep current 2000 limit and display counter
2. **Counter Scope**: Add counter only to message field  
3. **Visual Design**: 
   - Format: "0/2000"
   - Position: Bottom-right corner of textarea
   - Use warning colors (yellow/orange approaching limit, red at limit)
4. **Internationalization**: Simple "0/2000" format for all locales

## Final Implementation Plan

### Confirmed Requirements:
1. Keep backend limit at 2000 characters (no backend changes needed)
2. Add character counter only to the message textarea field
3. Display format: "0/2000" in bottom-right corner
4. Color coding:
   - Default (0-1799): text-gray-400
   - Warning (1800-1999): text-orange-500
   - Error (2000+): text-red-500
5. Prevent typing beyond 2000 characters (maxLength attribute)
6. Keep counter format consistent across all 16 locales (no translation needed)

### Technical Implementation Details:
- Update `/app/[locale]/contact/page.tsx` component
- Add state to track message length
- Display counter below textarea, aligned to the right
- Use Tailwind classes for styling and color transitions
- Add maxLength="2000" to textarea element
- Ensure counter updates in real-time as user types

## Quality Assessment (Final Score: 95/100)

### Functional Clarity (30/30 points)
- ✅ Clear requirement: add character counter
- ✅ User interaction: real-time updates
- ✅ Success criteria: prevent validation errors
- ✅ Character limit confirmed: 2000

### Technical Specificity (25/25 points)
- ✅ Integration point identified (contact form)
- ✅ Validation logic understood
- ✅ Component location known
- ✅ Visual design specified

### Implementation Completeness (25/25 points)
- ✅ Edge cases identified (limit exceeded)
- ✅ Error prevention strategy
- ✅ Scope defined (message field only)
- ✅ Color scheme defined

### Business Context (15/20 points)
- ✅ Improves user experience
- ✅ Prevents form submission errors
- ✅ Design requirements clear
- ⚠️ Minor: Could add haptic feedback or animation