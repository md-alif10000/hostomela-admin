import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
	return (
		<Form.Group>
			{props.label && <Form.Label>{props.label}</Form.Label>}

			<Form.Control
				type={props.type}
				value={props.value}
				placeholder={props.placeholder}
				onChange={props.onChange}
        {...props}
			/>
		</Form.Group>
	);
}
