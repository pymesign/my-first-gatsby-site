// Step 1: Import React
import * as React from 'react'
import Layout from './components/Layout'
import Seo from './components/Seo'

// Step 2: Define your component
const ContactPage = () => {
  return (
    <Layout pageTitle="Contact Me">      
      <p>You can contact me via email or send me a message via Twitter.</p>
    </Layout>
  )
}

export const Head = () => <Seo title="Contact Me" />

// Step 3: Export your component
export default ContactPage