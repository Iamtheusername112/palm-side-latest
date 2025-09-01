import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { properties } from '../../../../../lib/schema'
import { count, avg, eq, sql } from 'drizzle-orm'

export async function GET(request) {
  try {
    // Get total properties count
    const [totalResult] = await db.select({ count: count() }).from(properties)
    const totalProperties = totalResult.count

    // Get properties for sale count
    const [forSaleResult] = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.status, 'For Sale'))
    const forSale = forSaleResult.count

    // Get average price
    const [avgPriceResult] = await db
      .select({ avgPrice: avg(properties.price) })
      .from(properties)
      .where(eq(properties.isActive, true))
    const averagePrice = avgPriceResult.avgPrice || 0

    // Get featured properties count
    const [featuredResult] = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.isFeatured, true))
    const featured = featuredResult.count

    // Get properties by status
    const statusCounts = await db
      .select({
        status: properties.status,
        count: count(),
      })
      .from(properties)
      .groupBy(properties.status)

    // Get properties by type
    const typeCounts = await db
      .select({
        type: properties.propertyType,
        count: count(),
      })
      .from(properties)
      .where(sql`${properties.propertyType} IS NOT NULL`)
      .groupBy(properties.propertyType)

    // Get recent properties (last 30 days)
    const [recentResult] = await db
      .select({ count: count() })
      .from(properties)
      .where(sql`${properties.createdAt} >= NOW() - INTERVAL '30 days'`)
    const recentProperties = recentResult.count

    // Get total value of all properties
    const [totalValueResult] = await db
      .select({ totalValue: sql`SUM(${properties.price})` })
      .from(properties)
      .where(eq(properties.isActive, true))
    const totalValue = totalValueResult.totalValue || 0

    const analytics = {
      totalProperties,
      forSale,
      averagePrice: Math.round(averagePrice),
      featured,
      recentProperties,
      totalValue: Math.round(totalValue),
      statusBreakdown: statusCounts.reduce((acc, item) => {
        acc[item.status] = item.count
        return acc
      }, {}),
      typeBreakdown: typeCounts.reduce((acc, item) => {
        acc[item.type] = item.count
        return acc
      }, {}),
    }

    return NextResponse.json({
      success: true,
      analytics,
    })
  } catch (error) {
    console.error('Error fetching property analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
