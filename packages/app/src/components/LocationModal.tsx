import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InventoryContext } from "../context";
import LocationInputs from "./LocationInputs";

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

type locationObject = {
  a: string; // Almacen
  p: string; // Piso
  h: string; // Pasillo
  t: string; // Tramo
  b: string; // Bandeja
};

const mapLocationValue = (location: locationObject) =>
  "A" +
  location.a.padStart(2, "0") +
  "P" +
  location.p.padStart(2, "0") +
  "H" +
  location.h.padStart(2, "0") +
  "T" +
  location.t.padStart(2, "0") +
  "B" +
  location.b.padStart(2, "0");

const LocationModal: React.FC = () => {
  const { setState } = useContext(InventoryContext);
  const [location, setLocation] = useState<locationObject>({
    a: "00",
    p: "00",
    h: "00",
    t: "00",
    b: "00",
  });
  // setState((state)=> {...state, currentLocation: ""})

  const hideModal = () => {
    //
  };

  const handleChange: ChangeEventHandler<FormControlElement> = (event) => {
    event.target.value = event.target.value.replace(/[^\d]/, "");
    if (event.target.value.length > 2)
      event.target.value = event.target.value.substring(0, 2);

    setLocation({ ...location, [event.target.name]: event.target.value });
    // console.log(event.target.value);
  };

  const onSave: MouseEventHandler<HTMLElement> = (event) => {
    const locationValue = mapLocationValue(location);
    setState &&
      setState((state) => ({ ...state, currentLocation: locationValue }));
  };

  return (
    <Modal show={true} onHide={hideModal} size="xl">
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Ubicación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-2">
            <InputGroup.Text>Ubicación</InputGroup.Text>
            <InputGroup.Text>A</InputGroup.Text>
            <FormControl
              name="a"
              onInput={handleChange}
              pattern="[0-9]+"
              maxLength={2}
              type="number"
              placeholder="Almacen"
              area-label="Almacen"
            />
            <InputGroup.Text>P</InputGroup.Text>
            <FormControl
              name="p"
              type="number"
              onInput={handleChange}
              pattern="[0-9]+"
              maxLength={2}
              placeholder="Piso"
              area-label="Piso"
            />
            <InputGroup.Text>H</InputGroup.Text>
            <FormControl
              onInput={handleChange}
              type="number"
              pattern="[0-9]+"
              maxLength={2}
              placeholder="Pasillo"
              area-label="Pasillo"
              name="h"
            />
            <InputGroup.Text>T</InputGroup.Text>
            <FormControl
              name="t"
              type="number"
              onInput={handleChange}
              pattern="[0-9]+"
              maxLength={2}
              placeholder="Tramo"
              area-label="Tramo"
            />
            <InputGroup.Text>B</InputGroup.Text>
            <FormControl
              name="b"
              type="number"
              onInput={handleChange}
              pattern="[0-9]+"
              maxLength={2}
              placeholder="Bandeja"
              area-label="Bandeja"
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Atrás</Button>
          <Button variant="primary" onClick={onSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default LocationModal;
