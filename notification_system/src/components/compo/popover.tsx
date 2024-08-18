import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notification {
  message: string;
}

export function PopoverComponent({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          title="notification"
          className="bg-gray-200 p-3 rounded-full hover:bg-gray-300"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8 6.659 6 9.87 6 14v3c0 .217-.053.427-.152.605L4.293 17H9m6 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 shadow-none border-none  ">
        <div className="absolute py-5 fontPoppins right-20 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <ul className="mt-2 space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className="p-2 bg-gray-100 rounded-md">
                  {notification.message}
                </li>
              ))
            ) : (
              <p className="text-gray-600">No notifications</p>
            )}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// {showNotifications && (
//   <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-4">
//     <h3 className="text-lg font-semibold">Notifications</h3>
//     <ul className="mt-2 space-y-2">
//       {notifications.length > 0 ? (
//         notifications.map((notification, index) => (
//           <li key={index} className="p-2 bg-gray-100 rounded-md">
//             {notification.message}
//           </li>
//         ))
//       ) : (
//         <p className="text-gray-600">No notifications</p>
//       )}
//     </ul>
//   </div>
// )}
