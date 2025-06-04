const CardTemplate = ({children}) => {

    return (
        <div className="flex justify-center items-center bg-background text-foreground rounded-sm 
        w-[clamp(300px,50lvw,1000px)] h-[clamp(300px,50lvh,1000px)] border-4 ">
            {children}
        </div>
    )
}

export default CardTemplate