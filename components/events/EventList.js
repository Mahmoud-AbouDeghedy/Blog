import classes from "./EventList.module.css";
import EventItem from "./EventItem";

function EventList({ events }) {
	return (
		<ul className={classes.list}>
			{events.map((event) => (
				<EventItem event={event} key={event.id} />
			))}
		</ul>
	);
}

export default EventList;
