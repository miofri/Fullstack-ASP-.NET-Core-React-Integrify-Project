import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { RootState, store } from "../../store/store";
import { Products } from "../../interface/Products";
import { cartSlice } from "../../store/slices/cartSlice";
import { useSelector } from "react-redux";
import { mainTheme } from "../../theme";
import { Cart } from "../../interface/Cart";
import { createOrderThunk } from "../../store/thunks/orderThunks/CreateOrderThunk";
import { useNavigate } from "react-router-dom";
import { orderDetailsThunk } from "../../store/thunks/orderThunks/OrderDetailsThunk";
import { useAppDispatch } from "../../store/hooks";
import { orderProductThunk } from "../../store/thunks/orderThunks/OrderProductsThunk";
import { orderProductSlice } from "../../store/slices/orderProduct";

//Copy pasted style from MUI just to make sure modal is working
const style = {
  position: "absolute" as "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  borderRadius: "2rem",
};

export const CartModal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const bearerToken = useSelector((state: RootState) => state.auth.bearerToken);
  const userId = useSelector((state: RootState) => state.user.id);
  const orderInfo = useSelector((state: RootState) => state.orders.orderArray);

  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState<Cart[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cartFromStore = useSelector((state: RootState) => state.cart.cartItems);

  const handleCartItemDelete = (data: Products) => {
    store.dispatch(cartSlice.actions.deleteProduct(data));
  };
  const handleAddItem = (data: Products) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };
  const handleReduceQuantity = (data: Products) => {
    const item = cartFromStore.find(
      (cartData) => cartData.product.id === data.id
    );
    if (item && item.quantity > 1) {
      store.dispatch(cartSlice.actions.reduceQuantity(data));
    } else {
      store.dispatch(cartSlice.actions.deleteProduct(data));
    }
  };

  const handlePurchase = async (data: any) => {
    data = data.concat(bearerToken);

    const postOrder = await dispatch(createOrderThunk(data));

    store.dispatch(orderProductSlice.actions.emptyProduct());
    store.dispatch(cartSlice.actions.emptyCart());

    const getOrder = await dispatch(orderDetailsThunk(userId));

    const updateOrderProducts = await dispatch(
      orderProductThunk(getOrder.payload)
    );
  };

  useEffect(() => {
    const allPrices = cartFromStore.map(
      (data) => data.product.price * data.quantity
    );
    const initialValue = 0;
    const total = allPrices.reduce(
      (acc, currVal) => acc + currVal,
      initialValue
    );
    setTotalPrice(total);
    setCart(cartFromStore);
  }, [cartFromStore]);

  return (
    <Container>
      <Tooltip title="Cart" onClick={handleOpen}>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        {cart.length < 1 ? (
          <Box sx={style}> Cart is empty</Box>
        ) : (
          <Box sx={style}>
            {cartFromStore.map((data) => (
              <Box key={data.product.id} sx={{ marginTop: "10px" }}>
                <Typography component="div" variant="h5">
                  {data.product.name}
                </Typography>
                <Typography component="div" variant="subtitle2">
                  {data.product.price}€
                </Typography>
                <Typography component="div" variant="body1">
                  {data.product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => handleCartItemDelete(data.product)}
                    variant="outlined"
                    sx={{ my: "1rem" }}
                  >
                    Delete Item
                  </Button>
                  <Box>
                    <Button
                      variant="text"
                      onClick={() => handleAddItem(data.product)}
                    >
                      +
                    </Button>
                    {data.quantity}
                    <Button
                      variant="text"
                      onClick={() => handleReduceQuantity(data.product)}
                    >
                      -
                    </Button>
                  </Box>
                </Box>
                <Divider variant="middle" />
              </Box>
            ))}
            <Box
              sx={{
                backgroundColor: mainTheme.palette.divider,
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>Total: {totalPrice.toFixed(2)}€</Box>
              <Box>
                <Button
                  onClick={() => handlePurchase(cartFromStore)}
                  variant="contained"
                >
                  Purchase
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Modal>
    </Container>
  );
};
