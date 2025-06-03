const CardTemplate = ({children}) => {

    return (
        <div className=" z-10 flex justify-center items-center bg-background text-foreground rounded-sm 
        w-[clamp(300px,50lvw,1000px)] h-[clamp(300px,50lvh,1000px)] shadow">
            {children}
        </div>
    )
}

export default CardTemplate