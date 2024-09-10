import { ImSpinner2 } from "react-icons/im";

const FormLoading = () => {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <ImSpinner2 className="animate-spin h-10 w-10 text-accent" />
        </div>
    );
}

export default FormLoading;