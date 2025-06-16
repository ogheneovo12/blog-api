import { useGetUserProfileQuery } from "@/lib/redux/services/auth.api.service";
import { logout } from "@/lib/redux/slices/auth.slice";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "./ui/skeleton";

function ProtectedPage() {
  useGetUserProfileQuery();
  const token = useSelector((state) => state.auth.accessToken);
  const dispacth = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!token) {
      dispacth(logout());
    }
    setIsMounted(true);
  }, [dispacth, token]);

  if (!isMounted)
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ProtectedPage;
