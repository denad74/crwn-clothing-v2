import SignIn from "../../components/sign-in/SignIn";
import SignUp from "../../components/sign-up/SignUp";
import "./Authentication.scss";
const Authentication = () => {
	return (
		<div className="authentication-container">
			<SignIn />
			<SignUp />
		</div>
	);
};

export default Authentication;
