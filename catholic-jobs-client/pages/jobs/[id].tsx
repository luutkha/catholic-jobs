import { useRouter } from 'next/router'

type Props = {}

const JobDetail = (props: Props) => {
    const router = useRouter()
    const { pid } = router.query
    console.log(router.query)
    return (
        <div className='flex flex-col bg-gray-100 w-full flex-1'>
            <div className='bg-gray-200 h-20'>
                Searh Box
            </div>
            <div className='flex lg:flex-row max-lg:flex-col gap-3 p-5 w-100 max-h-screen bg-red-50'>
                <div className='lg:flex-2 max-h-full overflow-auto'>
                    left content
                    <div className='bg-red-400 overflow-y-visible' style={{ height: '1000px' }}> really long content</div>
                </div>
                <div className='lg:flex-1 bg-slate-100'>
                    right content
                </div>

            </div>
            <div className={'bg-red-500 sm:bg-blue-500 h-20 w-full'}>
                just for test responsive
            </div>
        </div>
    )
}

export default JobDetail