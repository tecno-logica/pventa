import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { FocusEventHandler, useCallback } from "react";
import { ChangeEventHandler } from "react";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

const LocationInputs = () => {
  const handleChange: ChangeEventHandler<FormControlElement> = (event) => {
    event.target.value = event.target.value.replace(/[^\d]/, "");
    if (event.target.value.length > 2)
      event.target.value = event.target.value.substring(0, 2);
    console.log(event.target.value);
  };

  const handleBlur: FocusEventHandler<FormControlElement> = (event) => {
    event.target.value.padStart(2, "0");
  };

  return (
    <InputGroup className="mb-2">
      <InputGroup.Text>Ubicación</InputGroup.Text>
      <InputGroup.Text>A</InputGroup.Text>
      <FormControl
        onInput={handleChange}
        onBlur={handleBlur}
        pattern="[0-9]+"
        maxLength={2}
        type="number"
        placeholder="Almacen"
        area-label="Almacen"
      />
      <InputGroup.Text>P</InputGroup.Text>
      <FormControl
        onInput={handleChange}
        onBlur={handleBlur}
        pattern="[0-9]+"
        maxLength={2}
        placeholder="Piso"
        area-label="Piso"
      />
      <InputGroup.Text>H</InputGroup.Text>
      <FormControl
        onInput={handleChange}
        onBlur={handleBlur}
        pattern="[0-9]+"
        maxLength={2}
        placeholder="Pasillo"
        area-label="Pasillo"
      />
      <InputGroup.Text>T</InputGroup.Text>
      <FormControl type="number" placeholder="Tramo" area-label="Tramo" />
      <InputGroup.Text>B</InputGroup.Text>
      <FormControl
        onInput={handleChange}
        onBlur={handleBlur}
        pattern="[0-9]+"
        maxLength={2}
        placeholder="Bandeja"
        area-label="Bandeja"
      />
    </InputGroup>
  );
};

export default LocationInputs;
