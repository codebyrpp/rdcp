import { FaExclamationCircle } from "react-icons/fa";

export const FieldErrors = ({ errors }: { errors: string[] }) => {
    return <div className="text-red-500 text-xs flex">
        {errors.map((error, index) => (
            <>
                <FaExclamationCircle className="mr-2" />
                <div key={index}>{error}</div>
            </>
        ))}
    </div>;
}
