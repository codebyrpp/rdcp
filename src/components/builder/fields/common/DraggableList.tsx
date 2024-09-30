import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button"; // assuming you have a button component
import { AiOutlineClose, AiOutlineDrag } from "react-icons/ai";
import { Input } from "@/components/ui/input"; // assuming you have an input component
import { useState } from "react";

type DraggableListProps = {
    items: string[];
    onUpdate: (items: string[]) => void;
    onRemove: (index: number) => void;
    onChangeItem: (index: number, newValue: string) => void;
};

type SortableItemProps = {
    id: string;
    index: number;
    value: string;
    onRemove: () => void;
    onChangeItem: (newValue: string) => void;
};

function SortableItem({ id, index, value, onRemove, onChangeItem }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [inputValue, setInputValue] = useState(value);
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center justify-between gap-1">
            {/* Drag Handle */}
            <div
                className="text-xs p-2 cursor-pointer"
                {...listeners} // Attach drag events here
                {...attributes} // Attach attributes related to dragging
            >
                <AiOutlineDrag className="h-4" />
            </div>
            <div className="text-xs p-2">{index + 1}</div>
            <Input
                required={true}
                placeholder={`Option ${index + 1}`}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onBlur={() => {
                    onChangeItem(inputValue);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent form submission on Enter key press
                    }
                }}
            />
            <Button
                variant={"outline"}
                onClick={(e) => {
                    e.preventDefault();
                    onRemove();
                }}>
                <AiOutlineClose className="h-4" />
            </Button>
        </div>
    );
}

const DraggableList = ({ items, onUpdate, onRemove, onChangeItem }: DraggableListProps) => {
    const handleDragEnd = ({ active, over }: any) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over?.id);

        if (oldIndex !== newIndex) {
            const newItems = arrayMove(items, oldIndex, newIndex);
            onUpdate(newItems);
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {items.map((item, index) => (
                        <SortableItem
                            key={item}
                            id={item}
                            index={index}
                            value={item}
                            onRemove={() => onRemove(index)}
                            onChangeItem={(newValue) => onChangeItem(index, newValue)}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default DraggableList;
