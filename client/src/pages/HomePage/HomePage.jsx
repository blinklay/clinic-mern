import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { createRequest } from "../../redux/actions/createRequest";

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const isCreating = useSelector((state) => state.requests.isCreating);
  const serverErrors = useSelector((state) => state.requests.errors);
  const successMessage = useSelector((state) => state.requests.successMessage);
  const onSubmit = (data) => {
    dispatch(createRequest(data));
  };

  return (
    <>
      {serverErrors.validationsError.map((err) => (
        <Alert key={err.value} variant="danger">
          {serverErrors.msg}: {err.msg}
        </Alert>
      ))}

      {successMessage && (
        <Alert variant="success">{successMessage.message}</Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Текст обращения:</Form.Label>
          <Form.Control disabled={isCreating} as="textarea" rows={3} />
        </Form.Group>

        <Button disabled={isCreating} variant="primary" type="submit">
          {isCreating ? "Загрузка..." : "Отправить"}
        </Button>
      </Form>
    </>
  );
}
