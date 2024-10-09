import React, { useCallback, useEffect } from 'react'
import ClearableSelect from '../common/ClearableSelect';
import { Field } from '@/pages/PageReponses';

export const isChartSupportedField = (field: Field) => {
    return field.type === "CheckboxField" || field.type === "SelectField";
}

const ResponsesSummary = ({ fields }: {
    fields: Field[];
}) => {

    const [selectedField, setSelectedField] = React.useState<string | undefined>(undefined);
    const handleFieldChange = useCallback((value: string | undefined) => {
        setSelectedField(value);
    }, []);
    const [summaries, setSummaries] = React.useState<any[]>([]);

    useEffect(() => {
        // fetch data based on selected field
        if (!selectedField) return;

        // if selectedField not in summaries, fetch data
        if (summaries.find((summary) => summary.field === selectedField)) return;

        // fetch data


    }, [selectedField]);

    return (
        <div className="p-3 bg-slate-50 rounded-lg
    flex flex-col gap-3 border-l-slate-900">
            {/* Summary */}
            <h4 className="text-lg font-semibold">Summary</h4>
            {
                fields &&
                <ClearableSelect
                    placeholder="Select a field"
                    options={fields?.map((field) => ({ key: field.field, label: field.label }))}
                    value={selectedField} onValueChange={handleFieldChange} />
            }
            {
                // Show selected field summary here
                selectedField ? <div>Selected Field: {selectedField}</div> :
                    <div className='text-sm p-4 text-center text-muted-foreground'>
                        Select a field to view summary
                    </div>
            }
        </div>
    )
}

export default ResponsesSummary