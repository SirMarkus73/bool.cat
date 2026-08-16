export type ApiError =
	| {
			type: "auth";
			message: string;
			success: false;
	  }
	| {
			type: "server";
			message: string;
			success: false;
	  };

export type ApiResponse<T> = { success: true; data: T } | ApiError;
