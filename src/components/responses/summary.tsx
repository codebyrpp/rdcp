import React, { useCallback, useEffect } from 'react'
import ClearableSelect from '../common/ClearableSelect';
import { Field } from '@/pages/PageReponses';
import { useGetSummaryMutation } from '@/state/apiSlices/responsesApi';
import Loading from '../common/Loading';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export const isChartSupportedField = (field: Field) => {
    return field.type === "CheckboxField" || field.type === "SelectField";
}

const ResponsesSummary = ({ fields, formId }: {
    fields: Field[];
    formId: string;
}) => {

    const [selectedField, setSelectedField] = React.useState<string | undefined>(undefined);

    const handleFieldChange = (value: string | undefined) => {
        setSelectedField(value);
    };

    const [summaries, setSummaries] = React.useState<Record<string, any>>({});

    const [getSummary, { isLoading }] = useGetSummaryMutation();

    useEffect(() => {
        // fetch data based on selected field
        if (!selectedField) return;

        // if selectedField not in summaries, fetch data
        if (summaries[selectedField]) return;

        // fetch data
        getSummary({ formId: formId, field: selectedField }).unwrap()
            .then((data) => {
                console.log(data);
                setSummaries((prev) => ({
                    ...prev,
                    [selectedField]: data.map((dp: { _id: string; count: number; }) => ({
                        label: dp._id,
                        count: dp.count
                    }))
                }));
            })
            .catch((error) => {
                console.error(error);
            });

    }, [selectedField, summaries, formId, getSummary]);

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
                isLoading ?
                    <Loading />
                    : (
                        // Show selected field summary here
                        selectedField ? <div className="w-full">
                            <Chart key={selectedField} data={summaries[selectedField] ?? []} />
                        </div> :
                            <div className='text-sm p-4 text-center text-muted-foreground'>
                                Select a field to view summary
                            </div>
                    )

            }
        </div>
    )
}

const Chart = ({ data }: { data: { label: string; count: number }[] }) => {
    return (
        <div>
            <Pie data={{
                labels: data.map(d => d.label),
                datasets: [{
                    data: data.map(d => d.count)
                }]
            }} />
        </div>
    );
}

export default ResponsesSummary