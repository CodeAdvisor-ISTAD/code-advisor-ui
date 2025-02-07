import HomeLayout from '@/components/layout/HomeLayout'
import BookmarkPage from '@/pages/BookmarkPages'
import React from 'react'

function page() {
  return (
    <HomeLayout>
      <BookmarkPage />
    </HomeLayout>
  )
}

export default page