import React, { useCallback, useEffect, useState } from 'react'
import ClearableSelect from '../common/ClearableSelect';
import { Field, FormSummary } from '@/pages/PageResponses';
import { useGetSummaryMutation } from '@/state/apiSlices/responsesApi';
import Loading from '../common/Loading';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
} from 'chart.js';
import { selectColor } from './chart_colors';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

ChartJS.register(
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale
);


/**
 * Determines if a given field is supported for charting.
 */
export const isChartSupportedField = (field: Field) => {
    return field.type === "CheckboxField" || field.type === "SelectField";
}

// export const supportedChartsField = (field: Field) => {
//     return {
//         "CheckboxField": ["Bar", "Pie"],
//         "SelectField": ["Bar", "Pie"]
//     }[field.type];    
// }

const ResponsesSummary = ({ fields, formId, summary }: {
    summary: FormSummary;
    fields: Field[];
    formId: string;
}) => {

    const [selectedField, setSelectedField] = React.useState<string | undefined>(undefined);

    const handleFieldChange = (value: string | undefined) => {
        setSelectedField(value);
        setKey(+new Date());
    };
    const [key, setKey] = useState(+new Date());

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
            <div className='flex flex-col gap-2'>
                <h4 className="text-lg font-semibold underline">Summary</h4>
                <div className='font-semibold p-2 bg-green-400 w-fit rounded-md'>
                    <span className='text-sm'>Total Submissions: </span>
                    <span className='text-sm'>{summary.total}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className='text-xs'>
                    View summary of responses for select, checkbox fields
                </p>
                {
                    fields &&
                    <ClearableSelect
                        key={key}
                        placeholder="Select Field"
                        options={fields?.map((field) => ({ key: field.field, label: field.label }))}
                        value={selectedField} onValueChange={handleFieldChange} />
                }
            </div>
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
    const labels = data.map(d => d.label);

    return (
        <div>
            <Tabs defaultValue="pie">
                <TabsList className="flex gap-2">
                    <TabsTrigger value="pie">Pie</TabsTrigger>
                    <TabsTrigger value="bar">Bar</TabsTrigger>
                </TabsList>
                <TabsContent value='bar'>
                    <Bar
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                        data={{
                            labels: labels,
                            datasets: [{
                                label: 'Responses',
                                data: data.map(d => d.count),
                                backgroundColor: labels.map((_, i) => {
                                    return selectColor(i);
                                })
                            }],
                        }} />
                </TabsContent>
                <TabsContent value="pie">
                    <Pie data={{
                        labels: labels,
                        datasets: [{
                            label: 'Responses',
                            data: data.map(d => d.count),
                            backgroundColor: labels.map((_, i) => {
                                return selectColor(i);
                            })
                        }]
                    }} />
                </TabsContent>
            </Tabs >

        </div >
    );
}

export default ResponsesSummary