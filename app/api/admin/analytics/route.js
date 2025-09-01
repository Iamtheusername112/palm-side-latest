import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { properties, contacts, clients } from '../../../../lib/schema'
import { count, eq, and, gte, lte, desc, sql, sum, avg } from 'drizzle-orm'

export async function GET(request) {
  try {
    console.log('Analytics API called')

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'
    console.log('Time range:', timeRange)

    // Calculate date range based on timeRange parameter
    const now = new Date()
    let startDate = new Date()

    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    console.log('Date range:', { startDate, now })

    // Get overview statistics with better error handling
    try {
      const [
        totalProperties,
        activeListings,
        totalContacts,
        totalRevenue,
        avgResponseTime,
        totalClients,
      ] = await Promise.all([
        db.select({ count: count() }).from(properties),
        db
          .select({ count: count() })
          .from(properties)
          .where(
            and(
              eq(properties.isActive, true),
              sql`${properties.status} IN ('For Sale', 'For Lease')`
            )
          ),
        db.select({ count: count() }).from(contacts),
        db.select({ total: sum(properties.price) }).from(properties),
        db
          .select({
            avgTime: avg(
              sql`EXTRACT(EPOCH FROM (${contacts.respondedAt} - ${contacts.createdAt}))/3600`
            ),
          })
          .from(contacts)
          .where(sql`${contacts.respondedAt} IS NOT NULL`),
        db.select({ count: count() }).from(clients),
      ])

      console.log('Overview stats fetched:', {
        totalProperties: totalProperties[0]?.count,
        activeListings: activeListings[0]?.count,
        totalContacts: totalContacts[0]?.count,
        totalRevenue: totalRevenue[0]?.total,
        avgResponseTime: avgResponseTime[0]?.avgTime,
        totalClients: totalClients[0]?.count,
      })

      // Calculate conversion rate (contacts that resulted in responses)
      const respondedContacts = await db
        .select({ count: count() })
        .from(contacts)
        .where(sql`${contacts.respondedAt} IS NOT NULL`)

      const conversionRate =
        totalContacts[0]?.count > 0
          ? (
              (respondedContacts[0]?.count / totalContacts[0]?.count) *
              100
            ).toFixed(1)
          : 0

      console.log('Conversion rate calculated:', conversionRate)

      // Get trends data (monthly breakdown)
      const trendsData = await getTrendsData(startDate, now)
      console.log('Trends data fetched:', trendsData)

      // Get location distribution
      const locationStats = await db
        .select({
          location: properties.location,
          count: count(),
        })
        .from(properties)
        .groupBy(properties.location)
        .orderBy(desc(count()))
        .limit(6)

      console.log('Location stats:', locationStats)

      // Get property type distribution
      const propertyTypeStats = await db
        .select({
          propertyType: properties.propertyType,
          count: count(),
        })
        .from(properties)
        .groupBy(properties.propertyType)
        .orderBy(desc(count()))

      console.log('Property type stats:', propertyTypeStats)

      // Get contact source distribution
      const contactSourceStats = await db
        .select({
          source: contacts.source,
          count: count(),
        })
        .from(contacts)
        .groupBy(contacts.source)
        .orderBy(desc(count()))

      console.log('Contact source stats:', contactSourceStats)

      // Calculate percentages for distributions
      const totalProps = totalProperties[0]?.count || 0
      const totalConts = totalContacts[0]?.count || 0

      const response = {
        success: true,
        overview: {
          totalProperties: Number(totalProperties[0]?.count || 0),
          activeListings: Number(activeListings[0]?.count || 0),
          totalContacts: Number(totalContacts[0]?.count || 0),
          conversionRate: Number(conversionRate),
          avgResponseTime: Number(avgResponseTime[0]?.avgTime || 0),
          revenue: Number(totalRevenue[0]?.total || 0),
          totalClients: Number(totalClients[0]?.count || 0),
        },
        trends: trendsData,
        topLocations: locationStats.map((stat) => ({
          location: stat.location || 'Unknown',
          count: Number(stat.count),
          percentage:
            totalProps > 0
              ? Math.round((Number(stat.count) / totalProps) * 100)
              : 0,
        })),
        propertyTypes: propertyTypeStats.map((stat) => ({
          type: stat.propertyType || 'Unknown',
          count: Number(stat.count),
          percentage:
            totalProps > 0
              ? Math.round((Number(stat.count) / totalProps) * 100)
              : 0,
        })),
        contactSources: contactSourceStats.map((stat) => ({
          source: stat.source || 'Website',
          count: Number(stat.count),
          percentage:
            totalConts > 0
              ? Math.round((Number(stat.count) / totalConts) * 100)
              : 0,
        })),
      }

      console.log('Analytics response prepared:', response)
      return NextResponse.json(response)
    } catch (dbError) {
      console.error('Database error in analytics:', dbError)
      return NextResponse.json(
        {
          error: 'Database error',
          details: dbError.message,
          success: false,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error.message,
        success: false,
      },
      { status: 500 }
    )
  }
}

async function getTrendsData(startDate, endDate) {
  try {
    console.log('Getting trends data for:', { startDate, endDate })

    // Get monthly data for the specified time range
    const months = []
    const currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const monthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )
      const monthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      )

      months.push({
        date: currentDate.toLocaleDateString('en-US', { month: 'short' }),
        monthStart,
        monthEnd,
      })

      currentDate.setMonth(currentDate.getMonth() + 1)
    }

    console.log('Months to process:', months.length)

    // Get data for each month
    const trendsData = await Promise.all(
      months.map(async (month) => {
        try {
          const [propertiesCount, contactsCount, revenueSum] =
            await Promise.all([
              db
                .select({ count: count() })
                .from(properties)
                .where(
                  and(
                    gte(properties.createdAt, month.monthStart),
                    lte(properties.createdAt, month.monthEnd)
                  )
                ),
              db
                .select({ count: count() })
                .from(contacts)
                .where(
                  and(
                    gte(contacts.createdAt, month.monthStart),
                    lte(contacts.createdAt, month.monthEnd)
                  )
                ),
              db
                .select({ total: sum(properties.price) })
                .from(properties)
                .where(
                  and(
                    gte(properties.createdAt, month.monthStart),
                    lte(properties.createdAt, month.monthEnd)
                  )
                ),
            ])

          return {
            date: month.date,
            properties: Number(propertiesCount[0]?.count || 0),
            contacts: Number(contactsCount[0]?.count || 0),
            revenue: Number(revenueSum[0]?.total || 0),
          }
        } catch (monthError) {
          console.error('Error processing month:', month.date, monthError)
          return {
            date: month.date,
            properties: 0,
            contacts: 0,
            revenue: 0,
          }
        }
      })
    )

    const result = {
      properties: trendsData.map((item) => ({
        date: item.date,
        value: item.properties,
      })),
      contacts: trendsData.map((item) => ({
        date: item.date,
        value: item.contacts,
      })),
      revenue: trendsData.map((item) => ({
        date: item.date,
        value: item.revenue,
      })),
    }

    console.log('Trends data result:', result)
    return result
  } catch (error) {
    console.error('Error getting trends data:', error)
    return {
      properties: [],
      contacts: [],
      revenue: [],
    }
  }
}
