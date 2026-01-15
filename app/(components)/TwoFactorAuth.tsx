import { Label, Switch } from "@/src/shared/ui";

export function TwoFactorAuth() {
  return (
    <div className="border p-2 rounded-md">
      <div className=" mb-2">
        <h3 className="text-lg font-semibold">2FA</h3>
        <p className="text-sm text-muted-foreground">
          You can enable 2FA to improve the security of your account.
        </p>
      </div>

      <div className="flex items-center gap-1 ">
        <Switch id="2fa" />
        <Label htmlFor="2fa">Enable 2FA</Label>
      </div>
    </div>
  );
}
