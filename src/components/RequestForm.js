import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const RequestForm = ({
  sendRequest,
  assetId,
  handleAssetId,
  userId,
  handleUserId,
}) => {
  return (
    <div className="container">
      <p>&nbsp;</p>
      <h3 className="titles">Request Form</h3>
      <p>&nbsp;</p>

      <Form onSubmit={sendRequest}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Id of Asset</Form.Label>
          <Form.Control
            type="text"
            placeholder="i.e. '1' "
            value={assetId}
            onChange={handleAssetId}
          />
          <Form.Text className="text-muted">Enter a valid Id</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="i.e. '2'"
            value={userId}
            onChange={handleUserId}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RequestForm;
