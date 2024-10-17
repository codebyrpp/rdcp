import React from 'react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../ui/breadcrumb'

interface BreadCrumbsProps {
    links: {
        name: string,
        url?: string,
        action?: () => void
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
                            <BreadcrumbLink className='font-semibold' asChild>
                                <button type="button" onClick={e => {
                                    e.preventDefault();
                                    if (link.action) link.action();
                                }}>
                                    {link.name}
                                </button>
                            </BreadcrumbLink>
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