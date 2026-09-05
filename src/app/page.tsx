"use client";

import Main from "@/components/Main";
import SettingsGear from "@/components/SettingsGear";

export default function Home() {
  return (
    <>
      <div
        className="fixed inset-0 w-full h-full pointer-events-none bg-[radial-gradient(hsl(38,33%,70%)_1px,transparent_1px)]
        dark:bg-[radial-gradient(hsl(38,33%,10%)_1px,transparent_1px)] bg-[size:16px_16px] bg-[hsl(38,33%,90%)] dark:bg-[hsl(38,33%,5%)]"
      />
      <SettingsGear />
      <div className="relative z-0">
        <Main />
      </div>
    </>
  );
}
