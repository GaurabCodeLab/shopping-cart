import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import {
  deleteProduct,
  incrementQuantity,
  decrementQuantity,
} from "../redux/productSlice";

function Cart() {
  const [openNav, setOpenNav] = useState(false);
  const [items, setItems] = useState(0);
  const [price, setPrice] = useState(0);
  let cart = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    setItems(totalItems());
    setPrice(totalPrice());
  }, [cart]);

  function totalItems() {
    if (cart.length === 0) {
      return 0;
    } else {
      return cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
      }, 0);
    }
  }

  function totalPrice() {
    if (cart.length === 0) {
      return 0;
    } else {
      return cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.price;
      }, 0);
    }
  }

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#" className="text-primary fs-4">
            Gaurab Shopping Mall
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNav(!openNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav className="d-flex justify-content-around">
              <MDBNavbarItem>
                <Link to="/">
                  <MDBNavbarLink active aria-current="page" href="#">
                    All Products
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="#">
                  CART({cart.length})
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cart.length} items</h5>
                </div>

                {cart.length ? (
                  cart.map((value, index) => (
                    <div className="card-body" key={index}>
                      <div className="row">
                        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div
                            className="bg-image hover-overlay hover-zoom ripple rounded"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={value.img}
                              className="w-100"
                              alt="Blue Jeans Jacket"
                            />
                            <a href="#!">
                              <div
                                className="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </div>
                        </div>

                        <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p>
                            <strong>{value.title}</strong>
                          </p>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-1 mb-2"
                            data-mdb-toggle="tooltip"
                            title="Remove item"
                            onClick={() => dispatch(deleteProduct(value.id))}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <div
                            className="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <button
                              className="btn btn-primary px-3 me-2"
                              onClick={() =>
                                dispatch(decrementQuantity(value.id))
                              }
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <div className="form-outline">
                              <input
                                id="form1"
                                name="quantity"
                                value={value.quantity}
                                type="number"
                                className="form-control border"
                                readOnly
                              />
                            </div>

                            <button
                              className="btn btn-primary px-3 ms-2"
                              onClick={() =>
                                dispatch(incrementQuantity(value.id))
                              }
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>

                          <p className="text-start text-md-center">
                            <strong>${value.price}</strong>
                          </p>
                        </div>
                      </div>
                      <hr/>
                    </div>
                  ))
                ) : (
                  <h3 className="mx-auto mt-4">Your Cart is Empty</h3>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{items}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${price}</strong>
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;