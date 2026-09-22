import type { User } from "better-auth";
import type { ApiError, ApiSuccess } from "#/interfaces/api";

export const authenticatedUser: ApiSuccess<{ user: User }> = {
	success: true as const,
	data: {
		user: {
			id: "user-1",
			createdAt: new Date(),
			email: "user@example.com",
			emailVerified: true,
			name: "John Doe",
			updatedAt: new Date(),
		},
	},
};

export const unauthenticatedUser: ApiError = {
	success: false as const,
	type: "auth",
	message: "User is not authenticated",
};
