const chartColors: string[] = [
    '#FF6384', // Red
    '#36A2EB', // Blue
    '#FFCE56', // Yellow
    '#4BC0C0', // Teal
    '#9966FF', // Purple
    '#FF9F40', // Orange
    '#FFCD56', // Light Yellow
    '#C9CBCF', // Grey
    '#36A2EB', // Light Blue
    '#FF6384'  // Light Red
];

// select colors from chartColors
export const selectColor = (index: number): string => {
    return chartColors[index % chartColors.length];
};
