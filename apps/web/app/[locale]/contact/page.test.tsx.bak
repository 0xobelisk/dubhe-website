import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import ContactPage from './page'

// Mock Next.js modules
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'hero.badge': 'Contact Us',
      'hero.title1': 'Get in',
      'hero.title2': 'Touch', 
      'hero.subtitle': 'Have questions about Dubhe? Want to partner with us? We\'d love to hear from you.',
      'form.title': 'Send us a message',
      'form.fields.name.label': 'Full Name',
      'form.fields.name.placeholder': 'Enter your full name',
      'form.fields.email.label': 'Email Address',
      'form.fields.email.placeholder': 'Enter your email address',
      'form.fields.subject.label': 'Subject',
      'form.fields.subject.placeholder': 'Select a subject',
      'form.fields.subject.options.general': 'General Inquiry',
      'form.fields.subject.options.partnership': 'Partnership',
      'form.fields.subject.options.investment': 'Investment',
      'form.fields.subject.options.grants': 'Grants',
      'form.fields.subject.options.foundationJobs': 'Foundation Jobs',
      'form.fields.subject.options.technical': 'Technical Support',
      'form.fields.subject.options.media': 'Media',
      'form.fields.message.label': 'Message',
      'form.fields.message.placeholder': 'Tell us more about your inquiry...',
      'form.submit': 'Send Message',
      'form.sending': 'Sending...',
      'form.success.title': 'Message sent!',
      'form.success.message': 'We\'ll get back to you within 24-48 hours.',
      'form.success.sendAnother': 'Send another message',
      'form.validationError': 'Validation error',
      'form.sendError': 'Failed to send message. Please try again.',
      'form.networkError': 'Network error. Please check your connection and try again.',
      'info.title': 'Contact Information',
      'info.description': 'We\'re here to help with any questions about Dubhe.',
      'info.email.title': 'General Inquiries',
      'info.business.title': 'Business Inquiries',
      'info.location.title': 'Location',
      'info.location.content': 'Global, Remote-First',
      'info.responseTime.title': 'Response Time',
      'info.responseTime.content': '24-48 hours',
      'quickLinks.title': 'Quick Links',
      'quickLinks.grant': 'Grants Program',
      'quickLinks.incubation': 'Incubation Program',
      'quickLinks.ambassador': 'Ambassador Program',
      'quickLinks.documentation': 'Documentation'
    }
    return translations[key] || key
  }
}))

// Mock fetch for form submission
global.fetch = vi.fn()

