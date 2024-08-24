export const ListItem = ({ children, onClick }: {
    children: React.ReactNode,
    onClick?: () => void
}) => {
    return (
        <div className='flex justify-between
     border border-slate-50 
     hover:border-slate-300
     hover:elevation-2 hover:shadow-sm
     rounded-xl p-2 bg-slate-50 cursor-pointer'
            onClick={(e)=>{
                onClick && onClick()
            }}
        >
            {children}
        </div>
    )
}

export const ListItemTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h6 className='font-semibold'>{children}</h6>
    )
}