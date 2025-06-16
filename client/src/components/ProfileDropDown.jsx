import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/lib/redux/slices/auth.slice";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  toggleShowLoginForm,
  toggleShowRegisterationForm,
} from "../lib/redux/slices/layout.slice";

export function UserAvatarDropdown() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const { first_name = " ", last_name = " ", email = "" } = user || {};

  if (!token) {
    return (
      <div className="space-x-4">
        <Button onClick={() => dispatch(toggleShowLoginForm())}>Sign In</Button>
        <Button
          onClick={() => dispatch(toggleShowRegisterationForm())}
          variant={"outline"}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={`https://robohash.org/${email}`} />
          <AvatarFallback>
            {first_name?.[0]} {last_name[0]}{" "}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <p>
            {first_name} {last_name}
          </p>
          <p className="italic">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/app/settings">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch(logout())}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
