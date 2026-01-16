import { Session } from "../(types)/profile.type";
import { SessionCard } from "./SessionCard";

interface Props {
  sessions: Session[];
}

export function SessionList({ sessions }: Props) {
  return (
    <>
      <div className="border p-2 rounded-md">
        <div>
          <h3 className="text-lg font-medium leading-none">My Sessions</h3>
          <p className="text-sm text-muted-foreground ">
            Manage your active sessions across devices.
          </p>
        </div>

        <ul className="flex flex-col gap-2 mt-4  max-h-60 overflow-y-auto">
          {sessions.map((session) => (
            <li key={session.id}>
              <SessionCard
                expiresAt={session.expiresAt}
                id={session.id}
                userAgent={session.userAgent}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
