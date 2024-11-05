"use client";

import { useSearchParams } from "next/navigation";

export default function Verify() {
  const search = useSearchParams();
  console.log("🚀 ~ file: page.tsx:7 ~ Verify ~ search:", search)

  const type = search.get("type") || 'email provider';
  const provider = search.get("provider") || "email";


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <a
        href="#"
        className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Check your email
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {`A sign in link has been sent to your email address using ${provider} with ${type}`}
        </div>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {process.env.NEXT_PUBLIC_SITE_URL}
        </div>
      </a>
    </div>
  );
}
