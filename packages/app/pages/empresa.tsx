import { toErrorMap } from "../src/utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../src/utils/createUrqlClient";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLoginCompanyMutation } from "../src/generated/graphql";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useFormik } from "formik";
import { useIsAuth } from "../src/utils/useIsAuth";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  useIsAuth();
  const router = useRouter();
  const [{ fetching }, login] = useLoginCompanyMutation();
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: { name: "" },
    onSubmit: async (values, { setErrors }) => {
      const response = await login(values);
      if (response?.data?.loginCompany.errors) {
        return setErrors(toErrorMap(response?.data?.loginCompany.errors));
      } else {
        router.replace("/inventario");
      }
    },
  });

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            placeholder="Nombre"
            value={values.name}
            type="select"
            required
            className={classNames({
              "border-danger": errors.name,
              "text-danger": errors.name,
            })}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={fetching}>
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Register);
