import type { IconName } from '@/components/icons'

export interface SubService {
  id: string
  name: string
  icon: IconName
  description: string
  slug: string
  metaTitle?: string
  metaDescription?: string
  intro?: string
  features?: string[]
  benefits?: Array<{ title: string; description: string; icon: string }>
  process?: Array<{ step: number; title: string; description: string }>
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  icon: IconName
  description: string
  gradient: string
  subServices: SubService[]
  metaTitle?: string
  metaDescription?: string
  intro?: string
  features?: string[]
  benefits?: Array<{ title: string; description: string; icon: string }>
  process?: Array<{ step: number; title: string; description: string }>
}

// Helper function to get all services (categories + sub-services) as a flat list
export function getAllServices(): Array<SubService & { categoryId: string; categoryName: string }> {
  const allServices: Array<SubService & { categoryId: string; categoryName: string }> = []
  
  servicesData.forEach((category) => {
    // Add category as a service
    allServices.push({
      ...category,
      slug: category.slug,
      categoryId: category.id,
      categoryName: category.name,
    })
    
    // Add sub-services
    category.subServices.forEach((subService) => {
      allServices.push({
        ...subService,
        categoryId: category.id,
        categoryName: category.name,
      })
    })
  })
  
  return allServices
}

// Helper function to get service by slug
export function getServiceBySlug(slug: string): (SubService & { categoryId: string; categoryName: string }) | null {
  const allServices = getAllServices()
  return allServices.find((service) => service.slug === slug) || null
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    slug: 'digital-transformation',
    icon: 'DigitalTransformation',
    description: 'Transform your business with cutting-edge digital solutions that drive innovation and growth.',
    gradient: 'from-purple-500 via-pink-500 to-cyan-500',
    metaTitle: 'Digital Transformation Services | Xentio Digital',
    metaDescription: 'Transform your business with cutting-edge digital solutions. Expert digital transformation services to drive innovation and growth.',
    intro: 'Digital transformation is the integration of digital technology into all areas of your business, fundamentally changing how you operate and deliver value to customers. We help businesses navigate this journey with strategic planning and cutting-edge solutions.',
    features: [
      'Strategic digital roadmap development',
      'Legacy system modernization',
      'Cloud migration and infrastructure',
      'Digital process automation',
      'Data analytics and insights',
      'Change management support',
    ],
    benefits: [
      {
        title: 'Increased Efficiency',
        description: 'Streamline operations and reduce manual processes with automated digital solutions.',
        icon: 'Performance',
      },
      {
        title: 'Better Customer Experience',
        description: 'Deliver seamless, personalized experiences that keep customers engaged.',
        icon: 'Support',
      },
      {
        title: 'Competitive Advantage',
        description: 'Stay ahead of competitors with innovative digital capabilities.',
        icon: 'Award',
      },
      {
        title: 'Data-Driven Decisions',
        description: 'Make informed decisions with real-time analytics and insights.',
        icon: 'Analytics',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Assessment',
        description: 'We analyze your current digital maturity and identify opportunities for transformation.',
      },
      {
        step: 2,
        title: 'Strategy',
        description: 'Develop a comprehensive digital transformation roadmap aligned with your business goals.',
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Execute the transformation plan with agile methodologies and best practices.',
      },
      {
        step: 4,
        title: 'Optimization',
        description: 'Continuously monitor, measure, and optimize your digital initiatives.',
      },
    ],
    subServices: [
      {
        id: 'web-development',
        name: 'Web Development',
        slug: 'web-development',
        icon: 'Code',
        description: 'Custom websites and web applications built with modern technologies.',
        metaTitle: 'Web Development Services | Custom Websites & Web Apps | Xentio Digital',
        metaDescription: 'Professional web development services. Custom websites and web applications built with React, Next.js, and modern technologies. Responsive, fast, and SEO-optimized.',
        intro: 'In today\'s digital-first world, your website is often the first impression customers have of your business. We create stunning, high-performance websites and web applications that not only look great but also drive results.',
        features: [
          'Responsive design for all devices',
          'Modern frameworks (React, Next.js, Vue.js)',
          'SEO optimization',
          'Fast loading times',
          'Secure and scalable architecture',
          'Content management systems',
          'E-commerce integration',
          'API development and integration',
        ],
        benefits: [
          {
            title: 'Professional Online Presence',
            description: 'Establish credibility and trust with a professionally designed website.',
            icon: 'Sparkles',
          },
          {
            title: 'Improved User Experience',
            description: 'Intuitive navigation and seamless interactions keep visitors engaged.',
            icon: 'Target',
          },
          {
            title: 'Higher Conversion Rates',
            description: 'Optimized design and functionality turn visitors into customers.',
            icon: 'Growth',
          },
          {
            title: 'Mobile-First Approach',
            description: 'Reach customers on any device with responsive, mobile-optimized designs.',
            icon: 'Mobile',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Discovery',
            description: 'Understand your business goals, target audience, and requirements.',
          },
          {
            step: 2,
            title: 'Design',
            description: 'Create wireframes and designs that align with your brand and user needs.',
          },
          {
            step: 3,
            title: 'Development',
            description: 'Build your website using best practices and modern technologies.',
          },
          {
            step: 4,
            title: 'Testing & Launch',
            description: 'Thoroughly test across devices and browsers, then launch your site.',
          },
          {
            step: 5,
            title: 'Maintenance',
            description: 'Ongoing support, updates, and optimization to keep your site performing.',
          },
        ],
      },
      {
        id: 'app-development',
        name: 'App Development',
        slug: 'app-development',
        icon: 'Mobile',
        description: 'Native and cross-platform mobile applications for iOS and Android.',
        metaTitle: 'Mobile App Development Services | iOS & Android Apps | Xentio Digital',
        metaDescription: 'Expert mobile app development for iOS and Android. Native and cross-platform apps built with React Native, Flutter, and Swift. User-friendly, scalable mobile solutions.',
        intro: 'Mobile apps have become essential for businesses looking to engage customers, improve operations, and drive growth. We develop native and cross-platform mobile applications that deliver exceptional user experiences.',
        features: [
          'Native iOS and Android development',
          'Cross-platform solutions (React Native, Flutter)',
          'App store optimization',
          'Push notifications',
          'Offline functionality',
          'Secure authentication',
          'Payment integration',
          'Analytics and tracking',
        ],
        benefits: [
          {
            title: 'Enhanced Customer Engagement',
            description: 'Keep your brand in customers\' pockets with a dedicated mobile app.',
            icon: 'Mobile',
          },
          {
            title: 'Improved Accessibility',
            description: 'Make your services available 24/7 through mobile devices.',
            icon: 'Globe',
          },
          {
            title: 'Personalized Experiences',
            description: 'Deliver tailored content and features based on user preferences.',
            icon: 'Design',
          },
          {
            title: 'Increased Revenue',
            description: 'Mobile apps can drive sales through in-app purchases and subscriptions.',
            icon: 'Money',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Concept & Planning',
            description: 'Define app features, user flows, and technical requirements.',
          },
          {
            step: 2,
            title: 'UI/UX Design',
            description: 'Create intuitive interfaces and seamless user experiences.',
          },
          {
            step: 3,
            title: 'Development',
            description: 'Build your app using native or cross-platform technologies.',
          },
          {
            step: 4,
            title: 'Testing',
            description: 'Rigorous testing across devices and operating systems.',
          },
          {
            step: 5,
            title: 'Launch & Support',
            description: 'Deploy to app stores and provide ongoing maintenance.',
          },
        ],
      },
      {
        id: 'custom-software',
        name: 'Custom Software Development',
        slug: 'custom-software',
        icon: 'Tools',
        description: 'Tailored software solutions designed to streamline your operations.',
        metaTitle: 'Custom Software Development | Tailored Business Solutions | Xentio Digital',
        metaDescription: 'Custom software development services. Tailored business software solutions designed to streamline operations, improve efficiency, and drive growth.',
        intro: 'Off-the-shelf software often falls short of meeting your unique business needs. We develop custom software solutions tailored specifically to your workflows, processes, and requirements.',
        features: [
          'Custom business applications',
          'Enterprise software solutions',
          'Workflow automation',
          'Database design and management',
          'API development',
          'System integration',
          'Cloud-based solutions',
          'Legacy system modernization',
        ],
        benefits: [
          {
            title: 'Perfect Fit',
            description: 'Software designed specifically for your business processes and needs.',
            icon: 'Target',
          },
          {
            title: 'Increased Productivity',
            description: 'Automate repetitive tasks and streamline workflows.',
            icon: 'Performance',
          },
          {
            title: 'Scalability',
            description: 'Solutions that grow with your business.',
            icon: 'Growth',
          },
          {
            title: 'Competitive Edge',
            description: 'Unique capabilities that set you apart from competitors.',
            icon: 'Award',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Requirements Analysis',
            description: 'Deep dive into your business needs and technical requirements.',
          },
          {
            step: 2,
            title: 'Architecture Design',
            description: 'Design scalable, maintainable system architecture.',
          },
          {
            step: 3,
            title: 'Development',
            description: 'Agile development with regular iterations and feedback.',
          },
          {
            step: 4,
            title: 'Quality Assurance',
            description: 'Comprehensive testing to ensure reliability and performance.',
          },
          {
            step: 5,
            title: 'Deployment & Training',
            description: 'Deploy the solution and train your team for success.',
          },
        ],
      },
      {
        id: 'ux-ui-design',
        name: 'UX & UI Design',
        slug: 'ui-ux-design',
        icon: 'Design',
        description: 'User-centered design that creates intuitive, beautiful interfaces.',
        metaTitle: 'UX & UI Design Services | User Experience Design | Xentio Digital',
        metaDescription: 'Professional UX/UI design services. User-centered design that creates intuitive, beautiful interfaces. Improve user satisfaction and conversion rates.',
        intro: 'Great design is more than just aesthetics—it\'s about creating experiences that users love. Our UX/UI design services focus on understanding user needs and crafting interfaces that are both beautiful and functional.',
        features: [
          'User research and personas',
          'Wireframing and prototyping',
          'Visual design and branding',
          'Interaction design',
          'Usability testing',
          'Design systems',
          'Responsive design',
          'Accessibility compliance',
        ],
        benefits: [
          {
            title: 'Improved User Satisfaction',
            description: 'Delight users with intuitive, easy-to-use interfaces.',
            icon: 'Support',
          },
          {
            title: 'Higher Conversion Rates',
            description: 'Well-designed experiences guide users to take action.',
            icon: 'Growth',
          },
          {
            title: 'Reduced Development Costs',
            description: 'Clear designs reduce revisions and development time.',
            icon: 'Money',
          },
          {
            title: 'Brand Consistency',
            description: 'Cohesive design systems that strengthen your brand.',
            icon: 'Design',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Research',
            description: 'Understand users, competitors, and business goals.',
          },
          {
            step: 2,
            title: 'Ideation',
            description: 'Brainstorm and create user flows and wireframes.',
          },
          {
            step: 3,
            title: 'Design',
            description: 'Create high-fidelity designs and prototypes.',
          },
          {
            step: 4,
            title: 'Testing',
            description: 'Validate designs through user testing and feedback.',
          },
          {
            step: 5,
            title: 'Refinement',
            description: 'Iterate based on feedback and launch.',
          },
        ],
      },
    ],
  },
  {
    id: 'ecommerce-solutions',
    name: 'E-Commerce Solutions',
    slug: 'ecommerce-solutions',
    icon: 'Ecommerce',
    description: 'Complete eCommerce platforms and marketplace integrations to maximize your online sales.',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    metaTitle: 'E-Commerce Solutions | Online Store Development | Xentio Digital',
    metaDescription: 'Complete eCommerce solutions and marketplace integrations. Shopify, WordPress, Amazon, eBay, and more. Maximize your online sales with expert eCommerce services.',
    intro: 'E-commerce has revolutionized how businesses sell products and services. We help you build and optimize online stores across multiple platforms and marketplaces to maximize your reach and revenue.',
    features: [
      'Multi-platform store setup',
      'Payment gateway integration',
      'Inventory management',
      'Order processing automation',
      'Marketplace integrations',
      'Shopping cart optimization',
      'Product catalog management',
      'Analytics and reporting',
    ],
    benefits: [
      {
        title: 'Increased Sales',
        description: 'Reach more customers and sell 24/7 through online channels.',
        icon: 'Money',
      },
      {
        title: 'Global Reach',
        description: 'Expand your market beyond geographical boundaries.',
        icon: 'Globe',
      },
      {
        title: 'Lower Operating Costs',
        description: 'Reduce overhead compared to physical storefronts.',
        icon: 'Downtrend',
      },
      {
        title: 'Data Insights',
        description: 'Track customer behavior and optimize your sales strategy.',
        icon: 'Analytics',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Platform Selection',
        description: 'Choose the right eCommerce platform for your business needs.',
      },
      {
        step: 2,
        title: 'Store Setup',
        description: 'Configure your store, products, and payment systems.',
      },
      {
        step: 3,
        title: 'Design & Customization',
        description: 'Create a branded shopping experience that converts.',
      },
      {
        step: 4,
        title: 'Integration',
        description: 'Connect with marketplaces, shipping, and inventory systems.',
      },
      {
        step: 5,
        title: 'Launch & Optimization',
        description: 'Go live and continuously optimize for better performance.',
      },
    ],
    subServices: [
      {
        id: 'shopify',
        name: 'Shopify',
        slug: 'shopify',
        icon: 'Store',
        description: 'Professional Shopify stores with custom themes and integrations.',
        metaTitle: 'Shopify Development Services | Custom Shopify Stores | Xentio Digital',
        metaDescription: 'Expert Shopify development services. Custom Shopify stores, themes, and apps. Professional eCommerce solutions built on Shopify.',
        intro: 'Shopify is one of the world\'s leading eCommerce platforms, powering millions of online stores. We create custom Shopify stores that are beautiful, fast, and optimized for conversions.',
        features: [
          'Custom Shopify theme development',
          'Shopify app integration',
          'Payment gateway setup',
          'Product import and management',
          'SEO optimization',
          'Mobile-responsive design',
          'Checkout customization',
          'Analytics integration',
        ],
        benefits: [
          {
            title: 'Easy Management',
            description: 'User-friendly admin panel for managing products and orders.',
            icon: 'Controls',
          },
          {
            title: 'Scalability',
            description: 'Grow from startup to enterprise without platform limitations.',
            icon: 'Growth',
          },
          {
            title: 'App Ecosystem',
            description: 'Access thousands of apps to extend functionality.',
            icon: 'Integrations',
          },
          {
            title: 'Reliable Hosting',
            description: 'Fast, secure hosting with 99.99% uptime guarantee.',
            icon: 'Performance',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Store Setup',
            description: 'Create your Shopify account and configure basic settings.',
          },
          {
            step: 2,
            title: 'Theme Development',
            description: 'Design and develop a custom theme or customize existing ones.',
          },
          {
            step: 3,
            title: 'Product Setup',
            description: 'Import products, set up variants, and configure inventory.',
          },
          {
            step: 4,
            title: 'Integration',
            description: 'Connect payment gateways, shipping, and third-party apps.',
          },
          {
            step: 5,
            title: 'Launch',
            description: 'Test thoroughly and launch your store to the world.',
          },
        ],
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        slug: 'wordpress',
        icon: 'Blog',
        description: 'WooCommerce-powered stores with full customization options.',
        metaTitle: 'WordPress E-Commerce Development | WooCommerce Stores | Xentio Digital',
        metaDescription: 'WordPress eCommerce development with WooCommerce. Custom WordPress stores with full customization. Flexible, scalable eCommerce solutions.',
        intro: 'WordPress with WooCommerce offers unparalleled flexibility for eCommerce. We build custom WordPress stores that give you complete control over design, functionality, and user experience.',
        features: [
          'WooCommerce store development',
          'Custom WordPress themes',
          'Plugin integration',
          'Payment gateway setup',
          'Product catalog management',
          'SEO optimization',
          'Multi-language support',
          'Custom functionality development',
        ],
        benefits: [
          {
            title: 'Full Control',
            description: 'Complete ownership and control over your store.',
            icon: 'Gamepad',
          },
          {
            title: 'Flexibility',
            description: 'Unlimited customization options with themes and plugins.',
            icon: 'Tools',
          },
          {
            title: 'Cost-Effective',
            description: 'No transaction fees, only hosting and domain costs.',
            icon: 'Money',
          },
          {
            title: 'SEO Friendly',
            description: 'WordPress is inherently SEO-friendly with the right setup.',
            icon: 'Search',
          },
        ],
        process: [
          {
            step: 1,
            title: 'WordPress Setup',
            description: 'Install WordPress and WooCommerce on your hosting.',
          },
          {
            step: 2,
            title: 'Theme Development',
            description: 'Create or customize a theme for your brand.',
          },
          {
            step: 3,
            title: 'WooCommerce Configuration',
            description: 'Set up products, shipping, taxes, and payment methods.',
          },
          {
            step: 4,
            title: 'Customization',
            description: 'Add custom functionality and integrate plugins.',
          },
          {
            step: 5,
            title: 'Launch',
            description: 'Optimize performance and launch your store.',
          },
        ],
      },
      {
        id: 'ebay',
        name: 'eBay',
        slug: 'ebay',
        icon: 'Package',
        description: 'eBay store setup, optimization, and automated listing management.',
        metaTitle: 'eBay Store Management Services | eBay Optimization | Xentio Digital',
        metaDescription: 'Professional eBay store management services. eBay store setup, listing optimization, and automated management. Increase your eBay sales.',
        intro: 'eBay is one of the world\'s largest online marketplaces, with millions of active buyers. We help you set up, optimize, and manage your eBay store to maximize visibility and sales.',
        features: [
          'eBay store setup and design',
          'Listing optimization',
          'Automated listing management',
          'Inventory synchronization',
          'Pricing strategies',
          'Performance analytics',
          'Customer service management',
          'Multi-account management',
        ],
        benefits: [
          {
            title: 'Increased Visibility',
            description: 'Optimized listings rank higher in eBay search results.',
            icon: 'Eye',
          },
          {
            title: 'Time Savings',
            description: 'Automate repetitive tasks like listing and inventory updates.',
            icon: 'Clock',
          },
          {
            title: 'Higher Sales',
            description: 'Better listings and pricing strategies drive more sales.',
            icon: 'Money',
          },
          {
            title: 'Professional Presence',
            description: 'Stand out with a well-designed eBay store.',
            icon: 'Sparkles',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Account Setup',
            description: 'Create and verify your eBay seller account.',
          },
          {
            step: 2,
            title: 'Store Design',
            description: 'Design your eBay store with custom branding.',
          },
          {
            step: 3,
            title: 'Listing Optimization',
            description: 'Create optimized product listings with great photos and descriptions.',
          },
          {
            step: 4,
            title: 'Automation Setup',
            description: 'Configure tools for automated listing and inventory management.',
          },
          {
            step: 5,
            title: 'Ongoing Management',
            description: 'Monitor performance and continuously optimize listings.',
          },
        ],
      },
      {
        id: 'amazon',
        name: 'Amazon',
        slug: 'amazon',
        icon: 'Analytics',
        description: 'Amazon FBA setup, product optimization, and account management.',
        metaTitle: 'Amazon FBA Services | Amazon Seller Account Management | Xentio Digital',
        metaDescription: 'Professional Amazon FBA services. Amazon seller account setup, product optimization, and account management. Grow your Amazon business.',
        intro: 'Amazon is the world\'s largest online marketplace, and FBA (Fulfillment by Amazon) makes it easier than ever to reach millions of customers. We help you set up and optimize your Amazon business for success.',
        features: [
          'Amazon seller account setup',
          'FBA enrollment and setup',
          'Product listing optimization',
          'Keyword research and PPC management',
          'Inventory management',
          'Review management',
          'Brand registry',
          'Performance monitoring',
        ],
        benefits: [
          {
            title: 'Prime Eligibility',
            description: 'FBA products are eligible for Amazon Prime shipping.',
            icon: 'DigitalTransformation',
          },
          {
            title: 'Higher Rankings',
            description: 'Optimized listings rank higher in Amazon search.',
            icon: 'Growth',
          },
          {
            title: 'Customer Trust',
            description: 'FBA builds trust with fast, reliable shipping.',
            icon: 'Partnership',
          },
          {
            title: 'Scalability',
            description: 'Amazon handles fulfillment, allowing you to scale easily.',
            icon: 'Analytics',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Account Setup',
            description: 'Create and verify your Amazon seller account.',
          },
          {
            step: 2,
            title: 'FBA Enrollment',
            description: 'Enroll in FBA and set up your fulfillment settings.',
          },
          {
            step: 3,
            title: 'Product Optimization',
            description: 'Create optimized listings with keywords and great images.',
          },
          {
            step: 4,
            title: 'Launch Strategy',
            description: 'Develop PPC campaigns and launch strategies.',
          },
          {
            step: 5,
            title: 'Ongoing Management',
            description: 'Monitor performance, manage inventory, and optimize continuously.',
          },
        ],
      },
      {
        id: 'etsy',
        name: 'Etsy',
        slug: 'etsy',
        icon: 'Design',
        description: 'Etsy shop optimization and listing management for handmade products.',
        metaTitle: 'Etsy Shop Management Services | Etsy Optimization | Xentio Digital',
        metaDescription: 'Professional Etsy shop management services. Etsy shop setup, listing optimization, and management. Grow your handmade business on Etsy.',
        intro: 'Etsy is the go-to marketplace for handmade, vintage, and unique products. We help artisans and crafters optimize their Etsy shops to stand out and drive sales.',
        features: [
          'Etsy shop setup and branding',
          'Listing optimization',
          'SEO for Etsy',
          'Photography guidance',
          'Pricing strategies',
          'Promotional campaigns',
          'Review management',
          'Analytics tracking',
        ],
        benefits: [
          {
            title: 'Increased Discoverability',
            description: 'Optimized listings appear in more Etsy searches.',
            icon: 'Search',
          },
          {
            title: 'Professional Appearance',
            description: 'Well-branded shops build trust and credibility.',
            icon: 'Sparkles',
          },
          {
            title: 'Higher Conversion',
            description: 'Better photos and descriptions lead to more sales.',
            icon: 'Growth',
          },
          {
            title: 'Time Savings',
            description: 'Streamlined processes save time for creating products.',
            icon: 'Clock',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Shop Setup',
            description: 'Create your Etsy shop and set up branding.',
          },
          {
            step: 2,
            title: 'Listing Optimization',
            description: 'Create optimized listings with great photos and SEO.',
          },
          {
            step: 3,
            title: 'Pricing Strategy',
            description: 'Develop competitive pricing that maximizes profit.',
          },
          {
            step: 4,
            title: 'Marketing',
            description: 'Set up Etsy ads and social media promotion.',
          },
          {
            step: 5,
            title: 'Growth',
            description: 'Analyze performance and continuously improve.',
          },
        ],
      },
      {
        id: 'onbuy',
        name: 'OnBuy',
        slug: 'onbuy',
        icon: 'ShoppingBag',
        description: 'OnBuy marketplace integration and store management.',
        metaTitle: 'OnBuy Marketplace Services | OnBuy Store Management | Xentio Digital',
        metaDescription: 'Professional OnBuy marketplace services. OnBuy store setup, integration, and management. Expand your reach with OnBuy.',
        intro: 'OnBuy is a fast-growing UK-based marketplace offering competitive fees and seller-friendly policies. We help you set up and manage your OnBuy store to reach new customers.',
        features: [
          'OnBuy seller account setup',
          'Store configuration',
          'Product listing and optimization',
          'Inventory synchronization',
          'Order management',
          'Performance analytics',
          'Customer service support',
          'Multi-channel integration',
        ],
        benefits: [
          {
            title: 'Lower Fees',
            description: 'Competitive marketplace fees compared to other platforms.',
            icon: 'Money',
          },
          {
            title: 'UK Focus',
            description: 'Strong presence in the UK market.',
            icon: 'Flag',
          },
          {
            title: 'Seller Support',
            description: 'Dedicated support for sellers.',
            icon: 'Partnership',
          },
          {
            title: 'Growing Platform',
            description: 'Early adoption of a rapidly growing marketplace.',
            icon: 'Growth',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Account Setup',
            description: 'Create and verify your OnBuy seller account.',
          },
          {
            step: 2,
            title: 'Store Configuration',
            description: 'Set up your store with branding and policies.',
          },
          {
            step: 3,
            title: 'Product Listing',
            description: 'List and optimize your products for OnBuy.',
          },
          {
            step: 4,
            title: 'Integration',
            description: 'Connect with inventory and order management systems.',
          },
          {
            step: 5,
            title: 'Management',
            description: 'Ongoing management and optimization.',
          },
        ],
      },
    ],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'Growth',
    description: 'Data-driven marketing strategies that increase visibility, engagement, and conversions.',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    metaTitle: 'Digital Marketing Services | SEO, PPC, Social Media | Xentio Digital',
    metaDescription: 'Comprehensive digital marketing services. SEO, Google Ads, social media marketing, and more. Data-driven strategies to grow your business.',
    intro: 'Digital marketing is essential for businesses looking to grow online. We develop and execute data-driven marketing strategies that increase visibility, engage audiences, and drive conversions.',
    features: [
      'Search engine optimization (SEO)',
      'Pay-per-click advertising (PPC)',
      'Social media marketing',
      'Content marketing',
      'Email marketing',
      'Analytics and reporting',
      'Conversion optimization',
      'Marketing automation',
    ],
    benefits: [
      {
        title: 'Increased Visibility',
        description: 'Get found by customers searching for your products or services.',
        icon: 'Eye',
      },
      {
        title: 'Targeted Reach',
        description: 'Reach the right audience at the right time with precision targeting.',
        icon: 'Target',
      },
      {
        title: 'Measurable Results',
        description: 'Track every campaign with detailed analytics and reporting.',
        icon: 'Analytics',
      },
      {
        title: 'Higher ROI',
        description: 'Data-driven strategies maximize return on marketing investment.',
        icon: 'Money',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Strategy',
        description: 'Develop a comprehensive digital marketing strategy.',
      },
      {
        step: 2,
        title: 'Implementation',
        description: 'Execute campaigns across multiple channels.',
      },
      {
        step: 3,
        title: 'Optimization',
        description: 'Continuously optimize based on performance data.',
      },
      {
        step: 4,
        title: 'Reporting',
        description: 'Regular reporting and insights to guide decisions.',
      },
    ],
    subServices: [
      {
        id: 'seo',
        name: 'Search Engine Optimization (SEO)',
        slug: 'seo',
        icon: 'Search',
        description: 'Comprehensive SEO strategies to improve your search rankings.',
        metaTitle: 'SEO Services | Search Engine Optimization | Xentio Digital',
        metaDescription: 'Professional SEO services. Improve your search rankings and drive organic traffic. On-page, off-page, and technical SEO optimization.',
        intro: 'SEO is the foundation of organic online visibility. We implement comprehensive SEO strategies that improve your search rankings, drive qualified traffic, and generate leads.',
        features: [
          'Keyword research and analysis',
          'On-page SEO optimization',
          'Technical SEO audits',
          'Content optimization',
          'Link building',
          'Local SEO',
          'SEO reporting and analytics',
          'Competitor analysis',
        ],
        benefits: [
          {
            title: 'Organic Traffic',
            description: 'Attract visitors without paying for ads.',
            icon: 'Growth',
          },
          {
            title: 'Long-Term Results',
            description: 'SEO provides sustainable, long-term growth.',
            icon: 'Timer',
          },
          {
            title: 'Higher Credibility',
            description: 'Top rankings build trust and authority.',
            icon: 'Award',
          },
          {
            title: 'Better ROI',
            description: 'Organic traffic has no cost per click.',
            icon: 'Money',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Audit',
            description: 'Comprehensive SEO audit of your current website.',
          },
          {
            step: 2,
            title: 'Strategy',
            description: 'Develop SEO strategy based on goals and competition.',
          },
          {
            step: 3,
            title: 'Optimization',
            description: 'Implement on-page and technical optimizations.',
          },
          {
            step: 4,
            title: 'Content',
            description: 'Create and optimize content for target keywords.',
          },
          {
            step: 5,
            title: 'Link Building',
            description: 'Build quality backlinks to improve authority.',
          },
          {
            step: 6,
            title: 'Monitoring',
            description: 'Track rankings and continuously optimize.',
          },
        ],
      },
      {
        id: 'google-ads',
        name: 'Google Ads',
        slug: 'google-ads',
        icon: 'Target',
        description: 'Strategic Google Ads campaigns that drive qualified traffic.',
        metaTitle: 'Google Ads Management Services | PPC Advertising | Xentio Digital',
        metaDescription: 'Expert Google Ads management services. Strategic PPC campaigns that drive qualified traffic and maximize ROI. Professional Google Ads optimization.',
        intro: 'Google Ads is one of the most effective ways to reach customers actively searching for your products or services. We create and manage strategic Google Ads campaigns that drive qualified traffic and maximize ROI.',
        features: [
          'Campaign strategy and setup',
          'Keyword research',
          'Ad copy creation',
          'Landing page optimization',
          'Bid management',
          'A/B testing',
          'Conversion tracking',
          'Performance reporting',
        ],
        benefits: [
          {
            title: 'Immediate Results',
            description: 'Start driving traffic as soon as campaigns go live.',
            icon: 'Performance',
          },
          {
            title: 'Targeted Traffic',
            description: 'Reach people actively searching for your services.',
            icon: 'Target',
          },
          {
            title: 'Full Control',
            description: 'Control budget, targeting, and messaging.',
            icon: 'Gamepad',
          },
          {
            title: 'Measurable ROI',
            description: 'Track every click and conversion.',
            icon: 'Analytics',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Research',
            description: 'Research keywords, competitors, and target audience.',
          },
          {
            step: 2,
            title: 'Campaign Setup',
            description: 'Create campaigns with optimized ad groups and keywords.',
          },
          {
            step: 3,
            title: 'Ad Creation',
            description: 'Write compelling ad copy that drives clicks.',
          },
          {
            step: 4,
            title: 'Launch',
            description: 'Launch campaigns and monitor performance.',
          },
          {
            step: 5,
            title: 'Optimization',
            description: 'Continuously optimize bids, keywords, and ads.',
          },
        ],
      },
      {
        id: 'meta-ads',
        name: 'Meta Ads',
        slug: 'meta-ads',
        icon: 'Megaphone',
        description: 'Facebook and Instagram ad campaigns that engage your audience.',
        metaTitle: 'Meta Ads Management | Facebook & Instagram Advertising | Xentio Digital',
        metaDescription: 'Professional Meta Ads management. Facebook and Instagram advertising campaigns that engage audiences and drive conversions. Expert social media advertising.',
        intro: 'Facebook and Instagram ads allow you to reach billions of users with highly targeted campaigns. We create engaging Meta Ads campaigns that connect with your audience and drive results.',
        features: [
          'Campaign strategy',
          'Audience targeting',
          'Ad creative development',
          'Video ad production',
          'A/B testing',
          'Retargeting campaigns',
          'Conversion tracking',
          'Performance optimization',
        ],
        benefits: [
          {
            title: 'Massive Reach',
            description: 'Access billions of Facebook and Instagram users.',
            icon: 'Globe',
          },
          {
            title: 'Advanced Targeting',
            description: 'Target by demographics, interests, and behaviors.',
            icon: 'Target',
          },
          {
            title: 'Visual Engagement',
            description: 'Use images and video to capture attention.',
            icon: 'Camera',
          },
          {
            title: 'Cost-Effective',
            description: 'Lower cost per click compared to search ads.',
            icon: 'Money',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Audience Research',
            description: 'Identify and define target audiences.',
          },
          {
            step: 2,
            title: 'Creative Development',
            description: 'Create compelling ad creatives and copy.',
          },
          {
            step: 3,
            title: 'Campaign Setup',
            description: 'Set up campaigns with optimal targeting.',
          },
          {
            step: 4,
            title: 'Launch',
            description: 'Launch campaigns and monitor performance.',
          },
          {
            step: 5,
            title: 'Optimization',
            description: 'Optimize based on performance data.',
          },
        ],
      },
      {
        id: 'tiktok-ads',
        name: 'TikTok Ads',
        slug: 'tiktok-ads',
        icon: 'Music',
        description: 'TikTok advertising campaigns to reach younger demographics.',
        metaTitle: 'TikTok Ads Management | TikTok Advertising | Xentio Digital',
        metaDescription: 'Professional TikTok Ads management services. TikTok advertising campaigns to reach younger demographics. Creative, engaging TikTok ad campaigns.',
        intro: 'TikTok has become one of the fastest-growing social media platforms, especially among younger audiences. We create engaging TikTok ad campaigns that capture attention and drive results.',
        features: [
          'TikTok campaign strategy',
          'Video ad creation',
          'Audience targeting',
          'Trend integration',
          'Influencer partnerships',
          'Performance tracking',
          'Creative testing',
          'Budget optimization',
        ],
        benefits: [
          {
            title: 'Young Audience',
            description: 'Reach Gen Z and Millennial consumers.',
            icon: 'Users',
          },
          {
            title: 'High Engagement',
            description: 'TikTok users are highly engaged with content.',
            icon: 'Flame',
          },
          {
            title: 'Viral Potential',
            description: 'Creative content can go viral and reach millions.',
            icon: 'DigitalTransformation',
          },
          {
            title: 'Growing Platform',
            description: 'Early adoption of a rapidly growing platform.',
            icon: 'Growth',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Strategy',
            description: 'Develop TikTok marketing strategy.',
          },
          {
            step: 2,
            title: 'Creative Development',
            description: 'Create engaging video ads that fit TikTok culture.',
          },
          {
            step: 3,
            title: 'Campaign Setup',
            description: 'Set up campaigns with optimal targeting.',
          },
          {
            step: 4,
            title: 'Launch',
            description: 'Launch campaigns and monitor performance.',
          },
          {
            step: 5,
            title: 'Optimization',
            description: 'Optimize based on engagement and conversions.',
          },
        ],
      },
      {
        id: 'social-media',
        name: 'Social Media Marketing',
        slug: 'social-media-marketing',
        icon: 'Megaphone',
        description: 'Complete social media management and content strategies.',
        metaTitle: 'Social Media Marketing Services | Social Media Management | Xentio Digital',
        metaDescription: 'Professional social media marketing services. Complete social media management, content creation, and strategy. Grow your social media presence.',
        intro: 'Social media is where your customers spend their time. We develop comprehensive social media strategies that build your brand, engage your audience, and drive business results.',
        features: [
          'Social media strategy',
          'Content creation',
          'Community management',
          'Influencer partnerships',
          'Social media advertising',
          'Analytics and reporting',
          'Crisis management',
          'Multi-platform management',
        ],
        benefits: [
          {
            title: 'Brand Awareness',
            description: 'Build and strengthen your brand presence.',
            icon: 'Megaphone',
          },
          {
            title: 'Customer Engagement',
            description: 'Connect and engage with your audience directly.',
            icon: 'Message',
          },
          {
            title: 'Lead Generation',
            description: 'Generate leads through social media channels.',
            icon: 'Fish',
          },
          {
            title: 'Customer Support',
            description: 'Provide customer support through social channels.',
            icon: 'Support',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Strategy',
            description: 'Develop social media strategy and goals.',
          },
          {
            step: 2,
            title: 'Content Planning',
            description: 'Plan content calendar and themes.',
          },
          {
            step: 3,
            title: 'Content Creation',
            description: 'Create engaging content for each platform.',
          },
          {
            step: 4,
            title: 'Publishing',
            description: 'Schedule and publish content consistently.',
          },
          {
            step: 5,
            title: 'Engagement',
            description: 'Engage with audience and manage community.',
          },
          {
            step: 6,
            title: 'Analysis',
            description: 'Analyze performance and optimize strategy.',
          },
        ],
      },
      {
        id: 'email-marketing',
        name: 'Email Marketing',
        slug: 'email-marketing',
        icon: 'Mail',
        description: 'Automated email campaigns that nurture leads and drive sales.',
        metaTitle: 'Email Marketing Services | Email Campaign Management | Xentio Digital',
        metaDescription: 'Professional email marketing services. Automated email campaigns, lead nurturing, and email automation. Drive sales with email marketing.',
        intro: 'Email marketing remains one of the most effective digital marketing channels, with high ROI and direct customer communication. We create automated email campaigns that nurture leads and drive sales.',
        features: [
          'Email campaign strategy',
          'Email design and templates',
          'Automation workflows',
          'Segmentation',
          'A/B testing',
          'Deliverability optimization',
          'Analytics and reporting',
          'List management',
        ],
        benefits: [
          {
            title: 'High ROI',
            description: 'Email marketing delivers one of the highest ROIs.',
            icon: 'Money',
          },
          {
            title: 'Direct Communication',
            description: 'Reach customers directly in their inbox.',
            icon: 'Mail',
          },
          {
            title: 'Automation',
            description: 'Automate campaigns to save time and scale.',
            icon: 'Settings',
          },
          {
            title: 'Personalization',
            description: 'Personalize messages for better engagement.',
            icon: 'Target',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Strategy',
            description: 'Develop email marketing strategy and goals.',
          },
          {
            step: 2,
            title: 'List Building',
            description: 'Build and segment your email list.',
          },
          {
            step: 3,
            title: 'Template Design',
            description: 'Design responsive email templates.',
          },
          {
            step: 4,
            title: 'Automation Setup',
            description: 'Set up automated email workflows.',
          },
          {
            step: 5,
            title: 'Campaign Launch',
            description: 'Launch campaigns and monitor performance.',
          },
          {
            step: 6,
            title: 'Optimization',
            description: 'Optimize based on open rates and conversions.',
          },
        ],
      },
    ],
  },
  {
    id: 'customer-care',
    name: 'Customer Care Solutions',
    slug: 'customer-care',
    icon: 'Message',
    description: 'Professional customer support solutions that enhance satisfaction and loyalty.',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    metaTitle: 'Customer Support Services | Customer Care Solutions | Xentio Digital',
    metaDescription: 'Professional customer support and care solutions. 24/7 customer service, help desk, and support management. Enhance customer satisfaction.',
    intro: 'Exceptional customer support is crucial for business success. We provide professional customer care solutions that enhance satisfaction, build loyalty, and drive retention.',
    features: [
      '24/7 customer support',
      'Multi-channel support (email, chat, phone)',
      'Help desk setup',
      'Support ticket management',
      'Knowledge base creation',
      'Customer feedback systems',
      'Support analytics',
      'Training and onboarding',
    ],
    benefits: [
      {
        title: 'Customer Satisfaction',
        description: 'Happy customers lead to repeat business and referrals.',
        icon: 'Support',
      },
      {
        title: 'Reduced Churn',
        description: 'Great support reduces customer churn.',
        icon: 'Downtrend',
      },
      {
        title: 'Brand Reputation',
        description: 'Excellent support builds a positive brand reputation.',
        icon: 'Star',
      },
      {
        title: 'Cost Efficiency',
        description: 'Outsourced support can be more cost-effective.',
        icon: 'Money',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Assessment',
        description: 'Assess your current support needs and challenges.',
      },
      {
        step: 2,
        title: 'Setup',
        description: 'Set up support systems and tools.',
      },
      {
        step: 3,
        title: 'Training',
        description: 'Train support team on products and processes.',
      },
      {
        step: 4,
        title: 'Launch',
        description: 'Launch support services and monitor performance.',
      },
      {
        step: 5,
        title: 'Optimization',
        description: 'Continuously improve based on feedback and metrics.',
      },
    ],
    subServices: [
      {
        id: 'customer-support',
        name: 'Customer Support',
        slug: 'customer-support',
        icon: 'Partnership',
        description: '24/7 customer support services to keep your customers happy.',
        metaTitle: '24/7 Customer Support Services | Customer Service | Xentio Digital',
        metaDescription: 'Professional 24/7 customer support services. Multi-channel customer service, help desk, and support management. Keep your customers happy.',
        intro: 'Reliable customer support is essential for business success. We provide 24/7 customer support services across multiple channels to ensure your customers always receive the help they need.',
        features: [
          '24/7 availability',
          'Multi-channel support',
          'Fast response times',
          'Ticket management',
          'Knowledge base',
          'Customer feedback',
          'Performance metrics',
          'Scalable support',
        ],
        benefits: [
          {
            title: 'Always Available',
            description: 'Support your customers around the clock.',
            icon: 'Clock',
          },
          {
            title: 'Quick Resolution',
            description: 'Fast response times improve satisfaction.',
            icon: 'Performance',
          },
          {
            title: 'Professional Service',
            description: 'Trained support agents provide excellent service.',
            icon: 'Business',
          },
          {
            title: 'Cost Savings',
            description: 'Outsourced support reduces overhead costs.',
            icon: 'Money',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Needs Assessment',
            description: 'Understand your support requirements and goals.',
          },
          {
            step: 2,
            title: 'System Setup',
            description: 'Set up support tools and infrastructure.',
          },
          {
            step: 3,
            title: 'Team Training',
            description: 'Train support team on products and processes.',
          },
          {
            step: 4,
            title: 'Launch',
            description: 'Go live with support services.',
          },
          {
            step: 5,
            title: 'Monitoring',
            description: 'Monitor performance and continuously improve.',
          },
        ],
      },
    ],
  },
  {
    id: 'business-consulting',
    name: 'Business Consulting',
    slug: 'business-consulting',
    icon: 'Business',
    description: 'Strategic consulting to help you grow, scale, and optimize your business operations.',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    metaTitle: 'Business Consulting Services | Business Growth Consulting | Xentio Digital',
    metaDescription: 'Strategic business consulting services. Help grow, scale, and optimize your business. Expert business consulting and strategic guidance.',
    intro: 'Growing a business requires strategic thinking, expert guidance, and actionable insights. Our business consulting services help you navigate challenges, identify opportunities, and achieve sustainable growth.',
    features: [
      'Business strategy development',
      'Market analysis',
      'Operational optimization',
      'Financial planning',
      'Growth strategies',
      'Process improvement',
      'Technology consulting',
      'Change management',
    ],
    benefits: [
      {
        title: 'Strategic Clarity',
        description: 'Gain clarity on direction and priorities.',
        icon: 'Target',
      },
      {
        title: 'Expert Insights',
        description: 'Benefit from experienced consultants\' expertise.',
        icon: 'Brain',
      },
      {
        title: 'Faster Growth',
        description: 'Accelerate growth with proven strategies.',
        icon: 'Growth',
      },
      {
        title: 'Risk Mitigation',
        description: 'Identify and mitigate business risks.',
        icon: 'Shield',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        description: 'Understand your business, challenges, and goals.',
      },
      {
        step: 2,
        title: 'Analysis',
        description: 'Analyze current state and identify opportunities.',
      },
      {
        step: 3,
        title: 'Strategy',
        description: 'Develop actionable strategies and recommendations.',
      },
      {
        step: 4,
        title: 'Implementation',
        description: 'Support implementation of recommended changes.',
      },
      {
        step: 5,
        title: 'Review',
        description: 'Review results and adjust strategies as needed.',
      },
    ],
    subServices: [
      {
        id: 'business-growth',
        name: 'Help You Grow Your Business',
        slug: 'business-consulting',
        icon: 'Analytics',
        description: 'Strategic guidance to accelerate growth and maximize profitability.',
        metaTitle: 'Business Growth Consulting | Grow Your Business | Xentio Digital',
        metaDescription: 'Business growth consulting services. Strategic guidance to accelerate growth and maximize profitability. Expert business growth strategies.',
        intro: 'Every business wants to grow, but knowing how and where to focus efforts can be challenging. We provide strategic guidance to help you accelerate growth, maximize profitability, and achieve your business goals.',
        features: [
          'Growth strategy development',
          'Market expansion planning',
          'Revenue optimization',
          'Customer acquisition strategies',
          'Product development guidance',
          'Partnership development',
          'Investment planning',
          'Performance metrics',
        ],
        benefits: [
          {
            title: 'Faster Growth',
            description: 'Accelerate growth with proven strategies.',
            icon: 'DigitalTransformation',
          },
          {
            title: 'Increased Profitability',
            description: 'Optimize operations to maximize profits.',
            icon: 'Money',
          },
          {
            title: 'Competitive Advantage',
            description: 'Gain advantages over competitors.',
            icon: 'Award',
          },
          {
            title: 'Sustainable Success',
            description: 'Build foundations for long-term success.',
            icon: 'Leaf',
          },
        ],
        process: [
          {
            step: 1,
            title: 'Assessment',
            description: 'Assess current state and growth potential.',
          },
          {
            step: 2,
            title: 'Strategy Development',
            description: 'Develop comprehensive growth strategy.',
          },
          {
            step: 3,
            title: 'Implementation Planning',
            description: 'Create detailed implementation plan.',
          },
          {
            step: 4,
            title: 'Execution Support',
            description: 'Support execution of growth initiatives.',
          },
          {
            step: 5,
            title: 'Monitoring',
            description: 'Monitor progress and adjust strategies.',
          },
        ],
      },
    ],
  },
]
