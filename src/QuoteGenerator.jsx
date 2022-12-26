import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const QuoteGenerator = () => {

  const [data, setData] = useState(null);
  
    async function updateQuote() {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const { statusCode, statusMessage, ...data } = await response.json();
        if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
        setData(data);
      } catch (error) {
        // If the API request failed, log the error to console and update state
        // so that the error will be reflected in the UI.
        console.error(error);
        setData({ content: "Opps... Something went wrong" });
      }
    }
  
    // Run `updateQuote` once when component mounts
    useEffect(() => {
      updateQuote();
    }, []);
  
    // Do not render until the first quote is loaded
    if (!data) return null;

  return (
    <Card style={{ width: "90%", maxWidth: "40rem" }} id="quote-box" className="text-bg-danger">
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p id="text">{data.content}</p>
            {data.author && (
              <footer className="blockquote-footer">
                <cite title="Source Title" id="author">{data.author}</cite>
              </footer>
            )}
          </blockquote>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={updateQuote} id="new-quote">
            New Quote
          </Button>
          <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank">Tweet this quote</a>
        </Card.Footer>
      </Card>
  );
};

export default QuoteGenerator;
