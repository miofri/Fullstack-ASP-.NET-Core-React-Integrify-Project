import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../store/hooks";

export const OrderPage = () => {
  const useId = useSelector((state: RootState) => state.user.id);
  const dispatch = useAppDispatch();

  return <div>OrderSection</div>;
};
