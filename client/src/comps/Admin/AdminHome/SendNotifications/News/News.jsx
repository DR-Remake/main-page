import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { postRequest } from "../../../../HelperFunctions/requests";
import { Toaster } from "../../../../HelperFunctions/toastify";

function News(props) {
  const { Username } = props?.adminsInfo[0];
  const { contactInputs, setContactInputs, goDown } = props;
  const {
    VITE_SERVER_PORT,
    VITE_ADMIN,
    VITE_ADMIN_POSTNOTIFICATION,
    VITE_ADMIN_POSTNEWS,
  } = import.meta.env;

  const handleSubmit = (e) => {
    e.preventDefault;
  };

  const handleInputs = (key, i, e) => {
    const copyContact = [...contactInputs];
    copyContact[i] = { ...copyContact[i], [key]: e.target.value };
    setContactInputs(copyContact);
  };

  const handleQuillChange = (index, content) => {
    const updatedInputs = [...contactInputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      textarea: content,
    };
    setContactInputs(updatedInputs);
  };
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const postMessage = async (number, e) => {
    e.preventDefault();
    try {
      //News
      number !== 2
        ? await postRequest(
            `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_POSTNOTIFICATION}`,

            {
              Author: Username,
              Date: contactInputs[1].Date,
              Content: contactInputs[4].textarea,
            },
            true
          )
        : await postRequest(
            `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_POSTNEWS}`,

            {
              Author: Username,
              Date: contactInputs[1].Date,
              Title: contactInputs[2].Title,
              Content: contactInputs[4].textarea,
              Image: contactInputs[3].Image,
            },
            true
          ); //Notifications

      setContactInputs((prev) => {
        return prev.map((contact) => {
          const clean = { ...contact };
          Object.keys(clean).forEach((key) => {
            if (key !== "Author" && key !== "Date" && key !== "Icon") {
              clean[key] = "";
            }
          });
          return clean;
        });
      });
    } catch (error) {}
  };

  return (
    <>
      <form className="combineW combineH flex jcac" onSubmit={handleSubmit}>
        <div className="inputs combineH flex">
          {contactInputs.map((obj, index) => {
            return Object.entries(obj).map(([key, value], i) => {
              return (
                <React.Fragment key={i}>
                  {key !== "Icon" &&
                    index !== contactInputs.length - 1 &&
                    (goDown !== 2
                      ? key !== "Title" && key !== "Image"
                      : key !== "Icon") && (
                      <label key={i} className="flex jcac bRadius">
                        {contactInputs[index].Icon} {key}
                        <input
                          type="text"
                          className={index < 2 ? "gray" : ""}
                          readOnly={index < 2}
                          placeholder={key}
                          value={
                            index === 0
                              ? Username
                              : index === 1
                              ? contactInputs[1].Date
                              : value
                          }
                          onChange={(e) => handleInputs(key, index, e)}
                        />
                      </label>
                    )}
                </React.Fragment>
              );
            });
          })}
        </div>
        <div className="textarea combineH flex">
          <ReactQuill
            modules={module}
            className="textarea"
            value={contactInputs[contactInputs.length - 1].textarea}
            onChange={(content) => {
              handleQuillChange(contactInputs.length - 1, content);
            }}
          />
          <button
            onClick={(e) => postMessage(goDown, e)}
            className="submit pointer bRadius"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
}

export default News;
