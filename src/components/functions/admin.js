import axios from "axios";

export const updateStatusOrder = async (authtoken, orderId, orderstatus) =>
  await axios.put(
    process.env.REACT_APP_API + "/admin/order-status",
    { orderId, orderstatus },
    {
      headers: {
        authtoken,
      },
    }
  );
