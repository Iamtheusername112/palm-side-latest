import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { properties } from '../../../../../lib/schema'

export async function GET(request) {
  try {
    // Get all properties
    const allProperties = await db.select().from(properties)

    // Convert to CSV format
    const headers = [
      'ID',
      'Title',
      'Description',
      'Price',
      'Location',
      'Property Type',
      'Status',
      'Bedrooms',
      'Bathrooms',
      'Square Feet',
      'Lot Size',
      'Year Built',
      'Address',
      'City',
      'State',
      'ZIP Code',
      'Country',
      'Features',
      'Images',
      'Is Featured',
      'Is Active',
      'Views',
      'Favorites',
      'Contact Count',
      'Created At',
      'Updated At',
    ]

    const csvRows = [headers.join(',')]

    allProperties.forEach((property) => {
      const row = [
        property.id,
        `"${(property.title || '').replace(/"/g, '""')}"`,
        `"${(property.description || '').replace(/"/g, '""')}"`,
        property.price || '',
        `"${(property.location || '').replace(/"/g, '""')}"`,
        `"${(property.propertyType || '').replace(/"/g, '""')}"`,
        `"${(property.status || '').replace(/"/g, '""')}"`,
        property.bedrooms || '',
        property.bathrooms || '',
        property.squareFeet || '',
        property.lotSize || '',
        property.yearBuilt || '',
        `"${(property.address || '').replace(/"/g, '""')}"`,
        `"${(property.city || '').replace(/"/g, '""')}"`,
        `"${(property.state || '').replace(/"/g, '""')}"`,
        `"${(property.zipCode || '').replace(/"/g, '""')}"`,
        `"${(property.country || '').replace(/"/g, '""')}"`,
        `"${
          property.features
            ? JSON.stringify(property.features).replace(/"/g, '""')
            : ''
        }"`,
        `"${
          property.images
            ? JSON.stringify(property.images).replace(/"/g, '""')
            : ''
        }"`,
        property.isFeatured ? 'Yes' : 'No',
        property.isActive ? 'Yes' : 'No',
        property.views || 0,
        property.favorites || 0,
        property.contactCount || 0,
        property.createdAt ? new Date(property.createdAt).toISOString() : '',
        property.updatedAt ? new Date(property.updatedAt).toISOString() : '',
      ]
      csvRows.push(row.join(','))
    })

    const csvContent = csvRows.join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="properties-export-${
          new Date().toISOString().split('T')[0]
        }.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting properties:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
