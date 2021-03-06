import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Input from "../UI/Input/Input";
import styles from "./UserDetail.module.scss";
import { Row, Col } from "react-bootstrap";
import ToggleButton from "../ChangingPost/UI/ToggleButton/ToggleButton";
import { Button } from "@material-ui/core";
import Container from "../container/Container";
import Badge from "../Badge/Badge";
import { Redirect, useParams } from "react-router-dom";
import Loading from "../../../UI/Loading/Loading";
import { userActions } from "../../redux-store/change-user";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import useHttp from "../../hook/use-http";
import OverlayPortals from "../../Overlay/OverlayPortal";
import ReactDOM from "react-dom";
import {API_USER_DETAIL} from '../../api/api'
const UserDetail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const newPassword = useSelector((state) => state.user.newPassword);
  const params = useParams();
  const [isTouched, setIsTouched] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const {
    fetchingDataHandler,
    status: statusUploading,
    data: dataUploading,
  } = useHttp();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(userActions.loadingFetching());
        const response = await fetch(
          API_USER_DETAIL
        );
        if (!response.ok) {
          throw new Error("failed to fetch");
        }
        const dataUser = await response.json();
        dispatch(userActions.getInformation(dataUser));
      } catch (err) {
        dispatch(userActions.errorFetching());
      }
    };
    fetchUser();
  }, [params.username, dispatch]);
  const changeNameHandler = (event) => {
    dispatch(userActions.changeNameHandler(event.target.value));
  };
  const changePasswordHandler = (event) => {
    dispatch(userActions.newPasswordHandler(event.target.value));
  };
  const touchedPasswordHandler = () => {
    setIsTouched(true);
  };
  const nameIsTouchedHandler = () => {
    setNameIsTouched(true);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    fetchingDataHandler({
      url: "http://localhost:3001/api/update-user",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: {
        username: user.username,
        newPassword: newPassword,
        name: user.name,
        islocked: user.islocked,
      },
    });
    setIsTouched(false);
    setNameIsTouched(false);
  };
  let valid = false;
  if (
    user &&
    user.name.length > 0 &&
    newPassword &&
    newPassword.trim().length >= 8
  ) {
    valid = true;
  }
  return (
    <Layout title="Ch???nh S???a Ng?????i D??ng">
      {status === "pending" && <Loading className={styles.loading} />}
      {status === "error" && !user && <Redirect to="/404" />}
      {status === "success" && user && (
        <form onSubmit={submitHandler}>
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              <Container>
                <Input
                  className={styles.input}
                  label="Email"
                  input={{
                    type: "email",
                    required: true,
                    id: "email",
                    value: user.username,
                    readOnly: true,
                  }}
                />
                <Input
                  className={styles.input}
                  label="T??n ng?????i d??ng"
                  input={{
                    type: "text",
                    required: true,
                    id: "name",
                    max: "100",
                    value: user.name,
                    onChange: changeNameHandler,
                    onBlur: nameIsTouchedHandler,
                  }}
                />
                {nameIsTouched && user.name.trim().length <= 0 && (
                  <p className={styles.invalid}>T??n kh??ng ???????c ????? tr???ng</p>
                )}
                <Input
                  className={styles.input}
                  label="M???t kh???u m???i"
                  input={{
                    type: "password",
                    id: "password",
                    min: "8",
                    onChange: changePasswordHandler,
                    onBlur: touchedPasswordHandler,
                    placeholder:
                      "Nh???p m???t kh???u m???i (Nh???p m???t kh???u c?? n???u kh??ng thay ?????i)",
                  }}
                />
                {isTouched &&
                  (!newPassword || newPassword.trim().length < 8) && (
                    <p className={styles.invalid}>
                      M???t kh???u ph???i c?? ??t nh???t 8 k?? t???
                    </p>
                  )}
                {statusUploading === "error" && !dataUploading && (
                  <p style={{ textAlign: "center", color: "red" }}>
                    C?? l???i x???y ra, xin th??? l???i sau
                  </p>
                )}
              </Container>
            </Col>
            <Col className={styles.col} xs={12} sm={12} md={4} lg={4}>
              <Container>
                <p style={{ fontWeight: "bold" }}>Tr???ng th??i t??i kho???n</p>
                <div className={styles["row__lock"]}>
                  <ToggleButton
                    changeStatusHandler={() =>
                      dispatch(userActions.lockAccount())
                    }
                    isClicked={user.islocked}
                  />
                  <Badge isLocked={user.islocked} />
                </div>
                <Button
                  disabled={!valid}
                  className={`${styles["btn__submit"]} ${
                    !valid && styles["invalid-btn"]
                  }`}
                  variant="contained"
                  type="submit"
                >
                  X??c nh???n
                </Button>
              </Container>
            </Col>
          </Row>
          {statusUploading === "pending" && (
            <Loading className={styles["loading-upload"]} />
          )}
          {statusUploading === "completed" && dataUploading && (
            <>
              {ReactDOM.createPortal(
                <OverlayPortals />,
                document.getElementById("overlay")
              )}
              <Notification status={statusUploading} />
            </>
          )}
        </form>
      )}
    </Layout>
  );
};

export default UserDetail;
