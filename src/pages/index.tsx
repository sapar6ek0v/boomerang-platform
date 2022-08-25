import type { NextPage } from 'next'

import Layout from '../components/layout/Layout'
import OrderForm from '../components/OrderForm/OrderForm'

const Home: NextPage = () => {
  return (
    <Layout>
      <OrderForm />
    </Layout>
  )
}

export default Home
