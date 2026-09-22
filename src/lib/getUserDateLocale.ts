import type { Locale } from "date-fns";
import { ca, enUS, es } from "date-fns/locale";
import { getLocale } from "#/paraglide/runtime";

export function getUserDateLocale(): Locale {
	const userLocale = getLocale();

	switch (userLocale) {
		case "ca": {
			return ca;
		}
		case "es": {
			return es;
		}
		case "en":
			return enUS;
		default: {
			throw new Error(`Unsupported locale: ${userLocale}`);
		}
	}
}
