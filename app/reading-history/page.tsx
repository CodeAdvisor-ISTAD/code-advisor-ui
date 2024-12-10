'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryCard } from "@/components//card-component/history-card/history-card"
import { getReadingHistory, HistoryItem } from "@/lib/reading"
import ISTADCard from "@/components/card-component/card-trending/Card-Istad";
import Recommendations from "@/components/card-component/card-trending/TrendingComponent";

function groupByDate(items: HistoryItem[]) {
  const groups: { [key: string]: HistoryItem[] } = {
    'ថ្ងៃនេះ': [], // Today in Khmer
    'ម្សិលមិញ': [], // Yesterday in Khmer
    '១០ តុលា ២០២៤': [] // Specific in Khmer
  }

  const today = new Date()
  const yesterday = new Date(Date.now() - 86400000)

  items.forEach(item => {
    const itemDate = new Date(item.date)
    if (itemDate.toDateString() === today.toDateString()) {
      groups['ថ្ងៃនេះ'].push(item)
    } else if (itemDate.toDateString() === yesterday.toDateString()) {
      groups['ម្សិលមិញ'].push(item)
    } else {
      groups['១០ តុលា ២០២៤'].push(item)
    }
  })

  return groups
}

export default function ReadingHistoryPage() {
    const latest = [
        "Advanced CSS techniques for modern web design",
        "Learn Tailwind CSS for responsive layouts",
        "Master React state management with Redux",
    ];
    
    const trending = [
        "Exploring Next.js for server-side rendering",
        "Introduction to GraphQL for API development",
        "Top 10 VSCode extensions for developers",
    ];
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchHistory() {
      const data = await getReadingHistory()
      setHistory(data)
      setIsLoading(false)
    }
    fetchHistory()
  }, [])

  const handleBookmark = (id: number) => {
    console.log('Bookmark:', id)
  }

  const handleRemove = (id: number) => {
    setHistory(history.filter(item => item.id !== id))
  }     

  const handleShare = (id: number) => {
    console.log('Share:', id)
  }

  const groupedHistory = groupByDate(history)

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl">
        <Tabs defaultValue="reading" className="w-full">
          <TabsList>
            <TabsTrigger value="reading">Reading history</TabsTrigger>
            <TabsTrigger value="search">Search history</TabsTrigger>
          </TabsList>
          <TabsContent value="reading" className="space-y-6">
            <Input
              type="search"
              placeholder="Search reading history"
              className="max-w-4xl border-gray-300"
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              Object.entries(groupedHistory).map(([date, items]) => 
                items.length > 0 && (
                  <div key={date} className="space-y-4">
                    <h2 className="text-lg font-semibold">{date}</h2>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <HistoryCard
                          key={item.id}
                          {...item}
                          onBookmark={() => handleBookmark(item.id)}
                          onRemove={() => handleRemove(item.id)}
                          onShare={() => handleShare(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </TabsContent>
          <TabsContent value="search">
            {/* Search history content */}
          </TabsContent>
        </Tabs>
      </div>


      {/* <div className="flex flex-col ml-2 gap-2  ">
            <Recommendations type="Latest" items={latest} />
            <Recommendations type="Trending" items={trending} />
            <ISTADCard></ISTADCard>
            </div> */}
    </div>
  )
}