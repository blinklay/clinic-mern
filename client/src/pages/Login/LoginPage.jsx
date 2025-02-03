import { Alert, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { fadeIn } from "../../utils/animation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/login";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  errorsSelector,
  isLoginingSelector,
  successMessageSelector,
} from "../../redux/selectors/loginSelector";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(login(data));
  };
  const formRef = useRef(null);
  const serverErrors = useSelector(errorsSelector);
  const successMessage = useSelector(successMessageSelector);
  const isLogining = useSelector(isLoginingSelector);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();

      const timerRedirect = setTimeout(() => {
        navigate("/requests");
      }, 1000);

      return () => clearTimeout(timerRedirect);
    }
  }, [successMessage]);

  return (
    <>
      <p className="h1">Авторизация: </p>

      {serverErrors.status === 500 && (
        <motion.div {...fadeIn}>
          <Alert variant="danger">{serverErrors.msg}</Alert>
        </motion.div>
      )}

      {serverErrors.validationErrors.length === 0 &&
        serverErrors.status >= 400 &&
        serverErrors.status < 500 && (
          <motion.div {...fadeIn}>
            <Alert variant="danger">{serverErrors.msg}</Alert>
          </motion.div>
        )}

      {serverErrors.validationErrors.map((err) => (
        <motion.div key={err.value}>
          <Alert variant="danger">{err.msg}</Alert>
        </motion.div>
      ))}

      {successMessage && (
        <motion.div {...fadeIn}>
          <Alert variant="success">{successMessage.message}</Alert>
        </motion.div>
      )}

      <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="login">
          <Form.Label>Логин:</Form.Label>
          <Form.Control
            disabled={isLogining}
            type="text"
            placeholder="example@email.org"
            name="login"
            {...register("login", {
              required: "Это обязательное поле!",
            })}
          />
        </Form.Group>
        {errors.login && (
          <motion.div {...fadeIn}>
            <Alert variant="danger">{errors.login.message}</Alert>
          </motion.div>
        )}
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Пароль:</Form.Label>
          <Form.Control
            disabled={isLogining}
            type="password"
            placeholder="*******"
            name="password"
            {...register("password", {
              required: "Это обязательное поле!",
            })}
          />
        </Form.Group>
        {errors.password && (
          <motion.div {...fadeIn}>
            <Alert variant="danger">{errors.password.message}</Alert>
          </motion.div>
        )}
        <Button disabled={isLogining} variant="primary" type="submit">
          {isLogining ? "Загрузка..." : "Войти"}
        </Button>
      </Form>
    </>
  );
}
