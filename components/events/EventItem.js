import classes from "./EventItem.module.css";
import Image from "next/image";

import Button from "../ui/Button";
import DateIcon from "../icons/DateIcon";
import AddressIcon from "../icons/AddressIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

function EventItem({ event }) {
	const { id, title, location, date, image } = event;
	const exploreLink = `/events/${id}`;
	return (
		<li className={classes.item}>
			<Image src={"/" + image} alt={`${title} img`} width={250} height={160} />
			<div className={classes.content}>
				<div className={classes.summary}>
					<h2>{title}</h2>
					<div className={classes.date}>
						<DateIcon />
						<time>
							{new Date(date).toLocaleDateString("en-US", {
								day: "numeric",
								month: "numeric",
								year: "numeric",
							})}
						</time>
					</div>
					<div className={classes.address}>
						<AddressIcon />
						<address>{location.replace(", ", "\n")}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Button link={exploreLink}>
						<span>Explore Event</span>
						<span className={classes.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}

export default EventItem;
