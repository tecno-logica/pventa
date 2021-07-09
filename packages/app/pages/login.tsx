import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useLoginMutation } from "../src/generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import { toErrorMap } from "../src/utils/toErrorMap";
import { useRouter } from "next/router";
import classNames from "classnames";

const Login: React.FC = () => {
  const router = useRouter();
  const [{ fetching }, login] = useLoginMutation();
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: { cedula: "", password: "" },
    onSubmit: async (values, { setErrors }) => {
      const response = await login(values);
      if (response?.data?.login.errors) {
        return setErrors(toErrorMap(response?.data?.login.errors));
      } else {
        router.replace("/inventario");
      }
    },
  });

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Cedula</Form.Label>
          <Form.Control
            name="cedula"
            onChange={handleChange}
            placeholder="Cédula"
            value={values.cedula}
            required
            className={classNames({
              "border-danger": errors.cedula,
              "text-danger": errors.cedula,
            })}
          />
          {errors.cedula && (
            <small className="text-danger">{errors.cedula}</small>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Contraseña"
            value={values.password}
            required
            className={classNames({
              "border-danger": errors.password,
              "text-danger": errors.password,
            })}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={fetching}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(Login);
