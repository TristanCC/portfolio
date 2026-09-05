import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

type SettingsProps = {
  setting: string | boolean;
  setSetting: ((value: boolean) => void) | null;
};

const Settings = ({ setting, setSetting }: SettingsProps) => {
  const { setTheme, resolvedTheme } = useTheme();

  const [checked, setChecked] = useState(
    setting === "theme-toggle"
      ? resolvedTheme === "dark"
      : Boolean(setting)
  );

  // Keep `checked` in sync with external changes
  useEffect(() => {
    if (setting === "theme-toggle") {
      setChecked(resolvedTheme === "dark");
    } else {
      setChecked(Boolean(setting));
    }
  }, [resolvedTheme, setting]);

  const handleToggle = () => {
    if (setting === "theme-toggle") {
      const newTheme = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    } else {
      const newValue = !checked;
      setSetting?.(newValue);
    }
  };

  return (
    <div>
      <Switch onClick={handleToggle} checked={checked} />
    </div>
  );
};

export default Settings;
