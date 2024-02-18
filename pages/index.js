import Head from "next/head";

// import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";
import { getFeaturedEvents } from "@/helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage({ events }) {
	// const featuredEvents = getFeaturedEvents();
	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name="description"
					content="find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<NewsletterRegistration />
			<EventList events={events} />
		</div>
	);
}

export async function getStaticProps() {
	const events = await getFeaturedEvents();
	return {
		props: {
			events,
		},
		revalidate: 1800,
	};
}

export default HomePage;
