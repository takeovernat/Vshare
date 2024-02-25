import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Add = ({ onSubmit, captureFile, handleType }) => {
  return (
    <div className="container">
      <p>&nbsp;</p>
      <h3 className="h3">Asset types</h3>
      <ul>
        <li>1. word documents</li>
        <li>2. images and gifs</li>
        <li>3. videos</li>
      </ul>
      <h3 className="h3">Add Assets! </h3>
      <p>&nbsp;</p>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>choose file to upload to IPFS</Form.Label>
          <Form.Control type="file" onChange={captureFile} />
        </Form.Group>

        <Form.Control
          width="2"
          as="select"
          aria-label="Default select example"
          onChange={handleType}
        >
          <option>Asset Type</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Control>
        <p>&nbsp;</p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Add;
