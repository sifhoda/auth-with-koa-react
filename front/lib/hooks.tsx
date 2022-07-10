import { useState } from "react";
import store from "../store";
import { Citoyen } from "../store/reducer";

export const useToken = () => {
	const getToken = () => {
		const state = store.getState();
		return state.token;
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (citoyen: Citoyen) => {
		store.dispatch({ type: "ADD_CITOYEN_ACTION", payload: citoyen });
		console.log(store.getState());
		setToken(citoyen.token);
	};

	return { token, setToken: saveToken };
};
