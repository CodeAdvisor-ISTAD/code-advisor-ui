import CreateNewContent from '@/components/content-component/createContent'
import React from 'react'
import HomeLayout from '@/components/layout/HomeLayout'
import Layout from '@/components/layout/Layout'

const page = () => {
  return (
    <Layout>
      <CreateNewContent />
    </Layout>
  )
}

export default page
