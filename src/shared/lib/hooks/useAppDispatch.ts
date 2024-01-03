import { AppDispatch } from "@/app/appStore";
import { useDispatch } from "react-redux";

export const useAppDispatch = useDispatch<AppDispatch>