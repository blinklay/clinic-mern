import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { createRequest } from "../../redux/actions/createRequest";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animation";
import { useEffect, useRef } from "react";
import {
  errorsSelector,
  isCreatingSelector,
  successMessageSelector,
} from "../../redux/selectors/requestsSelector";

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const isCreating = useSelector(isCreatingSelector);
  const serverErrors = useSelector(errorsSelector);
  const successMessage = useSelector(successMessageSelector);

  useEffect(() => {
    if (successMessage) {
      formRef.current.reset();
    }
  }, [successMessage]);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(createRequest(data));
  };

  return (
    <>
      <p className="h1">Создание заявки:</p>

      {serverErrors.status === 500 && (
        <Alert variant="danger">
          {serverErrors.msg} {serverErrors.status}
        </Alert>
      )}

      {serverErrors.validationsError.map((err) => (
        <motion.div key={err.value} {...fadeIn}>
          <Alert variant="danger">
            {serverErrors.msg}: {err.msg}
          </Alert>
        </motion.div>
      ))}

      {successMessage && (
        <motion.div {...fadeIn}>
          <Alert variant="success">{successMessage.message}</Alert>
        </motion.div>
      )}

      <Form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>ФИО:</Form.Label>
          <Form.Control
            disabled={isCreating}
            type="text"
            placeholder="Иванов Иван Иванович"
            name="fullName"
            {...register("fullName", {
              required: "Это обязательное поле!",
              minLength: {
                value: 3,
                message: "Минимальная длинна поля - 3 символа!",
              },
            })}
          />
        </Form.Group>
        {errors.fullName && (
          <Alert className="mb-3" variant="danger">
            {errors.fullName.message}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Телефон:</Form.Label>
          <Form.Control
            disabled={isCreating}
            type="tel"
            placeholder="+7 (000)-000-0000"
            name="phoneNumber"
            {...register("phoneNumber", {
              required: "Это обязательное поле!",
            })}
          />
        </Form.Group>
        {errors.phoneNumber && (
          <Alert className="mb-3" variant="danger">
            {errors.phoneNumber.message}
          </Alert>
        )}
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Текст обращения:</Form.Label>
          <Form.Control
            {...register("description")}
            disabled={isCreating}
            as="textarea"
            rows={3}
            name="description"
          />
        </Form.Group>

        <Button disabled={isCreating} variant="primary" type="submit">
          {isCreating ? "Загрузка..." : "Отправить"}
        </Button>
      </Form>
    </>
  );
}
