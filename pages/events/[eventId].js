import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";

// import { getEventById } from "@/dummy-data";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Comments from "../../components/input/comments";

function EventDetailPage(props) {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function loadFeaturedEvents() {
			await getFeaturedEvents();
			setIsLoading(false);
		}
		loadFeaturedEvents();
	}, [props]);

	// const router = useRouter();

	// const eventId = router.query.eventId;
	// const event = getEventById(eventId);

	if (isLoading)
		return (
			<div className="center">
				<p>Loading...</p>
			</div>
		);
	if (!props.event)
		return (
			<ErrorAlert>
				<p>No event found!</p>
			</ErrorAlert>
		);

	return (
		<>
			<Head>
				<title>{props.event.title}</title>
				<meta name="description" content={props.event.description} />
			</Head>
			<EventSummary title={props.event.title} />
			<EventLogistics
				date={props.event.date}
				address={props.event.location}
				image={props.event.image}
				imageAlt={`${props.event.imageAlt} img`}
			/>
			<EventContent>
				<p>{props.event.description}</p>
			</EventContent>
			<Comments eventId={props.event.id} />
		</>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);

	return {
		props: {
			event,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	const paths = events.map((e) => ({ params: { eventId: e.id } }));
	return {
		paths,
		fallback: true,
	};
}

export default EventDetailPage;
