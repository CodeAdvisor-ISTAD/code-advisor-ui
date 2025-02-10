import HomeLayout from '@/components/layout/HomeLayout'
import ReadingHistoryPage from '@/components/pages/History'
import React from 'react'

function page() {
  return (
    <HomeLayout>
      <ReadingHistoryPage />
    </HomeLayout>
  )
}

export default page