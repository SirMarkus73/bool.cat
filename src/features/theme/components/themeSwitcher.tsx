import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	getStoredTheme,
	isTheme,
	setTheme,
	type Theme,
} from "#/features/theme/lib/theme";
import { m } from "#/paraglide/messages";

export function ThemeSwitcher() {
	// the server can't read localStorage, so start at "system" and sync on mount
	const [theme, setThemeState] = useState<Theme>("system");

	useEffect(() => {
		setThemeState(getStoredTheme());
	}, []);

	const options = [
		{ value: "light", label: m["settings.theme_light"](), Icon: SunIcon },
		{ value: "dark", label: m["settings.theme_dark"](), Icon: MoonIcon },
		{ value: "system", label: m["settings.theme_system"](), Icon: MonitorIcon },
	] as const;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="icon-lg"
						aria-label={m["settings.theme"]()}
						title={m["settings.theme"]()}
					>
						<SunIcon className="dark:hidden" />
						<MoonIcon className="hidden dark:block" />
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={(value) => {
						if (!isTheme(value)) return;
						setThemeState(value);
						setTheme(value);
					}}
				>
					{options.map(({ value, label, Icon }) => (
						<DropdownMenuRadioItem key={value} value={value}>
							<Icon />
							{label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
