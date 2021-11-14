import {
  getData,
  postData,
  putData,
  deleteData,
  patchData,
} from "./methods.js";

const createHTMLTag = ({
  tagName,
  tagID,
  tagClass,
  tagText,
  tagAttr,
  tagEvent,
}) => {
  const node = document.createElement(tagName);
  if (tagID !== undefined) {
    node.id = tagID;
  }
  if (tagClass !== undefined) {
    if (Array.isArray(tagClass)) {
      tagClass.forEach((c) => {
        node.classList.add(c);
      });
    } else {
      node.classList.add(tagClass);
    }
  }
  if (tagText !== undefined) {
    const nodeText = document.createTextNode(tagText);
    node.appendChild(nodeText);
  }
  if (tagAttr !== undefined) {
    if (Array.isArray(tagAttr)) {
      tagAttr.forEach((a) => {
        node.setAttribute(a.key, a.val);
      });
    } else {
      node.setAttribute(tagAttr.key, tagAttr.val);
    }
  }
  if (tagEvent !== undefined) {
    node.addEventListener(tagEvent.type, tagEvent.cb);
  }

  return node;
};

const sendRequest = (url, method, data, resultTag) => {
  switch (method) {
    case "get":
      getData(url).then((r) => {
        resultTag.innerText = JSON.stringify(r, null, 2);
      });
      break;
    case "post":
      postData(url, data.value).then((r) => {
        console.log(r);
        resultTag.innerText = JSON.stringify(r, null, 2);
      });
      break;
    case "put":
      putData(url, data.value).then((r) => {
        resultTag.innerText = JSON.stringify(r, null, 2);
      });
      break;
    case "delete":
      deleteData(url, data.value).then((r) => {
        resultTag.innerText = JSON.stringify(r, null, 2);
      });
      break;
    case "patch":
      patchData(url, data.value).then((r) => {
        resultTag.innerText = JSON.stringify(r, null, 2);
      });
      break;
  }
};

export const createGUI = (supportedMethods) => {
  const wrapper = document.createElement("div");
  const input = createHTMLTag({
    tagName: "input",
    tagID: "endpoint",
    tagAttr: [
      { key: "type", val: "text" },
      { key: "value", val: "http://localhost:3000/posts" },
    ],
  });
  const textArea = createHTMLTag({
    tagName: "textarea",
    tagClass: "data",
  });

  const result = createHTMLTag({ tagName: "pre" });

  const button = createHTMLTag({
    tagName: "button",
    tagID: "send",
    tagText: "send",
    tagEvent: {
      type: "click",
      cb: () => {
        sendRequest(input.value, select.value, textArea, result);
      },
    },
  });

  const select = createHTMLTag({
    tagName: "select",
    tagID: "method",
    tagAttr: { key: "name", val: "methods" },
  });
  supportedMethods.forEach((m) => {
    const option = createHTMLTag({
      tagName: "option",
      tagText: m.toUpperCase(),
      tagAttr: { key: "value", val: m },
    });
    select.appendChild(option);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(select);
  wrapper.appendChild(button);
  wrapper.appendChild(textArea);
  wrapper.appendChild(result);

  return wrapper;
};
