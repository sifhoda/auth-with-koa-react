export type Citoyen = {
	id: number;
	nom: string;
	prenom: string;
	etablissement: string;
	token: string;
};

const initialState = {
	id: 0,
	nom: "",
	prenom: "",
	etablissement: "",
	token: "",
};

type Action = {
	type: string;
	payload: Citoyen;
};

const ADD_CITOYEN_ACTION = "ADD_CITOYEN_ACTION";

export default function CitoyenReducer(state = initialState, action: Action) {
	switch (action.type) {
		case ADD_CITOYEN_ACTION: {
			return { ...state, ...action.payload };
		}

		default:
			return state;
	}
}
