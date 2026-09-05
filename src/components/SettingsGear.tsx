import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Settings from "@/components/Settings";
import { IoSettingsOutline } from "react-icons/io5";

const SettingsGear = () => {
  return (
    <div className="fixed m-4 bottom-0 right-0 z-1000">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="z-50 p-4">
          <IoSettingsOutline className="scale-200" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[1000] bg-background"
          sideOffset={5}
          align="end"
          onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div className="flex w-full justify-between items-center">
              <h1>Dark</h1>
              <Settings setting={"theme-toggle"} setSetting={null} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsGear;
