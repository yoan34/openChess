import React from 'react'
import type { Metadata } from "next";
import { balooDa2 } from '@/app/fonts'

import  '@/app/globals.css'

export const metadata: Metadata = {
  title: "Open Chess",
  description: "Learn opening in a funny way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${balooDa2.className} antialiased bg-blue-500`}
      >
        {children}
      </body>
    </html>
  );
}
