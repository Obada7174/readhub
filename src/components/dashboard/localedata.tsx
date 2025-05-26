// 'use client';
// import { useEffect, useState } from 'react';

// interface LocalizedDateProps {
//   date: string;
// }

// export default function LocalizedDate({ date }: LocalizedDateProps) {
//   const [localizedDate, setLocalizedDate] = useState('');

//   useEffect(() => {
//     const d = new Date(date);
//     setLocalizedDate(d.toLocaleDateString('ar-SA'));
//   }, [date]);

//   return <span suppressHydrationWarning>{localizedDate}</span>;
// }