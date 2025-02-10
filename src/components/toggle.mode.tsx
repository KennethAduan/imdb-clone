import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="sm"
      variant="ghost"
      className="justify-start"
      aria-label="Toggle theme"
    >
      <div className="flex gap-2 dark:hidden">
        <Moon className="size-5" data-testid="moon-icon" />
      </div>

      <div className="dark:flex gap-2 hidden">
        <Sun className="size-5" data-testid="sun-icon" />
      </div>
    </Button>
  );
};

export default ToggleTheme;
