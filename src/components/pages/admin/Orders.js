//rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
//function
import { getOrders } from "../../functions/users";
import { updateStatusOrder } from '../../functions/admin'
// notify
import { toast } from "react-toastify";

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  console.log(orders);

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token,orderId, orderstatus)
    .then(res=>{
      console.log(res.data)
      toast.info('Updated '+res.data.orderstatus+' Success')
      loadData();
    })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col text-center">
          {orders.map((item, index) => {
            return (
              <div key={index} className="card m-3">
                <p>Order {"   " + item.orderstatus}</p>
                {/* Select */}
                <select
                  value={item.orderstatus}
                  onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                  style={{ width: "200px", alignSelf: "center" }}
                  className="form form-control"
                >
                  <option value="Not Process">Not Process</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
                {/* Table */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Price</td>
                      <td>Count</td>
                    </tr>
                  </thead>
                  {/* 2 Loop Table */}
                  {item.products.map((p, i) => (
                    <tr>
                      <td>{p.product.title}</td>
                      <td>{p.price}</td>
                      <td>{p.count}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3}>
                      ราคาสุทธิ:{" "}
                      <b>
                        <u>{item.cartTotal}</u>
                      </b>
                    </td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
