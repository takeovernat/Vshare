import React from "react";
import Card from "react-bootstrap/Card";

const MyAssets = ({ allAssets }) => {
  return (
    <div style={{ marginTop: 110 }}>
      <h3 className="h3">Assets list</h3>
      <p>&nbsp;</p>
      {console.log("all-> ", allAssets)}

      {allAssets.map((item, index) => (
        <>
          <Card key={item} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
            />
            <Card.Body>
              <Card.Title>Asset #{index + 1}</Card.Title>
              <Card.Text className="pp">
                Asset type: {JSON.stringify(item.Atype).slice(11, 13)}
              </Card.Text>

              <a
                className="link"
                href={`https://ipfs.infura.io/ipfs/${item.hash}`}
              >
                Link
              </a>
            </Card.Body>
          </Card>
          <p>&nbsp;</p>
        </>
      ))}
    </div>
  );
};

export default MyAssets;
