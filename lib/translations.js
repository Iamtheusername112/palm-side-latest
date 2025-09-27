/**
 * Static translations dictionary
 * Contains common UI labels and text in English, German, and Spanish
 */

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.properties': 'Properties',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',

    // Common UI
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.view': 'View',
    'common.details': 'Details',
    'common.more': 'More',
    'common.less': 'Less',
    'common.show': 'Show',
    'common.hide': 'Hide',

    // Buttons
    'btn.submit': 'Submit',
    'btn.reset': 'Reset',
    'btn.clear': 'Clear',
    'btn.upload': 'Upload',
    'btn.download': 'Download',
    'btn.export': 'Export',
    'btn.import': 'Import',
    'btn.refresh': 'Refresh',
    'btn.retry': 'Retry',
    'btn.continue': 'Continue',
    'btn.finish': 'Finish',
    'btn.cancel': 'Cancel',
    'btn.yes': 'Yes',
    'btn.no': 'No',

    // Forms
    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.message': 'Message',
    'form.subject': 'Subject',
    'form.password': 'Password',
    'form.confirmPassword': 'Confirm Password',
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.invalid': 'Invalid',
    'form.valid': 'Valid',

    // Property related
    'property.title': 'Property',
    'property.properties': 'Properties',
    'property.price': 'Price',
    'property.location': 'Location',
    'property.size': 'Size',
    'property.bedrooms': 'Bedrooms',
    'property.bathrooms': 'Bathrooms',
    'property.type': 'Type',
    'property.status': 'Status',
    'property.description': 'Description',
    'property.features': 'Features',
    'property.amenities': 'Amenities',
    'property.images': 'Images',
    'property.video': 'Video',
    'property.tour': 'Virtual Tour',
    'property.contact': 'Contact Agent',
    'property.inquire': 'Inquire',
    'property.schedule': 'Schedule Viewing',
    'property.favorite': 'Add to Favorites',
    'property.share': 'Share',

    // Property status
    'status.available': 'Available',
    'status.sold': 'Sold',
    'status.pending': 'Pending',
    'status.rented': 'Rented',
    'status.offMarket': 'Off Market',

    // Property types
    'type.house': 'House',
    'type.apartment': 'Apartment',
    'type.condo': 'Condo',
    'type.townhouse': 'Townhouse',
    'type.villa': 'Villa',
    'type.penthouse': 'Penthouse',
    'type.studio': 'Studio',
    'type.duplex': 'Duplex',
    'type.loft': 'Loft',

    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.properties': 'Properties',
    'admin.clients': 'Clients',
    'admin.contacts': 'Contacts',
    'admin.analytics': 'Analytics',
    'admin.settings': 'Settings',
    'admin.add': 'Add New',
    'admin.edit': 'Edit',
    'admin.delete': 'Delete',
    'admin.manage': 'Manage',
    'admin.overview': 'Overview',
    'admin.stats': 'Statistics',
    'admin.reports': 'Reports',

    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.sent': 'Message sent successfully!',
    'contact.error': 'Failed to send message. Please try again.',

    // Footer
    'footer.copyright': '© 2024 Palmside Real Estate. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.siteNotice': 'Site Notice',

    // Hero Section
    'hero.welcome': 'Welcome to Palmside',
    'hero.subtitle': 'Your trusted partner in real estates',
    'hero.description':
      'Discover the perfect place to call home in Mallorca with us by your side.',
    'hero.exploreProperties': 'Explore Properties',
    'hero.learnMore': 'Learn More',
    'hero.startJourney': 'Start your journey',
    'hero.beginAdventure': 'Begin your adventure in style',
    'hero.journeyDescription':
      'Your journey begins with comfort and elegance from the very first step.',
    'hero.seamlessTransfer': 'Seamless Transfer',
    'hero.runwayToRelaxation': 'From runway to relaxation',
    'hero.transferDescription':
      'Your next chapter begins smoothly, transitioning effortlessly to the destination that awaits.',
    'hero.endlessCoastlines': 'Endless Coastlines',
    'hero.mediterraneanSea': 'Relax by the Mediterranean sea',
    'hero.coastlineDescription':
      'Soak up the sun and enjoy the turquoise waters.',
    'hero.historicElegance': 'Historic Elegance',
    'hero.timelessBeauty': 'Discover the timeless beauty of Mallorca',
    'hero.eleganceDescription':
      'Immerse yourself in culture and architectural splendor.',
    'hero.sunsetDrinks': 'Sunset & Drinks',
    'hero.perfectView': 'Relax with a perfect view',
    'hero.drinksDescription':
      'Enjoy unforgettable evenings with vibrant sunsets and drinks.',
    'hero.dreamHome': 'Discover Your Dream Home',
    'hero.luxuryProperties': 'Luxury properties in prime locations',
    'hero.homeDescription':
      'Experience the perfect blend of comfort and elegance.',
    'hero.diveRelaxation': 'Dive Into Relaxation',
    'hero.ownPool': 'Luxury living with your own pool',
    'hero.poolDescription': 'Refresh in style with exclusive poolside moments.',
    'hero.terracePool': 'Terrace with Pool',
    'hero.outdoorLiving': 'Enjoy outdoor living',
    'hero.terraceDescription':
      'A perfect blend of comfort, style, and sunshine.',
    'hero.modernDining': 'Modern Dining Spaces',
    'hero.brightfulRooms': 'Modern brightful rooms',
    'hero.diningDescription': 'Savor exquisite meals in a modern setting.',
    'hero.stylishLiving': 'Stylish Living Room',
    'hero.elegantInteriors': 'Elegant interiors for relaxed living',
    'hero.livingDescription': 'Comfort and luxury in perfect harmony.',
    'hero.luxuryBedroom': 'Luxury Bedroom',
    'hero.restInStyle': 'Rest in style and comfort',
    'hero.bedroomDescription':
      'A sanctuary designed for relaxation and tranquility.',
    'hero.modernKitchen': 'Modern Kitchen',
    'hero.wellEquipped': 'Enjoy cooking in modern, well-equipped kitchens',
    'hero.kitchenDescription':
      'A kitchen designed for ease, style, and everyday living.',
    'hero.stylishInterior': 'Stylish Interior',
    'hero.innovativeDesigns': 'Innovative designs for modern living',
    'hero.interiorDescription':
      'Unique interiors combining beauty and function.',
    'hero.saunaWellness': 'Sauna & Wellness',
    'hero.relaxBodyMind': 'Relax your body and mind',
    'hero.wellnessDescription':
      'The ultimate wellness experience in your private retreat.',
    'hero.wellness': 'Wellness',
    'hero.rejuvenateIndoors': 'Rejuvenate indoors',
    'hero.wellnessIndoorsDescription':
      'Luxury spa and wellness at your fingertips.',

    // Page Banners
    'banner.about': 'About Palmside Mallorca',
    'banner.aboutSubtitle':
      'Local expertise, multilingual guidance, and end-to-end support in Mallorca.',
    'banner.properties': 'Discover Your Dream Property',
    'banner.propertiesSubtitle':
      'Explore our curated collection of premium properties across Mallorca and beyond.',
    'banner.services': 'Our Services',
    'banner.servicesSubtitle':
      'We deliver comprehensive real estate services with tailored property solutions and personalized support, making life on Mallorca smooth and worry-free.',
    'banner.contact': 'Get In Touch',
    'banner.contactSubtitle':
      "Ready to start your real estate journey? We're here to help you find your perfect property.",

    // About Page
    'about.ourStory': 'Our Story',
    'about.story1':
      "We're three real estate professionals united by our love for Mallorca and years of experience in the island's property market.",
    'about.story2':
      "After years of helping people navigate the island's property market, we founded Palmside Mallorca to combine our professional expertise with our genuine love for this incredible place.",
    'about.story3':
      "From your first visit to the island, we're here to guide you through finding, buying, and truly enjoying your perfect home in Mallorca. We know the process can feel overwhelming when you're dealing with a foreign market, different legal systems, and language barriers – that's exactly why we're here.",
    'about.story4':
      "Between the three of us, we speak English, German, Spanish, and French, so you'll never feel lost in translation during viewings, negotiations, or paperwork. Whether you're searching for your dream home, navigating the complexities of Spanish property law, managing an existing investment, or planning a renovation, we handle every detail from the legal maze to helping you find the best local property.",
    'about.languagesSupport': 'Languages & Support',
    'about.english': 'English',
    'about.german': 'German',
    'about.spanish': 'Spanish',
    'about.french': 'French',
    'about.howWeHelp': 'How We Help',
    'about.homeSearch': 'Home search & viewings',
    'about.negotiations': 'Negotiations & offers',
    'about.legalCoordination': 'Legal & notary coordination',
    'about.dueDiligence': 'Due diligence & valuation',
    'about.renovationPlanning': 'Renovation planning',
    'about.propertyManagement': 'Property management',
    'about.ourMission': 'Our Mission',
    'about.missionText':
      "To empower our clients with innovative real estate solutions that maximize returns, minimize risks, and create lasting value. We strive to be the most trusted partner in every client's real estate journey.",
    'about.ourVision': 'Our Vision',
    'about.visionText':
      'To be the leading real estate company in South Florida, recognized for our innovation, integrity, and exceptional client outcomes. We envision a future where real estate investment is accessible, profitable, and rewarding for everyone.',
    'about.readyToWork': 'Ready to Work With Us?',
    'about.readyText':
      'Join hundreds of satisfied clients who trust us with their real estate investments.',
    'about.scheduleConsultation': 'Schedule Consultation',

    // About Page Content

    // Footer Services
    'footer.propertySearch': 'Property Search',
    'footer.investmentConsulting': 'Investment Consulting',
    'footer.marketAnalysis': 'Market Analysis',
    'footer.luxuryConcierge': 'Luxury Concierge',
    'footer.constructionRenovation': 'Construction & Renovation',
    'footer.marketingPresentation': 'Marketing & Presentation',
    'footer.phone': 'Phone:',
    'footer.email': 'Email:',
    'footer.address':
      'Carrer de Ametler 3 -1B, ES-07609 Son Veri Nou, Islas Baleares',
    'footer.followUs': 'Follow Us',
    'footer.companyDescription':
      'Your trusted partner in real estate services. We specialize in luxury properties and investment opportunities.',

    // Properties Page
    'properties.propertyType': 'Property Type',
    'properties.allTypes': 'All Types',
    'properties.luxuryHomes': 'Luxury Homes',
    'properties.investmentProperties': 'Investment Properties',
    'properties.commercialProperties': 'Commercial Properties',
    'properties.propertyDevelopment': 'Property Development',
    'properties.residential': 'Residential',
    'properties.status': 'Status',
    'properties.allStatus': 'All Status',
    'properties.forSale': 'For Sale',
    'properties.forLease': 'For Lease',
    'properties.sold': 'Sold',
    'properties.leased': 'Leased',
    'properties.preConstruction': 'Pre-Construction',
    'properties.location': 'Location',
    'properties.featured': 'Featured',
    'properties.allProperties': 'All Properties',
    'properties.featuredOnly': 'Featured Only',
    'properties.loadingProperties': 'Loading properties...',
    'properties.errorLoading': 'Error Loading Properties',
    'properties.viewAll': 'View All',
    'properties.bedrooms': 'Bedrooms',
    'properties.bathrooms': 'Bathrooms',
    'properties.squareMeters': 'm²',
    'properties.viewDetails': 'View Details',
    'properties.addToFavorites': 'Add to Favorites',
    'properties.removeFromFavorites': 'Remove from Favorites',
    'properties.previous': 'Previous',
    'properties.next': 'Next',
    'properties.noPropertiesFound':
      'No properties found matching your criteria.',
    'properties.tryAdjustingFilters':
      'Try adjusting your filters or search terms.',
    'properties.propertiesAvailable': 'properties available',

    // Services Page
    'services.propertySearch': 'Property Search',
    'services.propertySearchDesc':
      'Expert assistance in finding your dream property with personalized support for buying, selling, or renting.',
    'services.customPropertyMatching': 'Custom property matching',
    'services.marketAnalysisReports': 'Market analysis reports',
    'services.vacationPropertyBrokerage': 'Vacation property brokerage',
    'services.virtualPropertyTours': 'Virtual property tours',
    'services.investmentConsulting': 'Investment Consulting',
    'services.investmentConsultingDesc':
      'Strategic guidance for real estate investments with comprehensive market insights and risk assessment.',
    'services.portfolioAnalysis': 'Portfolio analysis',
    'services.riskAssessment': 'Risk assessment',
    'services.returnProjections': 'Return projections',
    'services.marketTrends': 'Market trends analysis',
    'services.marketAnalysis': 'Market Analysis',
    'services.marketAnalysisDesc':
      'In-depth market research and analysis to help you make informed real estate decisions.',
    'services.comparativeMarketAnalysis': 'Comparative market analysis',
    'services.priceTrends': 'Price trends',
    'services.neighborhoodInsights': 'Neighborhood insights',
    'services.investmentOpportunities': 'Investment opportunities',
    'services.luxuryConcierge': 'Luxury Concierge',
    'services.luxuryConciergeDesc':
      'Premium concierge services for property owners and investors with personalized attention.',
    'services.propertyManagement': 'Property management',
    'services.tenantScreening': 'Tenant screening',
    'services.maintenanceCoordination': 'Maintenance coordination',
    'services.financialReporting': 'Financial reporting',
    'services.constructionRenovation': 'Construction & Renovation',
    'services.constructionRenovationDesc':
      'Complete construction and renovation services from planning to execution with trusted contractors.',
    'services.projectPlanning': 'Project planning',
    'services.contractorManagement': 'Contractor management',
    'services.qualityControl': 'Quality control',
    'services.timelineManagement': 'Timeline management',
    'services.marketingPresentation': 'Marketing & Presentation',
    'services.marketingPresentationDesc':
      'Professional marketing and presentation services to showcase your property effectively.',
    'services.propertyPhotography': 'Property photography',
    'services.virtualStaging': 'Virtual staging',
    'services.marketingMaterials': 'Marketing materials',
    'services.onlineListings': 'Online listings',
    'services.investmentConsultingDesc2':
      'Strategic advice to maximize returns and minimize risks across your portfolio.',
    'services.roiAnalysis': 'ROI analysis',
    'services.marketTimingStrategies': 'Market timing strategies',
    'services.portfolioDiversification': 'Portfolio diversification',
    'services.taxOptimization': 'Tax optimization',
    'services.marketAnalysisDesc2':
      'In-depth research and trends to inform your real estate decisions.',
    'services.priceTrendAnalysis': 'Price trend analysis',
    'services.supplyDemandInsights': 'Supply & demand insights',
    'services.neighborhoodGrowth': 'Neighborhood growth',
    'services.futureProjections': 'Future projections',
    'services.luxuryConciergeDesc2':
      'Premium concierge services for high-end property owners and clients.',
    'services.personalizedService': 'Personalized service',
    'services.lifestyleManagement': 'Lifestyle management',
    'services.exclusiveAccess': 'Exclusive access',
    'services.constructionRenovationDesc2':
      'Complete construction and renovation services from planning to execution.',
    'services.projectManagement': 'Project management',
    'services.qualityAssurance': 'Quality assurance',
    'services.timelineCoordination': 'Timeline coordination',
    'services.marketingPresentationDesc2':
      'Professional marketing and presentation services to showcase your property.',
    'services.stagingServices': 'Staging services',
    'services.digitalMarketing': 'Digital marketing',
    'services.brandDevelopment': 'Brand development',
    'services.personalPropertyTours': 'Personal property tours',
    'services.support247': '24/7 support',
    'services.fullScaleRenovations': 'Full-scale renovations or minor repairs',
    'services.constructionProjectManagement': 'Construction project management',
    'services.supervisionConstructionPhases':
      'Supervision of all construction phases',
    'services.qualityControlFollowUp': 'Quality control and follow-up',
    'services.professionalHomePhotography': 'Professional home photography',
    'services.contemporaryHomeStaging': 'Contemporary home staging',
    'services.propertyMarketingSaleRental':
      'Property marketing for sale or rental',
    'services.readyToStart': 'Ready to Get Started?',
    'services.expertTeamReady':
      'Our team of experts is ready to provide the highest level of service and expertise. Have a different request? Feel free to contact us.',
    'services.scheduleConsultation': 'Schedule Consultation',
    'services.downloadBrochure': 'Download Brochure',
    'services.quickNavigation': 'Quick Navigation',

    // Contact Page
    'contact.sendMessage': 'Send us a Message',
    'contact.fillForm':
      "Fill out the form below and we'll get back to you within 24 hours.",
    'contact.messageSentSuccessfully': 'Message Sent Successfully!',
    'contact.thankYouContacting':
      "Thank you for contacting us. We'll get back to you soon.",
    'contact.submissionFailed': 'Submission Failed',
    'contact.errorSendingMessage':
      'There was an error sending your message. Please try again.',
    'contact.fullName': 'Full Name',
    'contact.enterFullName': 'Enter your full name',
    'contact.emailAddress': 'Email Address',
    'contact.enterEmail': 'Enter your email',
    'contact.phoneNumber': 'Phone Number',
    'contact.enterPhoneNumber': 'Enter your phone number',
    'contact.serviceInquiry': 'Service Inquiry',
    'contact.selectService': 'Select a service',
    'contact.message': 'Message',
    'contact.tellUsMore': 'Tell us more about your inquiry...',
    'contact.sending': 'Sending...',
    'contact.sendMessage': 'Send Message',
    'contact.contactInformation': 'Contact Information',
    'contact.reachOutChannels':
      "Reach out to us through any of these channels. We're always here to help.",
    'contact.getInTouch': 'Get In Touch',
    'contact.emailUs': 'Email Us',
    'contact.callUs': 'Call Us',
    'contact.visitUs': 'Visit Us',
    'contact.officeHours': 'Office Hours',
    'contact.monday': 'Monday',
    'contact.tuesday': 'Tuesday',
    'contact.wednesday': 'Wednesday',
    'contact.thursday': 'Thursday',
    'contact.friday': 'Friday',
    'contact.saturday': 'Saturday',
    'contact.sunday': 'Sunday',
    'contact.closed': 'Closed',
    'contact.am': 'AM',
    'contact.pm': 'PM',
    'contact.findUsOnMap': 'Find Us on the Map',
    'contact.officeDescription':
      'Our office in Son Verí Nou, with Palma de Mallorca Airport visible on the map.',
    'contact.propertyManagement': 'Property Management',
    'contact.propertyManagementDesc':
      'Comprehensive property management services',
    'contact.realEstateInvestment': 'Real Estate Investment',
    'contact.realEstateInvestmentDesc': 'Strategic investment opportunities',
    'contact.propertyDevelopment': 'Property Development',
    'contact.propertyDevelopmentDesc': 'Custom development solutions',
    'contact.consultingServices': 'Consulting Services',
    'contact.consultingServicesDesc': 'Expert real estate consulting',
    'contact.legalServices': 'Legal Services',
    'contact.legalServicesDesc': 'Real estate legal expertise',
    'contact.generalInquiry': 'General Inquiry',
    'contact.generalInquiryDesc': 'Other questions or information',

    // Language
    'language.english': 'English',
    'language.german': 'Deutsch',
    'language.spanish': 'Español',
    'language.select': 'Select Language',

    // Error messages
    'error.generic': 'Something went wrong. Please try again.',
    'error.network': 'Network error. Please check your connection.',
    'error.notFound': 'Page not found',
    'error.unauthorized': 'Unauthorized access',
    'error.forbidden': 'Access forbidden',
    'error.server': 'Server error. Please try again later.',

    // Success messages
    'success.saved': 'Changes saved successfully',
    'success.deleted': 'Item deleted successfully',
    'success.updated': 'Item updated successfully',
    'success.created': 'Item created successfully',

    // Validation
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email address',
    'validation.phone': 'Please enter a valid phone number',
    'validation.minLength': 'Must be at least {min} characters',
    'validation.maxLength': 'Must be no more than {max} characters',
    'validation.pattern': 'Please enter a valid format',
  },

  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.properties': 'Immobilien',
    'nav.services': 'Leistungen',
    'nav.contact': 'Kontakt',
    'nav.admin': 'Admin',
    'nav.login': 'Anmelden',
    'nav.logout': 'Abmelden',

    // Common UI
    'common.loading': 'Lädt...',
    'common.error': 'Fehler',
    'common.success': 'Erfolgreich',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.confirm': 'Bestätigen',
    'common.close': 'Schließen',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.previous': 'Vorherige',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
    'common.sort': 'Sortieren',
    'common.view': 'Anzeigen',
    'common.details': 'Details',
    'common.more': 'Mehr',
    'common.less': 'Weniger',
    'common.show': 'Anzeigen',
    'common.hide': 'Ausblenden',

    // Buttons
    'btn.submit': 'Absenden',
    'btn.reset': 'Zurücksetzen',
    'btn.clear': 'Löschen',
    'btn.upload': 'Hochladen',
    'btn.download': 'Herunterladen',
    'btn.export': 'Exportieren',
    'btn.import': 'Importieren',
    'btn.refresh': 'Aktualisieren',
    'btn.retry': 'Wiederholen',
    'btn.continue': 'Fortfahren',
    'btn.finish': 'Beenden',
    'btn.cancel': 'Abbrechen',
    'btn.yes': 'Ja',
    'btn.no': 'Nein',

    // Forms
    'form.name': 'Name',
    'form.email': 'E-Mail',
    'form.phone': 'Telefon',
    'form.message': 'Nachricht',
    'form.subject': 'Betreff',
    'form.password': 'Passwort',
    'form.confirmPassword': 'Passwort bestätigen',
    'form.required': 'Erforderlich',
    'form.optional': 'Optional',
    'form.invalid': 'Ungültig',
    'form.valid': 'Gültig',

    // Property related
    'property.title': 'Immobilie',
    'property.properties': 'Immobilien',
    'property.price': 'Preis',
    'property.location': 'Standort',
    'property.size': 'Größe',
    'property.bedrooms': 'Schlafzimmer',
    'property.bathrooms': 'Badezimmer',
    'property.type': 'Typ',
    'property.status': 'Status',
    'property.description': 'Beschreibung',
    'property.features': 'Ausstattung',
    'property.amenities': 'Annehmlichkeiten',
    'property.images': 'Bilder',
    'property.video': 'Video',
    'property.tour': 'Virtueller Rundgang',
    'property.contact': 'Makler kontaktieren',
    'property.inquire': 'Anfragen',
    'property.schedule': 'Besichtigung vereinbaren',
    'property.favorite': 'Zu Favoriten hinzufügen',
    'property.share': 'Teilen',

    // Property status
    'status.available': 'Verfügbar',
    'status.sold': 'Verkauft',
    'status.pending': 'Ausstehend',
    'status.rented': 'Vermietet',
    'status.offMarket': 'Nicht im Verkauf',

    // Property types
    'type.house': 'Haus',
    'type.apartment': 'Wohnung',
    'type.condo': 'Eigentumswohnung',
    'type.townhouse': 'Reihenhaus',
    'type.villa': 'Villa',
    'type.penthouse': 'Penthouse',
    'type.studio': 'Studio',
    'type.duplex': 'Duplex',
    'type.loft': 'Loft',

    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.properties': 'Immobilien',
    'admin.clients': 'Kunden',
    'admin.contacts': 'Kontakte',
    'admin.analytics': 'Analysen',
    'admin.settings': 'Einstellungen',
    'admin.add': 'Neu hinzufügen',
    'admin.edit': 'Bearbeiten',
    'admin.delete': 'Löschen',
    'admin.manage': 'Verwalten',
    'admin.overview': 'Übersicht',
    'admin.stats': 'Statistiken',
    'admin.reports': 'Berichte',

    // Contact
    'contact.title': 'Kontaktieren Sie uns',
    'contact.subtitle': 'Nehmen Sie Kontakt mit unserem Team auf',
    'contact.name': 'Ihr Name',
    'contact.email': 'E-Mail-Adresse',
    'contact.phone': 'Telefonnummer',
    'contact.message': 'Ihre Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.sent': 'Nachricht erfolgreich gesendet!',
    'contact.error':
      'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',

    // Footer
    'footer.copyright': '© 2024 Palmside Real Estate. Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.siteNotice': 'Impressum',

    // Hero Section
    'hero.welcome': 'Willkommen bei Palmside',
    'hero.subtitle': 'Ihr vertrauensvoller Partner im Immobilienwesen',
    'hero.description':
      'Entdecken Sie den perfekten Ort, den Sie Ihr Zuhause nennen können, auf Mallorca mit uns an Ihrer Seite.',
    'hero.exploreProperties': 'Immobilien erkunden',
    'hero.learnMore': 'Mehr erfahren',
    'hero.startJourney': 'Beginnen Sie Ihre Reise',
    'hero.beginAdventure': 'Beginnen Sie Ihr Abenteuer mit Stil',
    'hero.journeyDescription':
      'Ihre Reise beginnt mit Komfort und Eleganz von dem ersten Schritt an.',
    'hero.seamlessTransfer': 'Nahtloser Transfer',
    'hero.runwayToRelaxation': 'Von der Landebahn zur Entspannung',
    'hero.transferDescription':
      'Ihr nächstes Kapitel beginnt reibungslos und geht mühelos zum Ziel über, das Sie erwartet.',
    'hero.endlessCoastlines': 'Endlose Küstenlinien',
    'hero.mediterraneanSea': 'Entspannen Sie am Mittelmeer',
    'hero.coastlineDescription':
      'Genießen Sie die Sonne und das türkisfarbene Wasser.',
    'hero.historicElegance': 'Historische Eleganz',
    'hero.timelessBeauty': 'Entdecken Sie die zeitlose Schönheit Mallorcas',
    'hero.eleganceDescription':
      'Tauchen Sie ein in Kultur und architektonische Pracht.',
    'hero.sunsetDrinks': 'Sonnenuntergang & Getränke',
    'hero.perfectView': 'Entspannen Sie mit einer perfekten Aussicht',
    'hero.drinksDescription':
      'Genießen Sie unvergessliche Abende mit lebendigen Sonnenuntergängen und Getränken.',
    'hero.dreamHome': 'Entdecken Sie Ihr Traumhaus',
    'hero.luxuryProperties': 'Luxusimmobilien in erstklassigen Lagen',
    'hero.homeDescription':
      'Erleben Sie die perfekte Mischung aus Komfort und Eleganz.',
    'hero.diveRelaxation': 'Tauchen Sie in die Entspannung ein',
    'hero.ownPool': 'Luxusleben mit Ihrem eigenen Pool',
    'hero.poolDescription':
      'Erfrischen Sie sich stilvoll mit exklusiven Poolside-Momenten.',
    'hero.terracePool': 'Terrasse mit Pool',
    'hero.outdoorLiving': 'Genießen Sie das Leben im Freien',
    'hero.terraceDescription':
      'Eine perfekte Mischung aus Komfort, Stil und Sonnenschein.',
    'hero.modernDining': 'Moderne Essbereiche',
    'hero.brightfulRooms': 'Moderne helle Räume',
    'hero.diningDescription':
      'Genießen Sie exquisite Mahlzeiten in einem modernen Ambiente.',
    'hero.stylishLiving': 'Stilvolles Wohnzimmer',
    'hero.elegantInteriors': 'Elegante Innenräume für entspanntes Wohnen',
    'hero.livingDescription': 'Komfort und Luxus in perfekter Harmonie.',
    'hero.luxuryBedroom': 'Luxusschlafzimmer',
    'hero.restInStyle': 'Ruhen Sie stilvoll und komfortabel',
    'hero.bedroomDescription': 'Ein Refugium für Entspannung und Ruhe.',
    'hero.modernKitchen': 'Moderne Küche',
    'hero.wellEquipped':
      'Genießen Sie das Kochen in modernen, gut ausgestatteten Küchen',
    'hero.kitchenDescription':
      'Eine Küche für Einfachheit, Stil und den Alltag.',
    'hero.stylishInterior': 'Stilvolles Interieur',
    'hero.innovativeDesigns': 'Innovative Designs für modernes Wohnen',
    'hero.interiorDescription':
      'Einzigartige Innenräume, die Schönheit und Funktion verbinden.',
    'hero.saunaWellness': 'Sauna & Wellness',
    'hero.relaxBodyMind': 'Entspannen Sie Körper und Geist',
    'hero.wellnessDescription':
      'Das ultimative Wellness-Erlebnis in Ihrem privaten Rückzugsort.',
    'hero.wellness': 'Wellness',
    'hero.rejuvenateIndoors': 'Erholen Sie sich drinnen',
    'hero.wellnessIndoorsDescription':
      'Luxus-Spa und Wellness in Ihren Händen.',

    // Page Banners
    'banner.about': 'Über Palmside Mallorca',
    'banner.aboutSubtitle':
      'Lokale Expertise, mehrsprachige Beratung und Rundum-Support auf Mallorca.',
    'banner.properties': 'Entdecken Sie Ihre Traumimmobilie',
    'banner.propertiesSubtitle':
      'Erkunden Sie unsere kuratierte Sammlung von Premium-Immobilien auf Mallorca und darüber hinaus.',
    'banner.services': 'Unsere Dienstleistungen',
    'banner.servicesSubtitle':
      'Wir bieten umfassende Immobiliendienstleistungen mit maßgeschneiderten Immobilienlösungen und persönlicher Unterstützung, die das Leben auf Mallorca reibungslos und sorgenfrei machen.',
    'banner.contact': 'Kontakt aufnehmen',
    'banner.contactSubtitle':
      'Bereit, Ihre Immobilienreise zu beginnen? Wir helfen Ihnen dabei, Ihre perfekte Immobilie zu finden.',

    // About Page
    'about.ourStory': 'Unsere Geschichte',
    'about.story1':
      'Wir sind drei Immobilienprofis, vereint durch unsere Liebe zu Mallorca und jahrelange Erfahrung im Immobilienmarkt der Insel.',
    'about.story2':
      'Nach Jahren der Hilfe für Menschen bei der Navigation im Immobilienmarkt der Insel gründeten wir Palmside Mallorca, um unsere professionelle Expertise mit unserer echten Liebe zu diesem unglaublichen Ort zu verbinden.',
    'about.story3':
      'Von Ihrem ersten Besuch auf der Insel an sind wir hier, um Sie durch das Finden, Kaufen und wirklich Genießen Ihres perfekten Zuhauses auf Mallorca zu führen. Wir wissen, dass der Prozess überwältigend sein kann, wenn Sie es mit einem ausländischen Markt, verschiedenen Rechtssystemen und Sprachbarrieren zu tun haben – genau deshalb sind wir hier.',
    'about.story4':
      'Zwischen uns dreien sprechen wir Englisch, Deutsch, Spanisch und Französisch, sodass Sie sich bei Besichtigungen, Verhandlungen oder Papierkram nie in der Übersetzung verloren fühlen werden. Ob Sie nach Ihrem Traumhaus suchen, die Komplexität des spanischen Immobilienrechts navigieren, eine bestehende Investition verwalten oder eine Renovierung planen – wir kümmern uns um jedes Detail vom Rechtslabyrinth bis zur Hilfe bei der Suche nach der besten lokalen Immobilie.',
    'about.languagesSupport': 'Sprachen & Support',
    'about.english': 'Englisch',
    'about.german': 'Deutsch',
    'about.spanish': 'Spanisch',
    'about.french': 'Französisch',
    'about.howWeHelp': 'Wie wir helfen',
    'about.homeSearch': 'Haussuche & Besichtigungen',
    'about.negotiations': 'Verhandlungen & Angebote',
    'about.legalCoordination': 'Rechtliche & Notar-Koordination',
    'about.dueDiligence': 'Due Diligence & Bewertung',
    'about.renovationPlanning': 'Renovierungsplanung',
    'about.propertyManagement': 'Immobilienverwaltung',
    'about.ourMission': 'Unsere Mission',
    'about.missionText':
      'Unsere Kunden mit innovativen Immobilienlösungen zu befähigen, die Renditen maximieren, Risiken minimieren und dauerhaften Wert schaffen. Wir streben danach, der vertrauenswürdigste Partner in jeder Immobilienreise unserer Kunden zu sein.',
    'about.ourVision': 'Unsere Vision',
    'about.visionText':
      'Das führende Immobilienunternehmen in Südflorida zu sein, anerkannt für unsere Innovation, Integrität und außergewöhnliche Kundenergebnisse. Wir stellen uns eine Zukunft vor, in der Immobilieninvestitionen für jeden zugänglich, profitabel und lohnend sind.',
    'about.readyToWork': 'Bereit, mit uns zu arbeiten?',
    'about.readyText':
      'Schließen Sie sich Hunderten von zufriedenen Kunden an, die uns mit ihren Immobilieninvestitionen vertrauen.',
    'about.scheduleConsultation': 'Beratung vereinbaren',

    // About Page Content
    'about.ourStory': 'Unsere Geschichte',
    'about.story1':
      'Wir sind drei Immobilienprofis, vereint durch unsere Liebe zu Mallorca und jahrelange Erfahrung im Immobilienmarkt der Insel.',
    'about.story2':
      'Nach Jahren der Hilfe für Menschen bei der Navigation im Immobilienmarkt der Insel gründeten wir Palmside Mallorca, um unsere professionelle Expertise mit unserer echten Liebe zu diesem unglaublichen Ort zu verbinden.',
    'about.story3':
      'Von Ihrem ersten Besuch auf der Insel an sind wir hier, um Sie durch das Finden, Kaufen und wirklich Genießen Ihres perfekten Zuhauses auf Mallorca zu führen. Wir wissen, dass der Prozess überwältigend sein kann, wenn Sie es mit einem ausländischen Markt, verschiedenen Rechtssystemen und Sprachbarrieren zu tun haben – genau deshalb sind wir hier.',
    'about.story4':
      'Zwischen uns dreien sprechen wir Englisch, Deutsch, Spanisch und Französisch, sodass Sie sich bei Besichtigungen, Verhandlungen oder Papierkram nie in der Übersetzung verloren fühlen werden. Ob Sie nach Ihrem Traumhaus suchen, die Komplexität des spanischen Immobilienrechts navigieren, eine bestehende Investition verwalten oder eine Renovierung planen – wir kümmern uns um jedes Detail vom Rechtslabyrinth bis zur Hilfe bei der Suche nach der besten lokalen Immobilie.',
    'about.languagesSupport': 'Sprachen & Support',
    'about.english': 'Englisch',
    'about.german': 'Deutsch',
    'about.spanish': 'Spanisch',
    'about.french': 'Französisch',
    'about.howWeHelp': 'Wie wir helfen',
    'about.homeSearch': 'Haussuche & Besichtigungen',
    'about.negotiations': 'Verhandlungen & Angebote',
    'about.legalCoordination': 'Rechtliche & Notar-Koordination',
    'about.dueDiligence': 'Due Diligence & Bewertung',
    'about.renovationPlanning': 'Renovierungsplanung',
    'about.propertyManagement': 'Immobilienverwaltung',
    'about.ourMission': 'Unsere Mission',
    'about.missionText':
      'Unsere Kunden mit innovativen Immobilienlösungen zu befähigen, die Renditen maximieren, Risiken minimieren und dauerhaften Wert schaffen. Wir streben danach, der vertrauenswürdigste Partner in jeder Immobilienreise unserer Kunden zu sein.',
    'about.ourVision': 'Unsere Vision',
    'about.visionText':
      'Das führende Immobilienunternehmen in Südflorida zu sein, anerkannt für unsere Innovation, Integrität und außergewöhnliche Kundenergebnisse. Wir stellen uns eine Zukunft vor, in der Immobilieninvestitionen für jeden zugänglich, profitabel und lohnend sind.',
    'about.readyToWork': 'Bereit, mit uns zu arbeiten?',
    'about.readyText':
      'Schließen Sie sich Hunderten von zufriedenen Kunden an, die uns mit ihren Immobilieninvestitionen vertrauen.',
    'about.scheduleConsultation': 'Beratung vereinbaren',

    // Footer Services
    'footer.propertySearch': 'Immobiliensuche',
    'footer.investmentConsulting': 'Investmentberatung',
    'footer.marketAnalysis': 'Marktanalyse',
    'footer.luxuryConcierge': 'Luxus-Concierge',
    'footer.constructionRenovation': 'Bau & Renovierung',
    'footer.marketingPresentation': 'Marketing & Präsentation',
    'footer.phone': 'Telefon:',
    'footer.email': 'E-Mail:',
    'footer.address':
      'Carrer de Ametler 3 -1B, ES-07609 Son Veri Nou, Islas Baleares',
    'footer.followUs': 'Folgen Sie uns',
    'footer.companyDescription':
      'Ihr vertrauensvoller Partner für Immobiliendienstleistungen. Wir spezialisieren uns auf Luxusimmobilien und Investitionsmöglichkeiten.',

    // Properties Page
    'properties.propertyType': 'Immobilientyp',
    'properties.allTypes': 'Alle Typen',
    'properties.luxuryHomes': 'Luxusimmobilien',
    'properties.investmentProperties': 'Investmentimmobilien',
    'properties.commercialProperties': 'Gewerbeimmobilien',
    'properties.propertyDevelopment': 'Immobilienentwicklung',
    'properties.residential': 'Wohnimmobilien',
    'properties.status': 'Status',
    'properties.allStatus': 'Alle Status',
    'properties.forSale': 'Zu verkaufen',
    'properties.forLease': 'Zu vermieten',
    'properties.sold': 'Verkauft',
    'properties.leased': 'Vermietet',
    'properties.preConstruction': 'Vor Bau',
    'properties.location': 'Standort',
    'properties.featured': 'Empfohlen',
    'properties.allProperties': 'Alle Immobilien',
    'properties.featuredOnly': 'Nur Empfohlene',
    'properties.loadingProperties': 'Immobilien werden geladen...',
    'properties.errorLoading': 'Fehler beim Laden der Immobilien',
    'properties.viewAll': 'Alle anzeigen',
    'properties.bedrooms': 'Schlafzimmer',
    'properties.bathrooms': 'Badezimmer',
    'properties.squareMeters': 'm²',
    'properties.viewDetails': 'Details anzeigen',
    'properties.addToFavorites': 'Zu Favoriten hinzufügen',
    'properties.removeFromFavorites': 'Aus Favoriten entfernen',
    'properties.previous': 'Vorherige',
    'properties.next': 'Nächste',
    'properties.noPropertiesFound':
      'Keine Immobilien gefunden, die Ihren Kriterien entsprechen.',
    'properties.tryAdjustingFilters':
      'Versuchen Sie, Ihre Filter oder Suchbegriffe anzupassen.',
    'properties.propertiesAvailable': 'Immobilien verfügbar',

    // Services Page
    'services.propertySearch': 'Immobiliensuche',
    'services.propertySearchDesc':
      'Expertenhilfe bei der Suche nach Ihrer Traumimmobilie mit persönlicher Unterstützung beim Kaufen, Verkaufen oder Mieten.',
    'services.customPropertyMatching': 'Maßgeschneiderte Immobilienvermittlung',
    'services.marketAnalysisReports': 'Marktanalyseberichte',
    'services.vacationPropertyBrokerage': 'Ferienimmobilienvermittlung',
    'services.virtualPropertyTours': 'Virtuelle Immobilienbesichtigungen',
    'services.investmentConsulting': 'Investmentberatung',
    'services.investmentConsultingDesc':
      'Strategische Beratung für Immobilieninvestitionen mit umfassenden Markteinblicken und Risikobewertung.',
    'services.portfolioAnalysis': 'Portfolioanalyse',
    'services.riskAssessment': 'Risikobewertung',
    'services.returnProjections': 'Renditeprognosen',
    'services.marketTrends': 'Markttrendanalyse',
    'services.marketAnalysis': 'Marktanalyse',
    'services.marketAnalysisDesc':
      'Tiefgreifende Marktforschung und -analyse, um fundierte Immobilienentscheidungen zu treffen.',
    'services.comparativeMarketAnalysis': 'Vergleichende Marktanalyse',
    'services.priceTrends': 'Preistrends',
    'services.neighborhoodInsights': 'Nachbarschaftseinblicke',
    'services.investmentOpportunities': 'Investitionsmöglichkeiten',
    'services.luxuryConcierge': 'Luxus-Concierge',
    'services.luxuryConciergeDesc':
      'Premium-Concierge-Services für Immobilienbesitzer und Investoren mit persönlicher Betreuung.',
    'services.propertyManagement': 'Immobilienverwaltung',
    'services.tenantScreening': 'Mieterauswahl',
    'services.maintenanceCoordination': 'Wartungskoordination',
    'services.financialReporting': 'Finanzberichterstattung',
    'services.constructionRenovation': 'Bau & Renovierung',
    'services.constructionRenovationDesc':
      'Komplette Bau- und Renovierungsdienstleistungen von der Planung bis zur Ausführung mit vertrauenswürdigen Auftragnehmern.',
    'services.projectPlanning': 'Projektplanung',
    'services.contractorManagement': 'Auftragnehmerverwaltung',
    'services.qualityControl': 'Qualitätskontrolle',
    'services.timelineManagement': 'Zeitplanmanagement',
    'services.marketingPresentation': 'Marketing & Präsentation',
    'services.marketingPresentationDesc':
      'Professionelle Marketing- und Präsentationsdienstleistungen, um Ihre Immobilie effektiv zu präsentieren.',
    'services.propertyPhotography': 'Immobilienfotografie',
    'services.virtualStaging': 'Virtuelles Staging',
    'services.marketingMaterials': 'Marketingmaterialien',
    'services.onlineListings': 'Online-Anzeigen',
    'services.investmentConsultingDesc2':
      'Strategische Beratung zur Maximierung der Renditen und Minimierung der Risiken in Ihrem Portfolio.',
    'services.roiAnalysis': 'ROI-Analyse',
    'services.marketTimingStrategies': 'Markt-Timing-Strategien',
    'services.portfolioDiversification': 'Portfolio-Diversifikation',
    'services.taxOptimization': 'Steueroptimierung',
    'services.marketAnalysisDesc2':
      'Tiefgreifende Forschung und Trends zur Information Ihrer Immobilienentscheidungen.',
    'services.priceTrendAnalysis': 'Preistrend-Analyse',
    'services.supplyDemandInsights': 'Angebots- und Nachfrage-Einblicke',
    'services.neighborhoodGrowth': 'Nachbarschaftswachstum',
    'services.futureProjections': 'Zukunftsprognosen',
    'services.luxuryConciergeDesc2':
      'Premium-Concierge-Services für hochwertige Immobilienbesitzer und Kunden.',
    'services.personalizedService': 'Personalisierter Service',
    'services.lifestyleManagement': 'Lifestyle-Management',
    'services.exclusiveAccess': 'Exklusiver Zugang',
    'services.constructionRenovationDesc2':
      'Komplette Bau- und Renovierungsdienstleistungen von der Planung bis zur Ausführung.',
    'services.projectManagement': 'Projektmanagement',
    'services.qualityAssurance': 'Qualitätssicherung',
    'services.timelineCoordination': 'Zeitplankoordination',
    'services.marketingPresentationDesc2':
      'Professionelle Marketing- und Präsentationsdienstleistungen zur Präsentation Ihrer Immobilie.',
    'services.stagingServices': 'Staging-Services',
    'services.digitalMarketing': 'Digitales Marketing',
    'services.brandDevelopment': 'Markenentwicklung',
    'services.personalPropertyTours': 'Persönliche Immobilienbesichtigungen',
    'services.support247': '24/7 Support',
    'services.fullScaleRenovations':
      'Vollständige Renovierungen oder kleinere Reparaturen',
    'services.constructionProjectManagement': 'Bauprojektmanagement',
    'services.supervisionConstructionPhases': 'Überwachung aller Bauphasen',
    'services.qualityControlFollowUp': 'Qualitätskontrolle und Nachverfolgung',
    'services.professionalHomePhotography':
      'Professionelle Immobilienfotografie',
    'services.contemporaryHomeStaging': 'Zeitgemäßes Home Staging',
    'services.propertyMarketingSaleRental':
      'Immobilienmarketing für Verkauf oder Vermietung',
    'services.readyToStart': 'Bereit anzufangen?',
    'services.expertTeamReady':
      'Unser Expertenteam ist bereit, höchste Service- und Fachkompetenz zu bieten. Haben Sie eine andere Anfrage? Zögern Sie nicht, uns zu kontaktieren.',
    'services.scheduleConsultation': 'Beratung vereinbaren',
    'services.downloadBrochure': 'Broschüre herunterladen',
    'services.quickNavigation': 'Schnellnavigation',

    // Language
    'language.english': 'Englisch',
    'language.german': 'Deutsch',
    'language.spanish': 'Spanisch',
    'language.select': 'Sprache auswählen',

    // Error messages
    'error.generic':
      'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
    'error.network': 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.',
    'error.notFound': 'Seite nicht gefunden',
    'error.unauthorized': 'Unbefugter Zugriff',
    'error.forbidden': 'Zugriff verweigert',
    'error.server': 'Serverfehler. Bitte versuchen Sie es später erneut.',

    // Success messages
    'success.saved': 'Änderungen erfolgreich gespeichert',
    'success.deleted': 'Element erfolgreich gelöscht',
    'success.updated': 'Element erfolgreich aktualisiert',
    'success.created': 'Element erfolgreich erstellt',

    // Contact Page
    'contact.sendMessage': 'Schicken Sie uns eine Nachricht',
    'contact.fillForm':
      'Füllen Sie das untenstehende Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    'contact.messageSentSuccessfully': 'Nachricht erfolgreich gesendet!',
    'contact.thankYouContacting':
      'Vielen Dank für Ihre Kontaktaufnahme. Wir melden uns bald bei Ihnen.',
    'contact.submissionFailed': 'Übermittlung fehlgeschlagen',
    'contact.errorSendingMessage':
      'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    'contact.fullName': 'Vollständiger Name',
    'contact.enterFullName': 'Geben Sie Ihren vollständigen Namen ein',
    'contact.emailAddress': 'E-Mail-Adresse',
    'contact.enterEmail': 'Geben Sie Ihre E-Mail ein',
    'contact.phoneNumber': 'Telefonnummer',
    'contact.enterPhoneNumber': 'Geben Sie Ihre Telefonnummer ein',
    'contact.serviceInquiry': 'Service-Anfrage',
    'contact.selectService': 'Wählen Sie einen Service aus',
    'contact.message': 'Nachricht',
    'contact.tellUsMore': 'Erzählen Sie uns mehr über Ihre Anfrage...',
    'contact.sending': 'Wird gesendet...',
    'contact.contactInformation': 'Kontaktinformationen',
    'contact.reachOutChannels':
      'Kontaktieren Sie uns über einen dieser Kanäle. Wir sind immer da, um zu helfen.',
    'contact.getInTouch': 'Kontakt aufnehmen',
    'contact.emailUs': 'E-Mail senden',
    'contact.callUs': 'Anrufen',
    'contact.visitUs': 'Besuchen Sie uns',
    'contact.officeHours': 'Öffnungszeiten',
    'contact.monday': 'Montag',
    'contact.tuesday': 'Dienstag',
    'contact.wednesday': 'Mittwoch',
    'contact.thursday': 'Donnerstag',
    'contact.friday': 'Freitag',
    'contact.saturday': 'Samstag',
    'contact.sunday': 'Sonntag',
    'contact.closed': 'Geschlossen',
    'contact.am': 'AM',
    'contact.pm': 'PM',
    'contact.findUsOnMap': 'Finde uns auf der Karte',
    'contact.officeDescription':
      'Unser Büro in Son Verí Nou, mit dem Flughafen Palma de Mallorca auf der Karte sichtbar.',
    'contact.propertyManagement': 'Immobilienverwaltung',
    'contact.propertyManagementDesc':
      'Umfassende Immobilienverwaltungsdienstleistungen',
    'contact.realEstateInvestment': 'Immobilieninvestition',
    'contact.realEstateInvestmentDesc':
      'Strategische Investitionsmöglichkeiten',
    'contact.propertyDevelopment': 'Immobilienentwicklung',
    'contact.propertyDevelopmentDesc': 'Maßgeschneiderte Entwicklungslösungen',
    'contact.consultingServices': 'Beratungsdienstleistungen',
    'contact.consultingServicesDesc': 'Expertenberatung für Immobilien',
    'contact.legalServices': 'Rechtsdienstleistungen',
    'contact.legalServicesDesc': 'Rechtliche Expertise für Immobilien',
    'contact.generalInquiry': 'Allgemeine Anfrage',
    'contact.generalInquiryDesc': 'Andere Fragen oder Informationen',

    // Language
    'language.english': 'English',
    'language.german': 'Deutsch',
    'language.spanish': 'Español',
    'language.select': 'Sprache auswählen',

    // Error messages
    'error.generic':
      'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
    'error.network': 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.',
    'error.notFound': 'Seite nicht gefunden',
    'error.unauthorized': 'Unbefugter Zugriff',
    'error.forbidden': 'Zugriff verweigert',
    'error.server': 'Serverfehler. Bitte versuchen Sie es später erneut.',

    // Success messages
    'success.saved': 'Änderungen erfolgreich gespeichert',
    'success.deleted': 'Element erfolgreich gelöscht',
    'success.updated': 'Element erfolgreich aktualisiert',
    'success.created': 'Element erfolgreich erstellt',

    // Validation
    'validation.required': 'Dieses Feld ist erforderlich',
    'validation.email': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    'validation.phone': 'Bitte geben Sie eine gültige Telefonnummer ein',
    'validation.minLength': 'Muss mindestens {min} Zeichen haben',
    'validation.maxLength': 'Darf nicht mehr als {max} Zeichen haben',
    'validation.pattern': 'Bitte geben Sie ein gültiges Format ein',
  },

  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.properties': 'Propiedades',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.admin': 'Admin',
    'nav.login': 'Iniciar sesión',
    'nav.logout': 'Cerrar sesión',

    // Common UI
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.confirm': 'Confirmar',
    'common.close': 'Cerrar',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.view': 'Ver',
    'common.details': 'Detalles',
    'common.more': 'Más',
    'common.less': 'Menos',
    'common.show': 'Mostrar',
    'common.hide': 'Ocultar',

    // Buttons
    'btn.submit': 'Enviar',
    'btn.reset': 'Restablecer',
    'btn.clear': 'Limpiar',
    'btn.upload': 'Subir',
    'btn.download': 'Descargar',
    'btn.export': 'Exportar',
    'btn.import': 'Importar',
    'btn.refresh': 'Actualizar',
    'btn.retry': 'Reintentar',
    'btn.continue': 'Continuar',
    'btn.finish': 'Finalizar',
    'btn.cancel': 'Cancelar',
    'btn.yes': 'Sí',
    'btn.no': 'No',

    // Forms
    'form.name': 'Nombre',
    'form.email': 'Correo electrónico',
    'form.phone': 'Teléfono',
    'form.message': 'Mensaje',
    'form.subject': 'Asunto',
    'form.password': 'Contraseña',
    'form.confirmPassword': 'Confirmar contraseña',
    'form.required': 'Requerido',
    'form.optional': 'Opcional',
    'form.invalid': 'Inválido',
    'form.valid': 'Válido',

    // Property related
    'property.title': 'Propiedad',
    'property.properties': 'Propiedades',
    'property.price': 'Precio',
    'property.location': 'Ubicación',
    'property.size': 'Tamaño',
    'property.bedrooms': 'Dormitorios',
    'property.bathrooms': 'Baños',
    'property.type': 'Tipo',
    'property.status': 'Estado',
    'property.description': 'Descripción',
    'property.features': 'Características',
    'property.amenities': 'Comodidades',
    'property.images': 'Imágenes',
    'property.video': 'Video',
    'property.tour': 'Tour virtual',
    'property.contact': 'Contactar agente',
    'property.inquire': 'Consultar',
    'property.schedule': 'Programar visita',
    'property.favorite': 'Agregar a favoritos',
    'property.share': 'Compartir',

    // Property status
    'status.available': 'Disponible',
    'status.sold': 'Vendido',
    'status.pending': 'Pendiente',
    'status.rented': 'Arrendado',
    'status.offMarket': 'Fuera del mercado',

    // Property types
    'type.house': 'Casa',
    'type.apartment': 'Apartamento',
    'type.condo': 'Condominio',
    'type.townhouse': 'Casa adosada',
    'type.villa': 'Villa',
    'type.penthouse': 'Ático',
    'type.studio': 'Estudio',
    'type.duplex': 'Dúplex',
    'type.loft': 'Loft',

    // Admin
    'admin.dashboard': 'Panel de control',
    'admin.properties': 'Propiedades',
    'admin.clients': 'Clientes',
    'admin.contacts': 'Contactos',
    'admin.analytics': 'Análisis',
    'admin.settings': 'Configuración',
    'admin.add': 'Agregar nuevo',
    'admin.edit': 'Editar',
    'admin.delete': 'Eliminar',
    'admin.manage': 'Gestionar',
    'admin.overview': 'Resumen',
    'admin.stats': 'Estadísticas',
    'admin.reports': 'Informes',

    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Ponte en contacto con nuestro equipo',
    'contact.name': 'Tu nombre',
    'contact.email': 'Dirección de correo electrónico',
    'contact.phone': 'Número de teléfono',
    'contact.message': 'Tu mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.sent': '¡Mensaje enviado con éxito!',
    'contact.error':
      'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.',

    // Footer
    'footer.copyright':
      '© 2024 Palmside Real Estate. Todos los derechos reservados.',
    'footer.privacy': 'Política de privacidad',
    'footer.terms': 'Términos de servicio',
    'footer.siteNotice': 'Aviso legal',

    // Hero Section
    'hero.welcome': 'Bienvenido a Palmside',
    'hero.subtitle': 'Su socio de confianza en bienes raíces',
    'hero.description':
      'Descubra el lugar perfecto para llamar hogar en Mallorca con nosotros a su lado.',
    'hero.exploreProperties': 'Explorar Propiedades',
    'hero.learnMore': 'Saber Más',
    'hero.startJourney': 'Comience su viaje',
    'hero.beginAdventure': 'Comience su aventura con estilo',
    'hero.journeyDescription':
      'Su viaje comienza con comodidad y elegancia desde el primer paso.',
    'hero.seamlessTransfer': 'Transferencia sin problemas',
    'hero.runwayToRelaxation': 'De la pista a la relajación',
    'hero.transferDescription':
      'Su próximo capítulo comienza suavemente, pasando sin esfuerzo al destino que le espera.',
    'hero.endlessCoastlines': 'Costas infinitas',
    'hero.mediterraneanSea': 'Relájese junto al mar Mediterráneo',
    'hero.coastlineDescription': 'Disfrute del sol y las aguas turquesas.',
    'hero.historicElegance': 'Elegancia histórica',
    'hero.timelessBeauty': 'Descubra la belleza atemporal de Mallorca',
    'hero.eleganceDescription':
      'Sumérjase en la cultura y el esplendor arquitectónico.',
    'hero.sunsetDrinks': 'Atardecer y Bebidas',
    'hero.perfectView': 'Relájese con una vista perfecta',
    'hero.drinksDescription':
      'Disfrute de veladas inolvidables con atardeceres vibrantes y bebidas.',
    'hero.dreamHome': 'Descubra su hogar soñado',
    'hero.luxuryProperties': 'Propiedades de lujo en ubicaciones privilegiadas',
    'hero.homeDescription':
      'Experimente la mezcla perfecta de comodidad y elegancia.',
    'hero.diveRelaxation': 'Sumérjase en la relajación',
    'hero.ownPool': 'Vida de lujo con su propia piscina',
    'hero.poolDescription':
      'Refrésquese con estilo con momentos exclusivos junto a la piscina.',
    'hero.terracePool': 'Terraza con piscina',
    'hero.outdoorLiving': 'Disfrute de la vida al aire libre',
    'hero.terraceDescription':
      'Una mezcla perfecta de comodidad, estilo y sol.',
    'hero.modernDining': 'Espacios de comedor modernos',
    'hero.brightfulRooms': 'Habitaciones modernas y luminosas',
    'hero.diningDescription':
      'Saboree comidas exquisitas en un ambiente moderno.',
    'hero.stylishLiving': 'Sala de estar elegante',
    'hero.elegantInteriors': 'Interiores elegantes para vivir relajado',
    'hero.livingDescription': 'Comodidad y lujo en perfecta armonía.',
    'hero.luxuryBedroom': 'Dormitorio de lujo',
    'hero.restInStyle': 'Descanse con estilo y comodidad',
    'hero.bedroomDescription':
      'Un santuario diseñado para la relajación y la tranquilidad.',
    'hero.modernKitchen': 'Cocina moderna',
    'hero.wellEquipped':
      'Disfrute cocinando en cocinas modernas y bien equipadas',
    'hero.kitchenDescription':
      'Una cocina diseñada para facilidad, estilo y vida cotidiana.',
    'hero.stylishInterior': 'Interior elegante',
    'hero.innovativeDesigns': 'Diseños innovadores para vivir moderno',
    'hero.interiorDescription':
      'Interiores únicos que combinan belleza y función.',
    'hero.saunaWellness': 'Sauna y Bienestar',
    'hero.relaxBodyMind': 'Relaje su cuerpo y mente',
    'hero.wellnessDescription':
      'La experiencia de bienestar definitiva en su retiro privado.',
    'hero.wellness': 'Bienestar',
    'hero.rejuvenateIndoors': 'Rejuvenezca en interiores',
    'hero.wellnessIndoorsDescription': 'Spa de lujo y bienestar a su alcance.',

    // Page Banners
    'banner.about': 'Acerca de Palmside Mallorca',
    'banner.aboutSubtitle':
      'Experiencia local, orientación multilingüe y soporte integral en Mallorca.',
    'banner.properties': 'Descubra su propiedad soñada',
    'banner.propertiesSubtitle':
      'Explore nuestra colección curada de propiedades premium en Mallorca y más allá.',
    'banner.services': 'Nuestros Servicios',
    'banner.servicesSubtitle':
      'Ofrecemos servicios inmobiliarios integrales con soluciones de propiedades personalizadas y soporte personalizado, haciendo la vida en Mallorca fluida y sin preocupaciones.',
    'banner.contact': 'Póngase en Contacto',
    'banner.contactSubtitle':
      '¿Listo para comenzar su viaje inmobiliario? Estamos aquí para ayudarle a encontrar su propiedad perfecta.',

    // About Page
    'about.ourStory': 'Nuestra Historia',
    'about.story1':
      'Somos tres profesionales inmobiliarios unidos por nuestro amor por Mallorca y años de experiencia en el mercado inmobiliario de la isla.',
    'about.story2':
      'Después de años ayudando a las personas a navegar el mercado inmobiliario de la isla, fundamos Palmside Mallorca para combinar nuestra experiencia profesional con nuestro genuino amor por este lugar increíble.',
    'about.story3':
      'Desde su primera visita a la isla, estamos aquí para guiarle a través de encontrar, comprar y realmente disfrutar de su hogar perfecto en Mallorca. Sabemos que el proceso puede sentirse abrumador cuando se trata de un mercado extranjero, diferentes sistemas legales y barreras de idioma – exactamente por eso estamos aquí.',
    'about.story4':
      'Entre los tres, hablamos inglés, alemán, español y francés, por lo que nunca se sentirá perdido en la traducción durante visitas, negociaciones o papeleo. Ya sea que esté buscando su hogar soñado, navegando las complejidades de la ley de propiedad española, administrando una inversión existente o planificando una renovación, manejamos cada detalle desde el laberinto legal hasta ayudarle a encontrar la mejor propiedad local.',
    'about.languagesSupport': 'Idiomas y Soporte',
    'about.english': 'Inglés',
    'about.german': 'Alemán',
    'about.spanish': 'Español',
    'about.french': 'Francés',
    'about.howWeHelp': 'Cómo Ayudamos',
    'about.homeSearch': 'Búsqueda de hogar y visitas',
    'about.negotiations': 'Negociaciones y ofertas',
    'about.legalCoordination': 'Coordinación legal y notarial',
    'about.dueDiligence': 'Debida diligencia y valoración',
    'about.renovationPlanning': 'Planificación de renovación',
    'about.propertyManagement': 'Gestión de propiedades',
    'about.ourMission': 'Nuestra Misión',
    'about.missionText':
      'Empoderar a nuestros clientes con soluciones inmobiliarias innovadoras que maximicen los retornos, minimicen los riesgos y creen valor duradero. Nos esforzamos por ser el socio más confiable en cada viaje inmobiliario de nuestros clientes.',
    'about.ourVision': 'Nuestra Visión',
    'about.visionText':
      'Ser la empresa inmobiliaria líder en el sur de Florida, reconocida por nuestra innovación, integridad y resultados excepcionales para clientes. Visualizamos un futuro donde la inversión inmobiliaria sea accesible, rentable y gratificante para todos.',
    'about.readyToWork': '¿Listo para trabajar con nosotros?',
    'about.readyText':
      'Únase a cientos de clientes satisfechos que confían en nosotros con sus inversiones inmobiliarias.',
    'about.scheduleConsultation': 'Programar Consulta',

    // About Page Content
    'about.ourStory': 'Nuestra Historia',
    'about.story1':
      'Somos tres profesionales inmobiliarios unidos por nuestro amor por Mallorca y años de experiencia en el mercado inmobiliario de la isla.',
    'about.story2':
      'Después de años ayudando a las personas a navegar el mercado inmobiliario de la isla, fundamos Palmside Mallorca para combinar nuestra experiencia profesional con nuestro genuino amor por este lugar increíble.',
    'about.story3':
      'Desde su primera visita a la isla, estamos aquí para guiarle a través de encontrar, comprar y realmente disfrutar de su hogar perfecto en Mallorca. Sabemos que el proceso puede sentirse abrumador cuando se trata de un mercado extranjero, diferentes sistemas legales y barreras de idioma – exactamente por eso estamos aquí.',
    'about.story4':
      'Entre los tres, hablamos inglés, alemán, español y francés, por lo que nunca se sentirá perdido en la traducción durante visitas, negociaciones o papeleo. Ya sea que esté buscando su hogar soñado, navegando las complejidades de la ley de propiedad española, administrando una inversión existente o planificando una renovación, manejamos cada detalle desde el laberinto legal hasta ayudarle a encontrar la mejor propiedad local.',
    'about.languagesSupport': 'Idiomas y Soporte',
    'about.english': 'Inglés',
    'about.german': 'Alemán',
    'about.spanish': 'Español',
    'about.french': 'Francés',
    'about.howWeHelp': 'Cómo Ayudamos',
    'about.homeSearch': 'Búsqueda de hogar y visitas',
    'about.negotiations': 'Negociaciones y ofertas',
    'about.legalCoordination': 'Coordinación legal y notarial',
    'about.dueDiligence': 'Debida diligencia y valoración',
    'about.renovationPlanning': 'Planificación de renovación',
    'about.propertyManagement': 'Gestión de propiedades',
    'about.ourMission': 'Nuestra Misión',
    'about.missionText':
      'Empoderar a nuestros clientes con soluciones inmobiliarias innovadoras que maximicen los retornos, minimicen los riesgos y creen valor duradero. Nos esforzamos por ser el socio más confiable en cada viaje inmobiliario de nuestros clientes.',
    'about.ourVision': 'Nuestra Visión',
    'about.visionText':
      'Ser la empresa inmobiliaria líder en el sur de Florida, reconocida por nuestra innovación, integridad y resultados excepcionales para clientes. Visualizamos un futuro donde la inversión inmobiliaria sea accesible, rentable y gratificante para todos.',
    'about.readyToWork': '¿Listo para trabajar con nosotros?',
    'about.readyText':
      'Únase a cientos de clientes satisfechos que confían en nosotros con sus inversiones inmobiliarias.',
    'about.scheduleConsultation': 'Programar Consulta',

    // Footer Services
    'footer.propertySearch': 'Búsqueda de Propiedades',
    'footer.investmentConsulting': 'Consultoría de Inversiones',
    'footer.marketAnalysis': 'Análisis de Mercado',
    'footer.luxuryConcierge': 'Conserjería de Lujo',
    'footer.constructionRenovation': 'Construcción y Renovación',
    'footer.marketingPresentation': 'Marketing y Presentación',
    'footer.phone': 'Teléfono:',
    'footer.email': 'Correo:',
    'footer.address':
      'Carrer de Ametler 3 -1B, ES-07609 Son Veri Nou, Islas Baleares',
    'footer.followUs': 'Síguenos',
    'footer.companyDescription':
      'Su socio de confianza en servicios inmobiliarios. Nos especializamos en propiedades de lujo y oportunidades de inversión.',

    // Properties Page
    'properties.propertyType': 'Tipo de Propiedad',
    'properties.allTypes': 'Todos los Tipos',
    'properties.luxuryHomes': 'Casas de Lujo',
    'properties.investmentProperties': 'Propiedades de Inversión',
    'properties.commercialProperties': 'Propiedades Comerciales',
    'properties.propertyDevelopment': 'Desarrollo Inmobiliario',
    'properties.residential': 'Residencial',
    'properties.status': 'Estado',
    'properties.allStatus': 'Todos los Estados',
    'properties.forSale': 'En Venta',
    'properties.forLease': 'En Alquiler',
    'properties.sold': 'Vendido',
    'properties.leased': 'Alquilado',
    'properties.preConstruction': 'Pre-Construcción',
    'properties.location': 'Ubicación',
    'properties.featured': 'Destacado',
    'properties.allProperties': 'Todas las Propiedades',
    'properties.featuredOnly': 'Solo Destacadas',
    'properties.loadingProperties': 'Cargando propiedades...',
    'properties.errorLoading': 'Error al Cargar Propiedades',
    'properties.viewAll': 'Ver Todas',
    'properties.bedrooms': 'Dormitorios',
    'properties.bathrooms': 'Baños',
    'properties.squareMeters': 'm²',
    'properties.viewDetails': 'Ver Detalles',
    'properties.addToFavorites': 'Agregar a Favoritos',
    'properties.removeFromFavorites': 'Quitar de Favoritos',
    'properties.previous': 'Anterior',
    'properties.next': 'Siguiente',
    'properties.noPropertiesFound':
      'No se encontraron propiedades que coincidan con sus criterios.',
    'properties.tryAdjustingFilters':
      'Intente ajustar sus filtros o términos de búsqueda.',
    'properties.propertiesAvailable': 'propiedades disponibles',

    // Services Page
    'services.propertySearch': 'Búsqueda de Propiedades',
    'services.propertySearchDesc':
      'Asistencia experta para encontrar su propiedad soñada con apoyo personalizado para comprar, vender o alquilar.',
    'services.customPropertyMatching':
      'Emparejamiento de propiedades personalizado',
    'services.marketAnalysisReports': 'Informes de análisis de mercado',
    'services.vacationPropertyBrokerage':
      'Corretaje de propiedades vacacionales',
    'services.virtualPropertyTours': 'Tours virtuales de propiedades',
    'services.investmentConsulting': 'Consultoría de Inversiones',
    'services.investmentConsultingDesc':
      'Orientación estratégica para inversiones inmobiliarias con información completa del mercado y evaluación de riesgos.',
    'services.portfolioAnalysis': 'Análisis de cartera',
    'services.riskAssessment': 'Evaluación de riesgos',
    'services.returnProjections': 'Proyecciones de retorno',
    'services.marketTrends': 'Análisis de tendencias del mercado',
    'services.marketAnalysis': 'Análisis de Mercado',
    'services.marketAnalysisDesc':
      'Investigación y análisis profundo del mercado para ayudarle a tomar decisiones inmobiliarias informadas.',
    'services.comparativeMarketAnalysis': 'Análisis comparativo del mercado',
    'services.priceTrends': 'Tendencias de precios',
    'services.neighborhoodInsights': 'Perspectivas del vecindario',
    'services.investmentOpportunities': 'Oportunidades de inversión',
    'services.luxuryConcierge': 'Conserjería de Lujo',
    'services.luxuryConciergeDesc':
      'Servicios de conserjería premium para propietarios e inversores con atención personalizada.',
    'services.propertyManagement': 'Gestión de propiedades',
    'services.tenantScreening': 'Selección de inquilinos',
    'services.maintenanceCoordination': 'Coordinación de mantenimiento',
    'services.financialReporting': 'Informes financieros',
    'services.constructionRenovation': 'Construcción y Renovación',
    'services.constructionRenovationDesc':
      'Servicios completos de construcción y renovación desde la planificación hasta la ejecución con contratistas de confianza.',
    'services.projectPlanning': 'Planificación de proyectos',
    'services.contractorManagement': 'Gestión de contratistas',
    'services.qualityControl': 'Control de calidad',
    'services.timelineManagement': 'Gestión de cronogramas',
    'services.marketingPresentation': 'Marketing y Presentación',
    'services.marketingPresentationDesc':
      'Servicios profesionales de marketing y presentación para mostrar su propiedad de manera efectiva.',
    'services.propertyPhotography': 'Fotografía de propiedades',
    'services.virtualStaging': 'Staging virtual',
    'services.marketingMaterials': 'Materiales de marketing',
    'services.onlineListings': 'Listados en línea',
    'services.investmentConsultingDesc2':
      'Asesoramiento estratégico para maximizar los rendimientos y minimizar los riesgos en su cartera.',
    'services.roiAnalysis': 'Análisis de ROI',
    'services.marketTimingStrategies': 'Estrategias de timing de mercado',
    'services.portfolioDiversification': 'Diversificación de cartera',
    'services.taxOptimization': 'Optimización fiscal',
    'services.marketAnalysisDesc2':
      'Investigación y tendencias profundas para informar sus decisiones inmobiliarias.',
    'services.priceTrendAnalysis': 'Análisis de tendencias de precios',
    'services.supplyDemandInsights': 'Perspectivas de oferta y demanda',
    'services.neighborhoodGrowth': 'Crecimiento del vecindario',
    'services.futureProjections': 'Proyecciones futuras',
    'services.luxuryConciergeDesc2':
      'Servicios de conserjería premium para propietarios y clientes de propiedades de alta gama.',
    'services.personalizedService': 'Servicio personalizado',
    'services.lifestyleManagement': 'Gestión de estilo de vida',
    'services.exclusiveAccess': 'Acceso exclusivo',
    'services.constructionRenovationDesc2':
      'Servicios completos de construcción y renovación desde la planificación hasta la ejecución.',
    'services.projectManagement': 'Gestión de proyectos',
    'services.qualityAssurance': 'Aseguramiento de calidad',
    'services.timelineCoordination': 'Coordinación de cronograma',
    'services.marketingPresentationDesc2':
      'Servicios profesionales de marketing y presentación para mostrar su propiedad.',
    'services.stagingServices': 'Servicios de staging',
    'services.digitalMarketing': 'Marketing digital',
    'services.brandDevelopment': 'Desarrollo de marca',
    'services.personalPropertyTours': 'Tours personalizados de propiedades',
    'services.support247': 'Soporte 24/7',
    'services.fullScaleRenovations':
      'Renovaciones completas o reparaciones menores',
    'services.constructionProjectManagement':
      'Gestión de proyectos de construcción',
    'services.supervisionConstructionPhases':
      'Supervisión de todas las fases de construcción',
    'services.qualityControlFollowUp': 'Control de calidad y seguimiento',
    'services.professionalHomePhotography': 'Fotografía profesional de hogar',
    'services.contemporaryHomeStaging': 'Staging contemporáneo de hogar',
    'services.propertyMarketingSaleRental':
      'Marketing de propiedades para venta o alquiler',
    'services.readyToStart': '¿Listo para comenzar?',
    'services.expertTeamReady':
      'Nuestro equipo de expertos está listo para brindar el más alto nivel de servicio y experiencia. ¿Tiene una solicitud diferente? No dude en contactarnos.',
    'services.scheduleConsultation': 'Programar Consulta',
    'services.downloadBrochure': 'Descargar Folleto',
    'services.quickNavigation': 'Navegación Rápida',

    // Language
    'language.english': 'Inglés',
    'language.german': 'Alemán',
    'language.spanish': 'Español',
    'language.select': 'Seleccionar idioma',

    // Error messages
    'error.generic': 'Algo salió mal. Por favor, inténtalo de nuevo.',
    'error.network': 'Error de red. Por favor, verifica tu conexión.',
    'error.notFound': 'Página no encontrada',
    'error.unauthorized': 'Acceso no autorizado',
    'error.forbidden': 'Acceso prohibido',
    'error.server': 'Error del servidor. Por favor, inténtalo más tarde.',

    // Success messages
    'success.saved': 'Cambios guardados con éxito',
    'success.deleted': 'Elemento eliminado con éxito',
    'success.updated': 'Elemento actualizado con éxito',
    'success.created': 'Elemento creado con éxito',

    // Contact Page
    'contact.sendMessage': 'Envíanos un Mensaje',
    'contact.fillForm':
      'Complete el formulario a continuación y nos pondremos en contacto con usted dentro de 24 horas.',
    'contact.messageSentSuccessfully': '¡Mensaje enviado con éxito!',
    'contact.thankYouContacting':
      'Gracias por contactarnos. Nos pondremos en contacto pronto.',
    'contact.submissionFailed': 'Error en el Envío',
    'contact.errorSendingMessage':
      'Hubo un error al enviar su mensaje. Por favor, inténtelo de nuevo.',
    'contact.fullName': 'Nombre Completo',
    'contact.enterFullName': 'Ingrese su nombre completo',
    'contact.emailAddress': 'Dirección de Correo Electrónico',
    'contact.enterEmail': 'Ingrese su correo electrónico',
    'contact.phoneNumber': 'Número de Teléfono',
    'contact.enterPhoneNumber': 'Ingrese su número de teléfono',
    'contact.serviceInquiry': 'Consulta de Servicio',
    'contact.selectService': 'Seleccione un servicio',
    'contact.message': 'Mensaje',
    'contact.tellUsMore': 'Cuéntanos más sobre tu consulta...',
    'contact.sending': 'Enviando...',
    'contact.contactInformation': 'Información de Contacto',
    'contact.reachOutChannels':
      'Contáctanos a través de cualquiera de estos canales. Siempre estamos aquí para ayudar.',
    'contact.getInTouch': 'Póngase en Contacto',
    'contact.emailUs': 'Envíanos un Email',
    'contact.callUs': 'Llámanos',
    'contact.visitUs': 'Visítanos',
    'contact.officeHours': 'Horario de Oficina',
    'contact.monday': 'Lunes',
    'contact.tuesday': 'Martes',
    'contact.wednesday': 'Miércoles',
    'contact.thursday': 'Jueves',
    'contact.friday': 'Viernes',
    'contact.saturday': 'Sábado',
    'contact.sunday': 'Domingo',
    'contact.closed': 'Cerrado',
    'contact.am': 'AM',
    'contact.pm': 'PM',
    'contact.findUsOnMap': 'Encuéntranos en el Mapa',
    'contact.officeDescription':
      'Nuestra oficina en Son Verí Nou, con el aeropuerto de Palma de Mallorca visible en el mapa.',
    'contact.propertyManagement': 'Gestión de Propiedades',
    'contact.propertyManagementDesc':
      'Servicios integrales de gestión de propiedades',
    'contact.realEstateInvestment': 'Inversión Inmobiliaria',
    'contact.realEstateInvestmentDesc':
      'Oportunidades de inversión estratégica',
    'contact.propertyDevelopment': 'Desarrollo de Propiedades',
    'contact.propertyDevelopmentDesc':
      'Soluciones de desarrollo personalizadas',
    'contact.consultingServices': 'Servicios de Consultoría',
    'contact.consultingServicesDesc': 'Consultoría experta en bienes raíces',
    'contact.legalServices': 'Servicios Legales',
    'contact.legalServicesDesc': 'Experiencia legal en bienes raíces',
    'contact.generalInquiry': 'Consulta General',
    'contact.generalInquiryDesc': 'Otras preguntas o información',

    // Language
    'language.english': 'English',
    'language.german': 'Deutsch',
    'language.spanish': 'Español',
    'language.select': 'Seleccionar Idioma',

    // Error messages
    'error.generic': 'Algo salió mal. Por favor, inténtalo de nuevo.',
    'error.network': 'Error de red. Por favor, verifica tu conexión.',
    'error.notFound': 'Página no encontrada',
    'error.unauthorized': 'Acceso no autorizado',
    'error.forbidden': 'Acceso prohibido',
    'error.server': 'Error del servidor. Por favor, inténtalo más tarde.',

    // Success messages
    'success.saved': 'Cambios guardados con éxito',
    'success.deleted': 'Elemento eliminado con éxito',
    'success.updated': 'Elemento actualizado con éxito',
    'success.created': 'Elemento creado con éxito',

    // Validation
    'validation.required': 'Este campo es requerido',
    'validation.email':
      'Por favor, ingresa una dirección de correo electrónico válida',
    'validation.phone': 'Por favor, ingresa un número de teléfono válido',
    'validation.minLength': 'Debe tener al menos {min} caracteres',
    'validation.maxLength': 'No debe tener más de {max} caracteres',
    'validation.pattern': 'Por favor, ingresa un formato válido',
  },
}

/**
 * Get translation for a key in a specific language
 * @param {string} key - Translation key
 * @param {string} lang - Language code (en, de, es)
 * @param {Object} params - Parameters for string interpolation
 * @returns {string} - Translated text
 */
export function getTranslation(key, lang = 'en', params = {}) {
  const translation =
    translations[lang]?.[key] || translations['en']?.[key] || key

  // Simple string interpolation for parameters like {min}, {max}
  return translation.replace(/\{(\w+)\}/g, (match, param) => {
    return params[param] || match
  })
}

/**
 * Get all available languages
 * @returns {Array<string>} - Array of language codes
 */
export function getAvailableLanguages() {
  return Object.keys(translations)
}

/**
 * Check if a language is supported
 * @param {string} lang - Language code
 * @returns {boolean} - True if language is supported
 */
export function isLanguageSupported(lang) {
  return lang in translations
}
