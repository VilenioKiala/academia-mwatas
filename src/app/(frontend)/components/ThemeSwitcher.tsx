"use client";

import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import React from "react";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div>
        <Switch
          defaultSelected
          color="secondary"
          onChange={() => {
            if (theme == "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
          size="lg"
          thumbIcon={({ className }) =>
            theme == "dark" ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        >
          Modo {theme == "light" ? "Claro" : "Escuro"}
        </Switch>
      </div>
    </>
  );
}
