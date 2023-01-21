import Link from 'next/link';
import { listItems } from '../../constants/common';
import CustomLink from '../commons/atoms/custom-link/CustomLink';
import Logo from '../commons/atoms/logo/Logo';
import PrimaryLabel from '../commons/atoms/primary-label/PrimaryLabel';
import { CustomMenuDropDown } from '../commons/molecules/menu-dropdown/CustomMenuDropDown';

type HeaderProps = {
    changeIsShowLeftSideBar: (boolean: boolean) => void;
    isShowLeftSideBar: boolean;

}
const Header = ({ changeIsShowLeftSideBar, isShowLeftSideBar }: HeaderProps) => {
    return (
        <>
            <div>
                <nav className=" bg-white dark:bg-gray-800 shadow font-utm-avo-bold ">
                    <div className="px-8 mx-auto max-w-7xl">
                        <div className="flex items-center justify-between h-16">
                            <div className=" flex items-center p-5 w-full">
                                <Link className=" w-full" href="/">
                                    <Logo />
                                </Link>
                                <div className="w-full hidden md:block">
                                    <div className="w-full flex flex-row justify-center items-center gap-5 text-sm">
                                        {listItems.map(item => <CustomLink key={item.href} href={item.href}>
                                            <div>
                                                <PrimaryLabel text={item.text} />
                                            </div>
                                        </CustomLink>)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="flex items-center ml-4 md:ml-6">
                                    <div className="relative ml-3">
                                        <div className="relative inline-block text-left">
                                            <CustomMenuDropDown triggerElement={<>Click</>} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mr-2 md:hidden">
                                    <button onClick={() => changeIsShowLeftSideBar(!isShowLeftSideBar)} className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                        <svg width="20" height="20" fill="currentColor" className="w-8 h-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>


    )
}

export default Header