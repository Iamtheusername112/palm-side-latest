# Real-Time Contact Updates

This document explains how the real-time contact count updates work in the admin interface.

## Overview

The contact system now provides real-time updates for contact counts without requiring page refreshes. When an admin reads a message or changes a contact's status, the contact counts in the sidebar update automatically.

## Implementation Details

### 1. ContactContext Provider

**File**: `app/contexts/ContactContext.js`

- Provides global state management for contact counts
- Tracks `newContactsCount` and `allContactsCount`
- Includes polling mechanism (every 30 seconds) to ensure data accuracy
- Provides methods to update counts optimistically

### 2. Real-Time Updates

The system updates contact counts in the following scenarios:

#### When a Contact Status Changes

- **From**: Admin contacts page (`app/admin/contacts/page.js`)
- **Trigger**: When admin marks a contact as "read", "responded", or "closed"
- **Action**: Optimistically updates the count and refreshes from server

#### When a New Contact is Submitted

- **From**: Contact form (`app/contact/page.js`)
- **Trigger**: When a user submits the contact form
- **Action**: Immediately increments the new contacts count

### 3. Visual Indicators

- **Loading State**: The contact badge shows "..." with a pulse animation when updating
- **Badge Display**: Shows the current count of new (unread) contacts
- **Auto-Refresh**: Counts are refreshed every 30 seconds to ensure accuracy

## Usage

### For Developers

```javascript
import { useContactContext } from '../contexts/ContactContext'

const MyComponent = () => {
  const {
    newContactsCount,
    allContactsCount,
    updateContactCounts,
    addNewContact,
  } = useContactContext()

  // Update counts when contact status changes
  updateContactCounts({ from: 'new', to: 'read' })

  // Add new contact count
  addNewContact()
}
```

### For Users

1. **Admin Sidebar**: The "Contacts" menu item shows a red badge with the count of new contacts
2. **Status Changes**: When you mark a contact as read/responded, the count updates immediately
3. **New Submissions**: When someone submits the contact form, the count increases automatically
4. **Auto-Refresh**: Counts are automatically refreshed every 30 seconds

## Technical Benefits

- **No Page Refresh**: Updates happen instantly without reloading the page
- **Optimistic Updates**: UI updates immediately for better user experience
- **Fallback Polling**: Regular polling ensures data accuracy even if optimistic updates fail
- **Global State**: Contact counts are shared across all admin pages
- **Performance**: Minimal API calls with smart caching and optimistic updates

## Files Modified

1. `app/contexts/ContactContext.js` - New context provider
2. `app/providers.js` - Added ContactProvider wrapper
3. `app/components/AdminSidebar.js` - Uses context for contact counts
4. `app/admin/contacts/page.js` - Triggers updates on status changes
5. `app/contact/page.js` - Triggers updates on new submissions

## Testing

To test the real-time updates:

1. Open the admin interface in one browser tab
2. Open the contact form in another tab
3. Submit a new contact form
4. Watch the contact count badge update in the admin sidebar
5. Mark a contact as "read" in the admin interface
6. Watch the count decrease immediately

The system provides immediate feedback while maintaining data accuracy through periodic server synchronization.
