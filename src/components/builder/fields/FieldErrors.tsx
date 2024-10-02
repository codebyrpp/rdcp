import { FaExclamationCircle } from "react-icons/fa";

export const FieldErrors = ({ errors }: { errors: string[] }) => {
    return <>
        {errors.map((error, index) => (
            <div key={index} className="text-red-500 text-xs flex">
                <FaExclamationCircle className="mr-2" />
                <div>{error}</div>
            </div>
        ))}
    </>;
}
