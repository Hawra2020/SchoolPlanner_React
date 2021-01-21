import React from 'react';

function UpdateSelector({ value, onChange, list, label }) {
	return (
		<div className="form-group row">
			<label
				htmlFor={label.toLowerCase()}
				className="col-sm-2 col-form-label pl-0"
			>
				{label}
			</label>
			<div className="col-sm-10 pr-0">
				<select
					name={label.toLowerCase()}
					id={label.toLowerCase()}
					className="form-control"
					value={value}
					onChange={onChange}
				>
					<option value="" disabled>
						Please select a value
					</option>
					{list.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}

export default UpdateSelector;
