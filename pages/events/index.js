import { useRouter } from "next/router";
import Head from "next/head";

// import { getAllEvents } from "@/dummy-data";
import { getAllEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";

function AllEventsPage({ events }) {
	// const events = getAllEvents();
	const router = useRouter();

	function findEventHandler(year, month) {
		router.push(`/events/${year}/${month}`);
	}
	return (
		<>
			<Head>
				<title>All Events</title>
				<meta
					name="description"
					content="find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<EventSearch onSearch={findEventHandler} />
			<EventList events={events} />
		</>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();
	return {
		props: {
			events,
		},
		revalidate: 60,
	};
}

export default AllEventsPage;
