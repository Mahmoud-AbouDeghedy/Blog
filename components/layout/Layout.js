import { useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./MainHeader";
import NotificationContext from "@/store/notification-context";

function Layout({ children }) {
	const notificationCtx = useContext(NotificationContext);
	const activeNotification = notificationCtx.notification;
	return (
		<>
			<MainHeader />
			<main>{children}</main>
			{activeNotification && (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			)}
		</>
	);
}

export default Layout;