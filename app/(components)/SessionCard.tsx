import { FaChrome, FaFirefox, FaEdge, FaSafari } from "react-icons/fa";
import { DeleteSessionButton } from "./DeleteSessionButton";

interface Props {
  id: string;
  userAgent: string;
  expiresAt: string;
}

export function SessionCard({ expiresAt, id, userAgent }: Props) {
  function getBrowserIcon(userAgent: string) {
    switch (userAgent) {
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
    <article
      className="flex justify-between transition-colors ease-in-out duration-150
         hover:bg-gray-400/10 items-center p-2 border rounded-md"
    >
      <div className="flex items-center gap-2">
        <div>{getBrowserIcon(userAgent)}</div>

        <div className="flex flex-col">
          <span className="font-semibold">{userAgent}</span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(expiresAt).toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <DeleteSessionButton sessionId={id} />
    </article>
  );
}
