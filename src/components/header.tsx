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
import { authClient } from "#/lib/auth-client";

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
				<div className="h-10 w-40 animate-pulse rounded-md bg-muted/50" />
			) : session?.user ? (
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button size="lg" className="py-6">
								<Avatar>
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
				<div className="flex items-center gap-2">
					<Link
						to="/app/auth"
						className={buttonVariants({ size: "lg", variant: "outline" })}
					>
						Iniciar sesión / Registrarse
					</Link>
				</div>
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

export function Header() {
	return (
		<header className="flex items-center justify-between p-4 bg-accent/85 backdrop-blur-lg text-accent-foreground sticky top-0 left-0 right-0 z-50 ">
			<HeaderLogo />
			<UserDropdown />
		</header>
	);
}
