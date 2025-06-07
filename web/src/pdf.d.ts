declare module 'html2pdf.js' {
    const html2pdf: {
      from: (element: HTMLElement) => {
        set: (options: any) => {
          save: () => void;
          outputPdf: () => Promise<any>; // Replace 'any' with a more specific type if possible
        };
      };
    };
    export default html2pdf;
  }
  