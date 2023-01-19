import React from 'react';
import { listItems } from '../../../../constants/common';
import CustomLink from '../../atoms/custom-link/CustomLink';
import PrimaryLabel from '../../atoms/primary-label/PrimaryLabel';

type PageLayoutProps = {
    children: React.ReactElement
    header?: React.ReactElement
    footer?: React.ReactElement
    leftSideBar?: React.ReactElement
    isShowLeftSideBar?: boolean;
}

const MasterLayout = ({ header, children, footer, isShowLeftSideBar, leftSideBar }: PageLayoutProps) => {
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
            <div className={`absolute top-0 left-0 h-screen w-80 z-50 p-5 bg-white ${isShowLeftSideBar ? '' : 'hidden'}`} >
                {listItems.map(item => <CustomLink key={item.href} href={item.href}>
                    <div className='cursor-pointer block px-4 py-2 text-md font-utm-avo-bold'>
                        <PrimaryLabel text={item.text} />
                    </div>
                </CustomLink>
                )}
            </div>
        </div>
    )
}

export default MasterLayout