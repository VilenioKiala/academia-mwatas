// import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/theme";

import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  darkMode: ["class"],
  content: [
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/input.js",
    "./node_modules/@nextui-org/theme/dist/components/progress.js",
    "./node_modules/@nextui-org/theme/dist/components/date-picker.js",
    "./node_modules/@nextui-org/theme/dist/components/date-input.js",
    "./node_modules/@nextui-org/theme/dist/components/radio.js",
    "./node_modules/@nextui-org/theme/dist/components/tabs.js",
    "./node_modules/@nextui-org/theme/dist/components/tooltip.js",
    "./node_modules/@nextui-org/theme/dist/components/table.js",
    "./node_modules/@nextui-org/theme/dist/components/dropdown.js",
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
    "./node_modules/@nextui-org/theme/dist/components/spinner.js",
    "./node_modules/@nextui-org/theme/dist/components/date-picker.js",
    "./node_modules/@nextui-org/theme/dist/components/checkbox.js",
    "./node_modules/@nextui-org/theme/dist/components/listbox.js",
    "./node_modules/@nextui-org/theme/dist/components/pagination.js",
    "./node_modules/@nextui-org/theme/dist/components/switch.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        myblue: "#1F68B2",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [nextui(), require("tailwindcss-animate")],
});
export default config;
