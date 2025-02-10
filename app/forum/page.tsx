import HomeLayout from '@/components/layout/HomeLayout'
import Layout from '@/components/layout/Layout'
import ForumPage from '@/components/pages/ForumPages'
import React from 'react'

function page() {
  return (
    <HomeLayout>
        <ForumPage/>
    </HomeLayout>
  )
}

export default page