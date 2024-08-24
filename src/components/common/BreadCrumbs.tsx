import React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../ui/breadcrumb'

interface BreadCrumbsProps {
    links: {
        name: string,
        url: string
    }[],
    pageName: string
}

const BreadCrumbs = ({ links, pageName }: BreadCrumbsProps) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink className='font-semibold' href={link.url}>{link.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </React.Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage className='font-semibold'>{pageName}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumbs