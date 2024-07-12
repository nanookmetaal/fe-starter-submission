import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FeatureCollection } from "geojson";

interface NavBarProps {
  locations: Map<string, FeatureCollection>;
  onLocationClick: (id: string, location: FeatureCollection) => void;
}

function NavBar({ locations, onLocationClick }: NavBarProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <style type="text/css">
        {`
          .btn-primary {
            background-color: rgb(35 55 75 / 90%);
            color: white;
          }

          .btn-sm {
            font-size: 1.5rem;
            max-width: 20rem;
            align-self: center;
          }
      `}
      </style>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Saved Locations
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Saved Locations</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
        <div className="d-flex flex-column">
        {Array.from(locations.entries()).map(([locationKey, locationValue], index) => (
            <Button
              key={index}
              variant="secondary"
              className="mb-2"
              onClick={() => onLocationClick(locationKey, locationValue)}
            >
              {locationKey}
            </Button>
          ))}
        </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavBar;
