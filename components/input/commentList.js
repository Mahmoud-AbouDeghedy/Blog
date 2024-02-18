import classes from "./commentList.module.css";

function CommentList({ comments }) {
	return (
		<ul className={classes.comments}>
			{/* Render list of comments - fetched from API */}
			{comments.map((comment) => (
				<li key={comment._id}>
					<p>{comment.comment}</p>
					<div>
						By <address>{comment.name}</address>
					</div>
				</li>
			))}
		</ul>
	);
}

export default CommentList;
