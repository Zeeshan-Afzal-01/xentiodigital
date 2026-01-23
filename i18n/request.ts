import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { translate } from '@/lib/server-translation';

// Can be imported from a shared config
export const locales = ['en', 'fr', 'de', 'es', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'ru', 'hi'] as const;
export const defaultLocale = 'en' as const;

// Load base English messages from JSON file
async function getBaseMessages() {
  try {
    return (await import('../messages/en.json')).default;
  } catch {
    // Fallback if JSON doesn't exist
    return {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        portfolio: 'Portfolio',
        testimonials: 'Testimonials',
        team: 'Team',
        careers: 'Careers',
        contact: 'Contact',
        blog: 'Blog',
      },
      hero: {
        title: 'Transform Your Digital Presence',
        subtitle: 'We deliver cutting-edge digital solutions that drive growth, engage customers, and elevate your brand in the digital landscape.',
        cta: 'Get Started',
        ctaSecondary: 'View Our Work',
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive digital services to help your business thrive online',
      },
      footer: {
        company: 'Company',
        services: 'Services',
        legal: 'Legal',
        follow: 'Follow Us',
        rights: 'All rights reserved',
      },
    };
  }
}

/**
 * Recursively translate nested object
 * Wraps each translation in try-catch to prevent one failure from breaking all translations
 */
async function translateObject(obj: any, locale: string): Promise<any> {
  if (typeof obj === 'string') {
    try {
      return await translate(obj, locale);
    } catch (error) {
      console.warn(`Translation failed for text: "${obj.substring(0, 50)}..."`, error);
      return obj; // Return original on error
    }
  }
  
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => translateObject(item, locale)));
  }
  
  if (obj && typeof obj === 'object') {
    const translated: any = {};
    for (const [key, value] of Object.entries(obj)) {
      try {
        translated[key] = await translateObject(value, locale);
      } catch (error) {
        console.warn(`Translation failed for key: ${key}`, error);
        translated[key] = value; // Keep original on error
      }
    }
    return translated;
  }
  
  return obj;
}

/**
 * Translate messages dynamically using translation API
 */
async function translateMessages(locale: string, baseMessages: any): Promise<any> {
  if (locale === 'en') {
    return baseMessages;
  }

  try {
    // Translate all messages recursively
    return await translateObject(baseMessages, locale);
  } catch (error) {
    console.error(`Failed to translate messages for ${locale}:`, error);
    // Fallback to English
    return baseMessages;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from the request
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  try {
    // Load base English messages
    const baseMessages = await getBaseMessages();
    
    // Try to load from JSON file first (for performance/caching)
    try {
      const messages = (await import(`../messages/${locale}.json`)).default;
      return {
        locale,
        messages,
      };
    } catch {
      // If JSON doesn't exist, translate dynamically using API
      const messages = await translateMessages(locale, baseMessages);
      return {
        locale,
        messages,
      };
    }
  } catch (error) {
    // Fallback to English if everything fails
    console.error(`Failed to load messages for locale ${locale}, falling back to ${defaultLocale}:`, error);
    const fallbackMessages = await getBaseMessages();
    return {
      locale: defaultLocale,
      messages: fallbackMessages,
    };
  }
});
