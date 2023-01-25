import Container from '@/components/atoms/Container'
import Layout from '@/components/common/Layout'
import Search from '@/components/molecules/Search'

export default function Page() {
  return (
    <>
      <Layout>
        <Container>
          <h1 className='my-12 text-center'>Server side error occurred.</h1>

          <h5 className='mb-8 text-center'>
            Please try to search something else.
          </h5>

          <div className='w-full lg:w-56 mx-auto mb-4'>
            <Search />
          </div>
        </Container>
      </Layout>
    </>
  )
}