describe('Contact Page - Character Counter', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
    // Mock successful API response
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Email sent successfully' })
    } as Response)
  })

  it('displays initial character counter as 0/4000', () => {
    render(<ContactPage />)
    
    const characterCounter = screen.getByText('0/4000')
    expect(characterCounter).toBeInTheDocument()
  })

  it('updates character counter in real-time as user types', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    const testMessage = 'Hello world'
    
    await user.type(messageTextarea, testMessage)
    
    const characterCounter = screen.getByText(`${testMessage.length}/4000`)
    expect(characterCounter).toBeInTheDocument()
  })

  it('shows gray color for character count 0-3599', () => {
    render(<ContactPage />)
    
    const characterCounter = screen.getByText('0/4000')
    expect(characterCounter).toHaveClass('text-gray-400')
  })

  it('shows orange color for character count 3600-3999', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Use fireEvent for performance with large strings
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(3600) } })
    
    const characterCounter = screen.getByText('3600/4000')
    expect(characterCounter).toHaveClass('text-orange-500')
  })

  it('shows red color for character count at 4000', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Use fireEvent for performance with large strings
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(4000) } })
    
    const characterCounter = screen.getByText('4000/4000')
    expect(characterCounter).toHaveClass('text-red-500')
  })

  it('has character limit enforcement through maxLength attribute', () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Verify that the textarea has a maxLength attribute
    expect(messageTextarea).toHaveAttribute('maxLength', '4000')
    
    // Test with exactly 4000 characters
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(4000) } })
    expect(screen.getByText('4000/4000')).toBeInTheDocument()
    expect(screen.getByText('4000/4000')).toHaveClass('text-red-500')
  })

  it('handles incremental typing correctly across thresholds', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Set 3599 characters directly - should be gray
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(3599) } })
    let characterCounter = screen.getByText('3599/4000')
    expect(characterCounter).toHaveClass('text-gray-400')
    
    // Add one more character to reach 3600 - should turn orange
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(3600) } })
    characterCounter = screen.getByText('3600/4000')
    expect(characterCounter).toHaveClass('text-orange-500')
    
    // Add more characters to reach 4000 - should turn red
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(4000) } })
    characterCounter = screen.getByText('4000/4000')
    expect(characterCounter).toHaveClass('text-red-500')
  })

  it('handles editing correctly across color thresholds', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Start with 4000 characters - should be red
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(4000) } })
    let characterCounter = screen.getByText('4000/4000')
    expect(characterCounter).toHaveClass('text-red-500')
    
    // Reduce to 3999 characters - should still be orange (3999 >= 3600)
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(3999) } })
    characterCounter = screen.getByText('3999/4000')
    expect(characterCounter).toHaveClass('text-orange-500')
    
    // Reduce to 3599 characters - should turn back to gray
    fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(3599) } })
    characterCounter = screen.getByText('3599/4000')
    expect(characterCounter).toHaveClass('text-gray-400')
  })

  it('resets character counter after successful form submission', async () => {
    render(<ContactPage />)
    
    // Fill out form
    const nameInput = screen.getByRole('textbox', { name: /full name/i })
    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const subjectSelect = screen.getByRole('combobox', { name: /subject/i })
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    const submitButton = screen.getByRole('button', { name: 'Send Message' })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(subjectSelect, 'general')
    await user.type(messageTextarea, 'Test message with some content')
    
    // Verify character counter shows current count
    expect(screen.getByText('30/4000')).toBeInTheDocument()
    
    // Submit form
    await user.click(submitButton)
    
    // Wait for success state and counter reset
    await waitFor(() => {
      expect(screen.getByText('Message sent!')).toBeInTheDocument()
    })
    
    // Click to send another message
    await user.click(screen.getByText('Send another message'))
    
    // Verify counter is reset to 0/4000
    await waitFor(() => {
      expect(screen.getByText('0/4000')).toBeInTheDocument()
    })
  })

  it('preserves message content during normal form interactions', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    const testMessage = 'This is a test message'
    
    await user.type(messageTextarea, testMessage)
    expect(screen.getByText(`${testMessage.length}/4000`)).toBeInTheDocument()
    
    // Fill other form fields - message should remain
    await user.type(screen.getByRole('textbox', { name: /full name/i }), 'John Doe')
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox', { name: /subject/i }), 'general')
    
    // Verify message and counter are preserved
    expect(messageTextarea).toHaveValue(testMessage)
    expect(screen.getByText(`${testMessage.length}/4000`)).toBeInTheDocument()
  })


  it('handles empty input correctly', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    
    // Type some text first
    await user.type(messageTextarea, 'Some text')
    expect(screen.getByText('9/4000')).toBeInTheDocument()
    
    // Clear all text
    await user.clear(messageTextarea)
    
    // Should show 0/4000 with gray color
    expect(screen.getByText('0/4000')).toBeInTheDocument()
    expect(screen.getByText('0/4000')).toHaveClass('text-gray-400')
  })

  describe('character count color logic', () => {
    const testCases = [
      { count: 0, expectedClass: 'text-gray-400' },
      { count: 3599, expectedClass: 'text-gray-400' },
      { count: 3600, expectedClass: 'text-orange-500' },
      { count: 3999, expectedClass: 'text-orange-500' },
      { count: 4000, expectedClass: 'text-red-500' }
    ]
    
    testCases.forEach(({ count, expectedClass }) => {
      it(`shows ${expectedClass} for ${count} characters`, () => {
        render(<ContactPage />)
        const messageTextarea = screen.getByRole('textbox', { name: /message/i })
        
        if (count > 0) {
          fireEvent.change(messageTextarea, { target: { value: 'a'.repeat(count) } })
        }
        
        const characterCounter = screen.getByText(`${count}/4000`)
        expect(characterCounter).toHaveClass(expectedClass)
      })
    })
  })

  it('character counter is positioned correctly within textarea container', () => {
    render(<ContactPage />)
    
    const characterCounter = screen.getByText('0/4000')
    
    // Verify positioning classes
    expect(characterCounter).toHaveClass('absolute', 'bottom-2', 'right-3')
  })

  it('maintains character counter visibility during form interaction', async () => {
    render(<ContactPage />)
    
    const messageTextarea = screen.getByRole('textbox', { name: /message/i })
    const characterCounter = screen.getByText('0/4000')
    
    // Verify counter is in the DOM
    expect(characterCounter).toBeInTheDocument()
    
    // Type some text
    await user.type(messageTextarea, 'Testing')
    
    // Counter should still be in DOM with updated count
    const updatedCounter = screen.getByText('7/4000')
    expect(updatedCounter).toBeInTheDocument()
    
    // Focus should not affect presence in DOM
    await user.click(messageTextarea)
    expect(updatedCounter).toBeInTheDocument()
  })
})