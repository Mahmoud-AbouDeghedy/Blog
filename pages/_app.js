import Head from "next/head";

import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { NotificationContextProvider } from "@/store/notification-context";

export default function App({ Component, pageProps }) {
	return (
		<NotificationContextProvider>
			<Layout>
				<Head>
					<title>NextJS Events</title>
					<meta name="description" content="NextJS Events" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</NotificationContextProvider>
	);
}
