import React from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const Requests = ({ requests }) => {
  if (requests.length == 0) {
    return <div className="norequests">No requests to show</div>;
  }

  return (
    <div>
      <h2>Requests</h2>
      <p>&nbsp;</p>
      {console.log("all-> ", requests)}

      {requests.map((item, index) => (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
            />
            <Card.Body>
              <Card.Title>Request #{index + 1}</Card.Title>
              <Card.Text>
                Asset type: {JSON.stringify(item).slice(11, 13)}
              </Card.Text>
              <Button variant="primary">
                <a href={`https://ipfs.infura.io/ipfs/${item.hash}`}></a> Link
              </Button>
            </Card.Body>
          </Card>
          <p>&nbsp;</p>
        </>
      ))}
    </div>
  );
};

export default Requests;
