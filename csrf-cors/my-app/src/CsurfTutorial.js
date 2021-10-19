import React, { useEffect, useState } from 'react';

export default function CsurfTutorial() {
  const domainUrl = 'http://localhost:5000';
  const [csrfToken, setCsrfTokenState] = useState('');
  const [haveWeReceivedPostResponseState, setHaveWeReceivedPostResponseState] = useState('not yet');

  async function getCallToForm() {
    const url = '/form';
    let fetchGetResponse = await fetch(`${domainUrl}${url}`,
    {
      method:'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      credentials: "include",
      mode: "cors"
    })
    let parsedResponse = await fetchGetResponse.json();
    setCsrfTokenState(parsedResponse.csrfToken)
  }

  useEffect(() => {
    getCallToForm();
  }, [])
  async function testCsurfPostClick() {
    const url = '/process';
    try {
      let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'xsrf-token': csrfToken
        },
        credentials: 'include',
        mode: 'cors'
      });
      let parsedResponse = await fetchPostResponse.text();
      setHaveWeReceivedPostResponseState(parsedResponse);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={testCsurfPostClick}>Test Post Call to Server</button>
      <p>
        csrf Token is: {csrfToken}
      </p>
      <p>
        Have we successfully navigated though post request?: {haveWeReceivedPostResponseState}
      </p>
    </div>
  );
}
