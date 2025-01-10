"use client";

import LayoutIcon from "@/app/(frontend)/icons/LayoutIcon";
import React from "react";
import ThemeSwitcher from "@/app/(frontend)/components/ThemeSwitcher";

export default function Page() {
  return (
    <div>
      <div className="flex gap-3 items-center">
        <LayoutIcon width={"2em"} height={"2em"} fill="#1F68B2" />
        <h4 className="font-semibold text-myblue">Layout</h4>
      </div>

      <div className="flex flex-col border-1 gap-4 mt-6 border-black border-opacity-20 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center opacity-70">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
