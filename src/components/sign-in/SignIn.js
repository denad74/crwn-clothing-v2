import {useState} from "react";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";

import "./SignIn.scss";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

const defaultFormFilelds = {
	email: "",
	password: ""
};
const SignIn = () => {
	const [formFields, setFormFields] = useState(defaultFormFilelds);
	const {email, password} = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFilelds);
	};

	const signInWithGoogle = async () => {
		const {user} = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	const handleSubmit = async (evrnt) => {
		evrnt.preventDefault();

		try {
			const response = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);

			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("incorect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const {name, value} = event.target;

		setFormFields({...formFields, [name]: value});
	};

	return (
		<div className="sign-up-container">
			<h2>Already have account?</h2>
			<span>Sign ip with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
