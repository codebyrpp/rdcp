"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2 } from "lucide-react";
import { Label } from "@/components/ui/label";

type FormValues = {
    options: { value: string }[];
};

export function SelectOptions({
    options, updateOptions,
    elementId
}: {
    elementId: string;
    options: string[];
    updateOptions: (newOptions: string[]) => void
}) {
    const { control, register } = useForm<FormValues>({
        defaultValues: { options: options.map((option) => ({ value: option })) },
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "options",
        keyName: `${elementId}-options`,
    });
    
    const [currentOption, setCurrentOption] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        updateOptions(fields.map((field) => field.value));
    }, [fields, updateOptions]);

    const handleAddOption = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentOption.trim() !== "") {
            if (editIndex !== null) {
                update(editIndex, { value: currentOption });
                setEditIndex(null);
            } else {
                append({ value: currentOption });
            }
            setCurrentOption("");
        }
    };

    const handleEditOption = (index: number) => {
        setCurrentOption(fields[index].value);
        setEditIndex(index);
    };

    return (
        <div>
            <div className="mb-4">
                <Label htmlFor="currentOption">Add Option</Label>
                <div className="flex space-x-2 mt-1">
                    <Input
                        id="currentOption"
                        type="text"
                        value={currentOption}
                        onChange={(e) => setCurrentOption(e.target.value)}
                        placeholder="Enter an option"
                        className="flex-grow"
                    />
                    <Button type="button" onClick={handleAddOption}>
                        {editIndex !== null ? "Update" : "Add"}
                    </Button>
                </div>
            </div>
            <ul className="space-y-2 mb-4">
                {fields.map((field, index) => (
                    <li key={index} className="flex items-center justify-betweenrounded">
                        <div className="flex-1 text-sm overflow-x-auto">
                            <span>{field.value}</span>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditOption(index)}
                            type="button"
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => remove(index)}
                            type="button"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
