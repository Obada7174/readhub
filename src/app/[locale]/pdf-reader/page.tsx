// 'use client';

// import { useEffect, useRef, useState, useCallback } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// const PDFReader = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(0);
//   const [scale, setScale] = useState(1.5);
//   const [darkMode, setDarkMode] = useState(false);
//   const [searchResults, setSearchResults] = useState<{ page: number; text: string }[]>([]);

//   useEffect(() => {
//     const loadPdf = async () => {
//       try {
//         const pdf = await pdfjsLib.getDocument('/pdfs/adhamSherqawi.pdf').promise;
//         setPdfDoc(pdf);
//         setNumPages(pdf.numPages);
//       } catch (err) {
//         console.error('Failed to load PDF:', err);
//       }
//     };
//     loadPdf();
//   }, []);

//   const renderPage = useCallback(async (pageNum: number) => {
//     if (!pdfDoc || !canvasRef.current) return;

//     const page = await pdfDoc.getPage(pageNum);
//     const viewport = page.getViewport({ scale });

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;

//     await page.render({ canvasContext: context!, viewport }).promise;
//   }, [pdfDoc, scale]);

//   useEffect(() => {
//     if (pdfDoc) renderPage(pageNumber);
//   }, [pdfDoc, pageNumber, scale, renderPage]);

//   const handleSearch = async () => {
//     const term = inputRef.current?.value?.trim().toLowerCase();
//     if (!term || !pdfDoc) return;

//     const results: { page: number; text: string }[] = [];

//     for (let i = 1; i <= numPages; i++) {
//       const page = await pdfDoc.getPage(i);
//       const content = await page.getTextContent();
//       const text = content.items.map((item: any) => item.str).join(' ');

//       if (text.toLowerCase().includes(term)) {
//         results.push({ page: i, text });
//       }
//     }

//     setSearchResults(results);
//     if (results.length > 0) {
//       setPageNumber(results[0].page);
//     }
//   };

//   return (
//     <div style={{
//       backgroundColor: darkMode ? '#111' : '#fff',
//       color: darkMode ? '#fff' : '#000',
//       padding: 20,
//       minHeight: '100vh',
//     }}>
//       <h2 style={{ textAlign: 'center', marginBottom: 20 }}>📖 Read PDF</h2>

//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         gap: 10,
//         flexWrap: 'wrap',
//         marginBottom: 20,
//       }}>
//         <button onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}>⬅️ Prev</button>
//         <span>Page {pageNumber} of {numPages}</span>
//         <button onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}>Next ➡️</button>
//         <button onClick={() => setScale((s) => s + 0.2)}>Zoom In 🔍</button>
//         <button onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}>Zoom Out 🔎</button>
//         <button onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
//         </button>
//       </div>


//       <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
//         <input ref={inputRef} type="text" placeholder="Search..." style={{ padding: 5 }} />
//         <button onClick={handleSearch}>Search 🔍</button>
//         {searchResults.length > 0 && (
//           <span>{searchResults.length} result(s)</span>
//         )}
//       </div>

      
//       <div style={{ textAlign: 'center', marginBottom: 20 }}>
//         <input
//           type="range"
//           min="1"
//           max={numPages}
//           value={pageNumber}
//           onChange={(e) => setPageNumber(Number(e.target.value))}
//           style={{ width: '60%' }}
//         />
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
//       </div>

// {searchResults.length > 0 && (
//   <div style={{ marginTop: 30, padding: 10, background: darkMode ? '#222' : '#f0f0f0', borderRadius: 10 }}>
//     <h4>search resaults</h4>
//     <ul>
//       {searchResults.map((result, index) => (
//         <li
//           key={index}
//           onClick={() => setPageNumber(result.page)}
//           style={{ cursor: 'pointer', marginBottom: 10 }}
//         >
//           <strong>page {result.page}:</strong> {result.text.slice(0, 100)}...
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//     </div>
    
//   );
// };

// export default PDFReader;
