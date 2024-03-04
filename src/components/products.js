import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBRow,
  MDBCol,
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
import { addToCart } from "../redux/productSlice";

export default function Products() {
  const [openNav, setOpenNav] = useState(false);
  const { allProducts, cart } = useSelector((state) => state.product);
  const dispatch = useDispatch();

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
                <MDBNavbarLink active aria-current="page" href="#">
                  All Products
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to="/cart">
                  <MDBNavbarLink active aria-current="page" href="#">
                    CART({cart.length})
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <MDBRow className="container my-5">
        {allProducts.map((value) => (
          <MDBCol key={value.id}>
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image hover-overlay"
              >
                <MDBCardImage src={value.img} fluid alt="..." />
                <a>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>{value.title}</MDBCardTitle>
                <MDBCardText>{value.price}</MDBCardText>
                <MDBBtn href="#" onClick={() => dispatch(addToCart(value))}>
                  ADD TO CART
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </>
  );
}
