export type ApiError =
	| {
			success: false;
			type: "auth";
			message: string;
	  }
	| {
			success: false;
			type: "server";
			message: string;
	  };

export type ApiSuccess<T> = {
	success: true;
	data: T;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
