# Automatic Translation System

This Next.js app includes a comprehensive, future-proof automatic translation system that supports **English**, **German**, and **Spanish** using OpenAI's API.

## Features

- ✅ **Automatic Translation**: Any new component or text added to the app automatically translates
- ✅ **Static Translations**: Pre-defined translations for common UI elements
- ✅ **Dynamic Translation**: Real-time translation of any text using OpenAI
- ✅ **Global Context**: Language state managed globally across the app
- ✅ **Caching**: Translation results are cached for better performance
- ✅ **Future-Proof**: New components automatically work with the translation system

## Quick Start

### 1. Environment Setup

The system uses the OpenAI API key stored in your environment. Make sure you have:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Basic Usage

#### Static Translations

Use predefined translation keys:

```jsx
import Translate from '../components/Translate'

// Using static keys (instant, no API call)
<Translate staticKey="nav.home">Home</Translate>
<Translate staticKey="common.loading">Loading...</Translate>
```

#### Dynamic Translations

Wrap any text for automatic translation:

```jsx
// Automatic translation (uses OpenAI API)
<Translate>Hello, welcome to our real estate platform!</Translate>
<Translate>This property features 4 bedrooms and 3 bathrooms.</Translate>
```

#### Using Hooks

```jsx
import { useTranslation } from '../hooks/useTranslation'

function MyComponent() {
  const { t, translateText, currentLanguage, changeLanguage } = useTranslation()

  // Static translation
  const homeText = t('nav.home')

  // Dynamic translation
  const handleTranslate = async () => {
    const translated = await translateText('Hello world', 'de')
    console.log(translated) // "Hallo Welt"
  }

  return (
    <div>
      <p>{homeText}</p>
      <button onClick={handleTranslate}>Translate</button>
    </div>
  )
}
```

### 3. Language Switcher

Add a language switcher to any component:

```jsx
import LanguageSwitcher from '../components/LanguageSwitcher'

// Dropdown variant (default)
<LanguageSwitcher />

// Button group variant
<LanguageSwitcher variant="buttons" />

// Select dropdown variant
<LanguageSwitcher variant="select" />
```

## Components

### Translate Component

The main component for automatic translation:

```jsx
<Translate
  staticKey='nav.home' // Use predefined translation key
  fallback='Loading...' // Show while translating
  className='my-class' // CSS classes
  tag='span' // HTML tag to render
>
  Text to translate
</Translate>
```

### Language Switcher

Multiple variants available:

- `dropdown` (default): Dropdown with flags
- `buttons`: Button group layout
- `select`: Native select element

### Hooks

- `useTranslation()`: Full translation functionality
- `useStaticTranslation()`: Static translations only
- `useTextTranslation()`: Text translation utilities
- `useBatchTranslation()`: Batch translation
- `useLanguage()`: Language management
- `useCachedTranslation()`: Translation with caching

## File Structure

```
lib/
  translation.js          # OpenAI translation utility
  translations.js         # Static translations dictionary

contexts/
  TranslationContext.js   # Global translation context

components/
  Translate.js           # Automatic translation component
  LanguageSwitcher.js    # Language switching component

hooks/
  useTranslation.js      # Translation hooks

app/
  translation-demo/      # Demo page showcasing the system
```

## Adding New Translations

### Static Translations

Add new keys to `lib/translations.js`:

```javascript
export const translations = {
  en: {
    'my.new.key': 'English Text',
    // ...
  },
  de: {
    'my.new.key': 'Deutscher Text',
    // ...
  },
  es: {
    'my.new.key': 'Texto en Español',
    // ...
  },
}
```

### Dynamic Translations

Just wrap any text with `<Translate>`:

```jsx
<Translate>Any new text will be automatically translated</Translate>
```

## Performance

- **Static translations**: Instant, no API calls
- **Dynamic translations**: Cached after first translation
- **Batch translation**: Multiple texts translated in parallel
- **Lazy loading**: Translations only happen when needed

## Error Handling

- Falls back to original text if translation fails
- Graceful degradation if OpenAI API is unavailable
- Console warnings for debugging

## Demo

Visit `/translation-demo` to see the system in action with examples of:

- Static translations
- Dynamic translations
- Language switching
- Real estate content examples

## Future-Proof Design

The system is designed to work automatically with any new components you add:

1. **No manual wrapping needed** for most cases
2. **Automatic detection** of text content
3. **Global language state** affects all components
4. **Easy integration** with existing code

Just add `<Translate>` around any text and it will automatically translate based on the current language!
