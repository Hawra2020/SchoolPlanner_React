import { Link } from 'react-router-dom';
import { useSlots } from '../utils';

function Row({ slot, slotWiseActivities, room }) {
	const slots = useSlots();

	const cells = [];

	for (let i = 0; i < 5; i++) {
		cells.push(
			<td key={i}>
				<Link
					to={`/update/${i}/${slot}/${room}/new`}
					className="d-inline-block w-100"
					style={{ height: 16 }}
				>
					<p className="pt-2" >&nbsp;</p>
				</Link>
			</td>
		);
	}

	return (
		<tr>
			<td key="link" className="text-center">
				{slots[slot - 1]}
			</td>
			{slotWiseActivities[slot].forEach(({ day, group, room }) => {
				cells[day] = (
					<td
						key={Math.random() * Date.now()}
						className="text-center"
					>
						<Link
							to={`/update/${day}/${slot}/${room}/${group}`}
							className="text-dark text-decoration-none"
						>
							<p style={{height: "100% !important"}} className="pt-3" >
								{group}
							</p>
						</Link>
					</td>
				);
			})}
			{cells}
		</tr>
	);
}

export default Row;
