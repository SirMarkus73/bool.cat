import { Link, useNavigate } from "@tanstack/react-router";
import {
	BadgeCheckIcon,
	ChevronDownIcon,
	ListIcon,
	LogOutIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button, buttonVariants } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Skeleton } from "#/components/ui/skeleton";
import { authClient } from "#/features/auth/lib/auth-client";
import { m } from "#/paraglide/messages";
import { getLocale, isLocale, locales, setLocale } from "#/paraglide/runtime";

function UserDropdown() {
	const navigate = useNavigate();

	const { data: session, isPending } = authClient.useSession();
	const userName =
		session?.user.name?.trim() ||
		session?.user.email?.split("@")[0] ||
		"Usuario";
	const userInitial = userName.charAt(0).toUpperCase();

	return (
		<div className="flex items-center justify-self-end gap-3">
			{isPending ? (
				<Skeleton className="h-8 w-40" />
			) : session?.user ? (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button>
								<Avatar size="sm">
									<AvatarImage
										src={session.user.image ?? undefined}
										alt={userName}
									/>
									<AvatarFallback>{userInitial}</AvatarFallback>
								</Avatar>
								<span>{userName}</span>
								<ChevronDownIcon />
							</Button>
						}
					/>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuItem render={<Link to="/app" />}>
								<ListIcon />
								Panel de control
							</DropdownMenuItem>
							<DropdownMenuItem render={<Link to="/app" />}>
								<BadgeCheckIcon />
								Cuenta
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								authClient.signOut();
								navigate({ to: "/" });
							}}
						>
							<LogOutIcon />
							Cerrar sesión
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Link to="/app/auth" className={buttonVariants({ variant: "outline" })}>
					{m["forms.auth.login"]()}
				</Link>
			)}
		</div>
	);
}

function HeaderLogo() {
	return (
		<div className="flex items-center gap-2">
			<Link to="/app" className="text-2xl font-bold">
				bool.cat
			</Link>
		</div>
	);
}

function getLanguageLabel(locale: string) {
	const label = new Intl.DisplayNames([locale], {
		type: "language",
	}).of(locale);

	if (!label) {
		return locale;
	}

	return label.charAt(0).toLocaleUpperCase(locale) + label.slice(1);
}

function LocaleSwitcher() {
	const items = locales.map((locale) => ({
		label: getLanguageLabel(locale),
		value: locale,
	}));
	const currentLocale = getLocale();

	return (
		<Select
			defaultValue={currentLocale}
			onValueChange={(value) => {
				if (!isLocale(value)) return;
				setLocale(value);
			}}
		>
			<SelectTrigger className="w-45">
				<SelectValue placeholder={m["settings.lang"]()}>
					{getLanguageLabel(currentLocale)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{items.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export function Header() {
	return (
		<header className="flex flex-col lg:flex-row items-center justify-between p-4 bg-accent/85 backdrop-blur-lg text-accent-foreground sticky top-0 left-0 right-0 z-50 ">
			<HeaderLogo />
			<div className="flex gap-1 items-center">
				<LocaleSwitcher />
				<UserDropdown />
			</div>
		</header>
	);
}
