# Text Wrapping System - 75 Characters Per Line

## 📖 Overview

This system automatically limits text content to **75 characters per line** for better readability and consistent formatting across the website.

## 🎯 How It Works

The system uses CSS custom properties and Tailwind utilities to calculate the maximum width based on:
- **Character limit**: 75 characters (configurable)
- **Average character width**: 0.6em (optimized for Hebrew/Heebo font)
- **Max width calculation**: `75 × 0.6em = 45em`

## 🚀 Quick Usage

### Replace Old Classes
```jsx
// OLD - No text wrapping
<p className="typo-body-regular text-gray-300">
  Long text that might exceed 75 characters per line...
</p>

// NEW - With 75-character wrapping
<p className="typo-body-regular-wrapped text-gray-300">
  Long text that will automatically wrap at 75 characters...
</p>
```

### Available Classes

| Old Class | New Wrapped Class | Purpose |
|-----------|-------------------|---------|
| `typo-body-large` | `typo-body-large-wrapped` | Large body text with wrapping |
| `typo-body-regular` | `typo-body-regular-wrapped` | Regular body text with wrapping |
| `typo-body-small` | `typo-body-small-wrapped` | Small body text with wrapping |
| Any text element | `text-content` | Apply 75-char wrapping to any element |

### Manual Wrapping Options

```jsx
// Different character limits
<p className="text-wrap-75">75 characters per line</p>
<p className="text-wrap-60">60 characters per line</p>
<p className="text-wrap-50">50 characters per line</p>
```

## ⚙️ Customization

### Change Character Limit Globally

Edit `tailwind.config.js` and modify the `--char-limit` value:

```js
'.text-wrap-75': {
  '--char-limit': '80', // Changed from 75 to 80
  '--char-width': '0.6em',
  // ...
}
```

### Add New Character Limits

Add to the `newUtilities` object in `tailwind.config.js`:

```js
'.text-wrap-100': {
  '--char-limit': '100',
  '--char-width': '0.6em',
  'max-width': 'calc(var(--char-limit) * var(--char-width))',
  'word-wrap': 'break-word',
  'overflow-wrap': 'break-word',
  'hyphens': 'auto',
},
```

### Override Character Width for Different Fonts

```css
/* For wider fonts */
.text-wrap-75 {
  --char-width: 0.7em;
}

/* For narrower fonts */
.text-wrap-75 {
  --char-width: 0.5em;
}
```

## 📝 Applied Examples

### Hero Section
```jsx
// Main headline with content wrapping
<h1 className="typo-page-title leading-tight mb-8 text-content">
  הסדנה היחידה בארץ שתלמד אותך לשלוט בהרמת משקולות
</h1>

// Subtext with body wrapping
<p className="typo-body-large-wrapped text-gray-300 mb-20">
  שלום, אני דוד ליטבינוב - ספורטאי אולימפי ושיאן ישראל
</p>
```

### About Section
```jsx
// Wrapped description paragraphs
<div className="typo-body-regular-wrapped text-gray-300 mb-8">
  <p>
    שלום, אני דוד ליטבינוב - לא עוד מאמן רגיל. אני ספורטאי אולימפי 
    שייצג את ישראל בטוקיו, שיאן ישראל ב-50+ קטגוריות...
  </p>
</div>
```

## 🔧 Implementation Checklist

- [x] ✅ Added CSS utilities to `tailwind.config.js`
- [x] ✅ Applied to Hero section
- [x] ✅ Applied to AboutDavid section
- [ ] 🔄 Apply to remaining sections:
  - [ ] WhySeminar
  - [ ] SeminarBreakdown
  - [ ] Testimonials
  - [ ] UpcomingSeminars
  - [ ] ContactFAQ
  - [ ] GymOwners
  - [ ] Footer
  - [ ] FAQ page

## 🎨 Benefits

1. **Consistent Readability**: All text respects the 75-character limit
2. **Easy Maintenance**: Change one value to adjust globally
3. **Responsive**: Works across all screen sizes
4. **Hebrew Optimized**: Calculated for Hebrew text and RTL layout
5. **Flexible**: Multiple character limits available

## 📱 Testing

After applying the classes, test on:
- Desktop (wide screens)
- Tablet (medium screens)  
- Mobile (narrow screens)
- Hebrew text length variations

## 🚀 Next Steps

1. Apply wrapped classes to remaining components
2. Test all text content for proper wrapping
3. Adjust character width if needed for specific fonts
4. Consider adding more character limit options (90, 120, etc.)

---

**Need help?** The system is designed to be simple - just replace typography classes with their `-wrapped` versions! 