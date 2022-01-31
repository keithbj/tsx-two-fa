import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import mockAPI from "api";
import SmsTelNumbers from "./SmsTelNumbers";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders SMS tel numbers", async () => {
  const phoneNumbers = [
    {
      id: 1,
      type: "mobile",
      number: "07786767111"
    },
    {
      id: 2,
      type: "mobile",
      number: "07786777222"
    },
    {
      id: 3,
      type: "mobile",
      number: "07787788333"
    }
  ];

  // jest.spyOn(global, "API.get").mockImplementation(() =>
  //   Promise.resolve({
  //     json: () => Promise.resolve(phoneNumbers)
  //   })
  // );

  mockAPI.get(() =>
    Promise.resolve({
      data: { results: phoneNumbers }
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<SmsTelNumbers />, container);
  });

  expect(container.querySelector("Radio"));

  // Remove the mock to ensure tests are completely isolated
  // global.fetch.mockRestore();
});
