
type Props = {
    text: string;
    isActive?: boolean;
}

const PrimaryLabel = ({ text, isActive = false }: Props) => {
    return (
        <div className=" text-gray-500 hover:text-primary cursor-pointer dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            {text}
        </div>
    )
}

export default PrimaryLabel