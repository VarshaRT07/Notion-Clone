import { Label } from "@/components/shadcn/ui/label";
import { useSettings } from "@/lib/hooks";
import { Dialog, DialogContent, DialogHeader } from "../../shadcn/ui/dialog";
import ModeToggle from "../ModeToggle";

export default function SettingsModal() {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Notion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
}
