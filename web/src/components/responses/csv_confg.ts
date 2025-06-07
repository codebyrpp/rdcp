
import { Row } from '@tanstack/react-table'
import { mkConfig, generateCsv, download, ColumnHeader } from 'export-to-csv'



const exportCSV = (rows: Row<any>[], columnHeaders: ColumnHeader[]) => {
    const rowData = rows.map((row) => row.original)
    const csvConfig = mkConfig({
        fieldSeparator: ',',
        filename: `export-${new Date().toISOString()}`, // export file name (without .csv)
        decimalSeparator: '.',
        columnHeaders: columnHeaders,
    })
    const csv = generateCsv(csvConfig)(rowData)
    download(csvConfig)(csv)
}

export { exportCSV }