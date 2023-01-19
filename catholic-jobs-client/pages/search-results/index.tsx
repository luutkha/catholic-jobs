import { useRouter } from 'next/router'

type Props = {}

const Index = (props: Props) => {
  const router = useRouter()
  const { pid } = router.query
  console.log(router.query)
  return (
    <div className='flex flex-col bg-gray-100 w-full flex-1'>
      <div className='bg-gray-200 h-20'>
        Searh Box
      </div>
      <div className='flex flex-1 gap-3 p-5 max-h-screen bg-red-50'>
        <div className='flex-1 max-h-full overflow-auto'>
          left content
          <div className='bg-red-400 overflow-y-visible' style={{ height: '2000px' }}> really long content</div>
        </div>
        <div className='flex-1 max-lg:hidden  bg-slate-100'>
          right content
        </div>

      </div>
    </div>
  )
}

export default Index