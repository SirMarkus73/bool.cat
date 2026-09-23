export const themes = ["light", "dark", "system"] as const;

export type Theme = (typeof themes)[number];

export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function isTheme(value: unknown): value is Theme {
	return themes.includes(value as Theme);
}

export function getStoredTheme(): Theme {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		return isTheme(stored) ? stored : "system";
	} catch {
		return "system";
	}
}

export function applyTheme(theme: Theme) {
	const isDark =
		theme === "dark" ||
		(theme === "system" && window.matchMedia(DARK_QUERY).matches);
	const root = document.documentElement;
	root.classList.toggle("dark", isDark);
	root.style.colorScheme = isDark ? "dark" : "light";
}

export function setTheme(theme: Theme) {
	try {
		if (theme === "system") {
			localStorage.removeItem(THEME_STORAGE_KEY);
		} else {
			localStorage.setItem(THEME_STORAGE_KEY, theme);
		}
	} catch {
		// storage unavailable: the choice still applies to this page view
	}
	applyTheme(theme);
}

// Runs before hydration so the first paint already uses the right theme.
// It stays subscribed to OS changes (for "system") and to other tabs.
export const themeScript = `(function () {
	var key = ${JSON.stringify(THEME_STORAGE_KEY)};
	var media = window.matchMedia(${JSON.stringify(DARK_QUERY)});
	function apply() {
		var theme = null;
		try { theme = localStorage.getItem(key); } catch (e) {}
		var isDark = theme === "dark" || (theme !== "light" && media.matches);
		var root = document.documentElement;
		root.classList.toggle("dark", isDark);
		root.style.colorScheme = isDark ? "dark" : "light";
	}
	apply();
	media.addEventListener("change", apply);
	window.addEventListener("storage", function (event) {
		if (event.key === key) apply();
	});
})();`;
