import React from "react";
import { data } from "./data";

export const categories = [
  "Shape",
  "Carat",
  "Color",
  "Clarity",
  "Cut",
  "Polish",
  "Symmetry",
  "Fluorescent"
];

// Receives a category and returns all relevent filters
export const filetrsOfCategory = category => {
  let filters = [];
  data.forEach(diamond => {
    if (filters.indexOf(diamond[category]) === -1)
      filters.push(diamond[category]);
  });

  return filters;
};

 
// Receives two parameters: 
// 1. The active filters of every category. 
// 2. Action function that sets the popup image.(on image click)
// Filters all diamonds by the active filters and returns a table that includes diamonds passed through the filters.
export const createTable = (filters, enlargeImage) => {
  let diamonds = [];

  if (Object.keys(filters).length === 0)
    for (let i = 0; i < 100; i++)
      diamonds.push(data[Math.floor(Math.random() * data.length)]);
  else {
    diamonds = data
      .filter(diamond => {
        for (let key in filters) {
          if (filters[key].type === "dropdown")
            if (!filters[key].filters.includes(diamond[key])) return false;
          if (filters[key].type === "input") {
            if (filters[key].max === null || filters[key].min === null) {
              if (filters[key].max === null && diamond[key] < filters[key].min)
                return false;
              if (filters[key].min === null && diamond[key] > filters[key].max)
                return false;
            } else if (
              diamond[key] > filters[key].max ||
              diamond[key] < filters[key].min
            )
              return false;
          }
        }
        return true;
      })
      .slice(0, 100);
  }

  let headers = [];

  for (let key in data[0]) {
    if (key === "ImageLink") headers.push(<th>Image</th>);
    else headers.push(<th>{key}</th>);
  }

  let details = diamonds.map((diamond, index) => {
    const details = [];
    for (let key in diamond) {
      if (key === "CertificateLink") {
        if (diamond[key] === "")
          details.push(
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://diamanti.s3.amazonaws.com/certificates/3315547929.jpg"
              >
                <i className="material-icons certificateIcon">
                  insert_drive_file
                </i>
              </a>
            </td>
          );
        else
          details.push(
            <td>
              <a target="_blank" rel="noopener noreferrer" href={diamond[key]}>
                <i className="material-icons certificateIcon">
                  insert_drive_file
                </i>
              </a>
            </td>
          );
      } else if (key === "VideoLink") {
        if (diamond[key] === "")
          details.push(
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://diamanti.s3.amazonaws.com/video/Vision360.html?d=182309-771"
              >
                <i className="material-icons cameraIcon">videocam</i>
              </a>
            </td>
          );
        else
          details.push(
            <td>
              <a target="_blank" rel="noopener noreferrer" href={diamond[key]}>
                <i className="material-icons cameraIcon">videocam</i>
              </a>
            </td>
          );
      } else if (key === "ImageLink") {
        if (diamond[key] === "")
          details.push(
            <td>
              <img
                src="https://diamanti.s3.amazonaws.com/images/diamond/182159-611.jpg"
                alt="pic"
                className="diamondImage"
                onClick={() =>
                  enlargeImage(
                    "https://diamanti.s3.amazonaws.com/images/diamond/182159-611.jpg"
                  )
                }
              />
            </td>
          );
        else
          details.push(
            <td>
              <img
                src={diamond[key]}
                className="diamondImage"
                alt="pic"
                onClick={() => enlargeImage(diamond[key])}
              />
            </td>
          );
      } else details.push(<td>{diamond[key]}</td>);
    }

    return <tr>{details}</tr>;
  });

  if (details.length === 0) {
    return (<div>
      <table className="table">
        <tbody><tr>{[...headers]}</tr></tbody>
      </table>
      <div className='emptyTableCase'>No Results</div>
      </div>
    );
  }
  return (
    <table className="table">
      <tbody>{[<tr>{[...headers]}</tr>, ...details]}</tbody>
    </table>
  );
};

export const getTotalPriceAndDiamondCount = () => {
  const info = {
    numberOfDiamonds: data.length
  };

  info.totalPrice = data.reduce((acc, diamond) => {
    return acc + diamond["Total Price"];
  }, 0).toFixed(2);

  return info;
};
