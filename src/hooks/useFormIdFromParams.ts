import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const useGetFormIdFromParams = () => {
    const {formId} = useParams<{ formId: string }>()

    const navigate = useNavigate()

    useEffect(() => {
        if (!formId) {
            // redirect to the home page
            navigate("/projects");
        }
    }, [formId, navigate]);

    return formId;
}

export default useGetFormIdFromParams;
