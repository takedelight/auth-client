import { FaChrome, FaFirefox, FaEdge, FaSafari } from "react-icons/fa";
import { DeleteSessionButton } from "./DeleteSessionButton";
import { Session } from "../(types)/profile.type";

interface Props {
  sessions: Session[];
}

export function SessionList({ sessions }: Props) {
  function getBrowserIcon(name: string) {
    switch (name) {
      case "Chrome":
        return <FaChrome size={30} />;
      case "Firefox":
        return <FaFirefox size={30} />;
      case "Edge":
        return <FaEdge size={30} />;
      case "Safari":
        return <FaSafari size={30} />;
      default:
        return <FaChrome size={30} />;
    }
  }

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
            <li
              key={session.id}
              className="flex justify-between transition-colors ease-in-out duration-150
         hover:bg-gray-400/10 items-center p-2 border rounded-md"
            >
              <div className="flex items-center gap-2">
                <div>{getBrowserIcon(session.userAgent)}</div>

                <div className="flex flex-col">
                  <span className="font-semibold">{session.userAgent}</span>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(session.expiresAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <DeleteSessionButton sessionId={session.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
