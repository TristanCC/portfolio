import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

const Settings = ({ setting, setSetting }) => {
  const { setTheme, theme } = useTheme();

  const [checked, setChecked] = useState(
    setting === "theme-toggle"
      ? theme === "dark"
      : Boolean(setting)
  );

  // Keep `checked` in sync with external changes
  useEffect(() => {
    if (setting === "theme-toggle") {
      setChecked(theme === "dark");
    } else {
      setChecked(Boolean(setting));
    }
  }, [theme, setting]);

  const handleToggle = () => {
    if (setting === "theme-toggle") {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    } else {
      const newValue = !checked;
      setSetting(newValue);
    }
  };

  return (
    <div>
      <Switch onClick={handleToggle} checked={checked} />
    </div>
  );
};

export default Settings;
