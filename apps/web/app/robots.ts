import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const env = process.env.NEXT_CONFIG_ENV || 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dubhe.network';

  // If not production, disallow all except social media crawlers
  if (env !== 'production') {
    const allowedUAs = [
      'Discordbot', // Discord
      'LinkedInBot', // LinkedIn
      'facebookexternalhit', // Facebook
      'TelegramBot', // Telegram
      'Twitterbot', // Twitter/X
      'WhatsApp' // WhatsApp
    ];

    return {
      rules: [
        // Allow UAs for Open Graph testing
        ...allowedUAs.map((ua) => ({
          userAgent: ua,
          allow: '/'
        })),
        // Disallow all other user agents
        {
          userAgent: '*',
          disallow: '/'
        }
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // Block AI training crawlers
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
