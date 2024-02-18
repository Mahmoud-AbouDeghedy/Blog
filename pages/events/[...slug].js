import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

// import { getFilteredEvents } from "@/dummy-data";
import { getFilteredEvents } from "@/helpers/api-util";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";

function FilteredEventsPage({
	filteredEvents,
	hasError,
	filteredYear,
	filteredMonth,
}) {
	const [events, setEvents] = useState();
	const router = useRouter();
	const filteredData = router.query.slug;

	const { data, error } = useSWR(
		"https://events-83fda-default-rtdb.firebaseio.com/events.json",
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (data) {
			const events = [];
			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}
			setEvents(events);
		}
	}, [data]);

	let pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta name="description" content="A list of filtered events." />
		</Head>
	);

	if (!events)
		return (
			<>
				{pageHeadData}
				<p className="center">Loading...</p>
			</>
		);

	pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta
				name="description"
				content={`All events for ${numMonth}/${numYear}`}
			/>
		</Head>
	);

	const numYear = +filteredData[0];
	const numMonth = +filteredData[1];

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	)
		return (
			<>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);

	const filteredEvents2 = events.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	// const filteredEvents = getFilteredEvents({
	// 	year: filteredYear,
	// 	month: filteredMonth,
	// });

	if (!filteredEvents2 || filteredEvents2.length === 0)
		return (
			<>
				{pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);

	return (
		<>
			{pageHeadData}
			<ResultsTitle date={new Date(numYear, numMonth - 1)} />
			<EventList events={filteredEvents2} />
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const { params } = context;
// 	const filteredYear = +params.slug[0],
// 		filteredMonth = +params.slug[1];
// 	const filteredEvents = await getFilteredEvents({
// 		year: filteredYear,
// 		month: filteredMonth,
// 	});

// 	if (
// 		isNaN(filteredYear) ||
// 		isNaN(filteredMonth) ||
// 		filteredYear > 2030 ||
// 		filteredYear < 2021 ||
// 		filteredMonth < 1 ||
// 		filteredMonth > 12
// 	)
// 		return {
// 			props: {
// 				hasError: true,
// 			},
// 			// notFound: true,
// 			// redirect: {
// 			// 	destination: "/error",
// 			// },
// 		};

// 	return {
// 		props: {
// 			filteredEvents,
// 			filteredYear,
// 			filteredMonth,
// 		},
// 	};
// }

export default FilteredEventsPage;
