import Link from 'next/link';
import React from 'react';

export type CustomLinkProps = {
    href?: string;
    children?: React.ReactElement;
}

const CustomLink = ({ href = "/", children }: CustomLinkProps) => {
    return (
        <Link href={href}>
            {children}
        </Link>
    )
}

export default CustomLink