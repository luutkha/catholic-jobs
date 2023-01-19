import React from 'react';

type PageLayoutProps = {
    children: React.ReactElement
    header?: React.ReactElement
    footer?: React.ReactElement
}

const MasterLayout = ({ header, children, footer }: PageLayoutProps) => {
    return (
        <div className='flex flex-col justify-center items-center '>
            {header &&
                <>
                    <div className='fixed top-0 z-30 w-screen bg-amber-400'>{header}</div>
                    <div className='w-screen opacity-0'>{header}</div>
                </>

            }
            <div className='w-screen h-full min-h-screen'>{children}</div>
            {footer && <div className='w-screen bg-amber-800'>{footer}</div>}
        </div>
    )
}

export default MasterLayout