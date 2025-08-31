# Contact Form Character Counter - Technical Implementation Specification

## Problem Statement

- **Business Issue**: The contact form message textarea lacks user feedback on character limits, causing users to exceed the 2000-character backend validation limit without warning
- **Current State**: Message textarea has no maxLength restriction or character counter display, leading to form submission failures when users exceed the 2000-character limit
- **Expected Outcome**: Users receive real-time feedback on message length with visual indicators for approaching/exceeding the character limit, preventing form submission failures

## Solution Overview

- **Approach**: Add a real-time character counter component to the message textarea with color-coded visual feedback and input prevention at the limit
- **Core Changes**: Modify the existing React form component to include character counting logic, visual counter display, and input restriction
- **Success Criteria**: 
  - Character counter displays current count out of 2000 maximum
  - Color changes at defined thresholds (1800+ orange, 2000+ red)
  - Input prevented beyond 2000 characters
  - Counter format remains consistent across all locales

## Technical Implementation

### Code Changes

#### Files to Modify
- **File**: `/Users/henryliu/obelisk/Dubhe/dubhe-website/apps/web/app/[locale]/contact/page.tsx`
- **Modification Type**: Add character counter functionality to existing component

#### Function Signatures and Logic Changes

1. **Enhanced handleChange Function**
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target
  
  // Prevent input beyond 2000 characters for message field
  if (name === 'message' && value.length > 2000) {
    return
  }
  
  setFormData({
    ...formData,
    [name]: value
  })
}
```

2. **Character Counter Color Logic**
```typescript
const getCharacterCountColor = (count: number): string => {
  if (count >= 2000) return 'text-red-500'
  if (count >= 1800) return 'text-orange-500'
  return 'text-gray-400'
}
```

3. **Character Counter Component**
```typescript
const CharacterCounter = ({ count }: { count: number }) => (
  <div className={`text-sm ${getCharacterCountColor(count)} text-right mt-1`}>
    {count}/2000
  </div>
)
```

#### Textarea Field Modification
Replace the existing textarea block (lines 288-302) with:

```typescript
<div>
  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
    {t('form.fields.message.label')} *
  </label>
  <div className="relative">
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      required
      rows={6}
      maxLength={2000}
      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors resize-none"
      placeholder={t('form.fields.message.placeholder')}
    />
    <div className={`text-sm ${getCharacterCountColor(formData.message.length)} absolute bottom-2 right-3`}>
      {formData.message.length}/2000
    </div>
  </div>
</div>
```

### Configuration Changes
- **No Environment Variables**: No new configuration needed
- **No Feature Flags**: Implementation is straightforward without toggles

### API Changes
- **No API Modifications**: Backend validation remains at 2000 characters, frontend now prevents exceeding this limit

## Implementation Sequence

### Phase 1: Core Character Counter Logic
1. **Add character count color function** - Insert `getCharacterCountColor` helper function after state declarations
2. **Modify handleChange function** - Add character limit prevention logic for message field
3. **Update textarea maxLength** - Add `maxLength={2000}` attribute to textarea element

### Phase 2: Visual Counter Implementation  
1. **Add character counter display** - Insert counter div with absolute positioning in bottom-right of textarea container
2. **Apply color-coded styling** - Use getCharacterCountColor function to determine counter text color
3. **Position counter properly** - Use absolute positioning with bottom-2 right-3 classes

### Phase 3: Testing and Validation
1. **Test character counting** - Verify counter updates in real-time as user types
2. **Test color transitions** - Confirm color changes at 1800 and 2000 character thresholds  
3. **Test input prevention** - Ensure typing stops at exactly 2000 characters
4. **Test locale consistency** - Verify counter format stays as "0/2000" across all languages

## Validation Plan

### Unit Tests
- **Character count accuracy**: Verify counter displays correct character count for various input lengths
- **Color threshold testing**: Test color changes at exactly 1799→1800 and 1999→2000 character boundaries
- **Input prevention**: Confirm no characters can be entered beyond 2000 limit
- **Real-time updates**: Ensure counter updates immediately on every keystroke

### Integration Tests
- **Form submission flow**: Test that forms with 2000-character messages submit successfully
- **Validation consistency**: Verify frontend limit matches backend validation (2000 chars)
- **Cross-browser compatibility**: Test counter display and functionality in major browsers

### Business Logic Verification
- **User experience**: Confirm users receive clear visual feedback before hitting character limit
- **Error prevention**: Validate that character counter prevents form submission failures due to length
- **Accessibility**: Ensure counter is readable and provides adequate contrast in all color states

## Edge Cases and Error Handling

### Edge Cases Covered
1. **Paste operations**: Large text pasted into textarea is automatically truncated to 2000 characters
2. **Pre-filled content**: If formData.message is programmatically set above 2000 chars, display reflects actual length
3. **Browser autofill**: Counter updates correctly if browser fills message field
4. **Copy-paste at limit**: Prevents pasting when at character limit

### Error Handling
1. **String length calculation**: Uses standard JavaScript `.length` property (handles Unicode correctly)
2. **Color function safety**: getCharacterCountColor handles negative numbers and extreme values gracefully
3. **State consistency**: Form data and counter always remain synchronized through controlled component pattern

### Technical Considerations
1. **Performance**: Character counting on every keystroke has minimal performance impact for 2000-character limit
2. **Memory usage**: No additional state variables needed beyond existing formData
3. **Accessibility**: Counter provides visual feedback but screen readers can access via aria-describedby if needed in future
4. **Mobile compatibility**: Absolute positioning and text sizing work correctly on mobile devices

## Implementation Notes

- **No Translation Required**: Counter format "0/2000" remains in English across all locales as specified
- **Tailwind Classes Used**: All styling uses existing Tailwind classes consistent with current design system
- **React Hooks**: Leverages existing useState pattern, no additional hooks required
- **Type Safety**: All additions maintain TypeScript compatibility with existing component structure