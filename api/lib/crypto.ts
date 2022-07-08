import * as bcrypt from "bcryptjs";

export const hash = (password: string) => {
	const salt = 10;
	const hashedPassword = bcrypt.hashSync(password, salt);
	return hashedPassword;
};

export const decrypt = (password: string, hash: string) => {
	return bcrypt.compareSync(password, hash);
};
