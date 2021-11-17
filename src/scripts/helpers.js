import {
  getData,
  postData,
  putData,
  deleteData,
  patchData,
} from "./methods.js";

const createHTMLTag = ({
  tagName = "div",
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

const showResults = (r, resultTag) => {
  resultTag.innerText = JSON.stringify(r, null, 2);
};

const sendRequest = (url, method, data, resultTag) => {
  switch (method) {
    case "get":
      getData(url).then((r) => showResults(r, resultTag));
      break;
    case "post":
      postData(url, data).then((r) => showResults(r, resultTag));
      break;
    case "put":
      putData(url, data).then((r) => showResults(r, resultTag));
      break;
    case "delete":
      deleteData(url).then((r) => showResults(r, resultTag));
      break;

    case "patch":
      patchData(url, data).then((r) => showResults(r, resultTag));

      break;
  }
};

const handleButtonRow = (evt) => {
  const row = evt.target.parentElement;
  row.parentElement.appendChild(createBodyRow());

  evt.target.innerText = "Remove row";
  evt.target.removeEventListener("click", handleButtonRow);
  evt.target.addEventListener("click", () => {
    row.remove();
  });
};

const serialiseData = () => {
  const inputsArr = [...document.querySelectorAll(".requestBody input")];
  const inputsVal = inputsArr.map((item) => item.value);

  const data = {};

  inputsVal.forEach((val, idx, arr) => {
    if (idx % 2 === 0) {
      data[val] = arr[idx + 1];
    }
  });

  return JSON.stringify(data);
};

const createBodyRow = () => {
  const rowTag = createHTMLTag({
    tagClass: "requestBody",
  });
  const keyInputTag = createHTMLTag({ tagName: "input" });
  const valueInputTag = createHTMLTag({ tagName: "input" });
  const buttonTag = createHTMLTag({
    tagName: "button",
    tagText: "Add row",
    tagID: "add",
    tagEvent: {
      type: "click",
      cb: handleButtonRow,
    },
  });
  rowTag.appendChild(keyInputTag);
  rowTag.appendChild(valueInputTag);
  rowTag.appendChild(buttonTag);

  return rowTag;
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

  //<input id="endpoint" type="text" value="http://localhost:3000/posts">

  // const textArea = createHTMLTag({
  //   tagName: "textarea",
  //   tagClass: "data",
  // });

  //<textarea class="data"></textarea>

  const result = createHTMLTag({ tagName: "pre" });

  //<pre></pre>

  const button = createHTMLTag({
    tagName: "button",
    tagID: "send",
    tagText: "send",
    tagEvent: {
      type: "click",
      cb: () => {
        sendRequest(input.value, select.value, serialiseData(), result);
      },
    },
  });

  //<button id="send">send</button>

  const select = createHTMLTag({
    tagName: "select",
    tagID: "method",
    tagAttr: { key: "name", val: "methods" },
  });

  // <select id="method" name="methods"></select>
  supportedMethods.forEach((m) => {
    const option = createHTMLTag({
      tagName: "option",
      tagText: m.toUpperCase(),
      tagAttr: { key: "value", val: m },
    });
    select.appendChild(option);
  });

  //<option value=get>GET</option>

  wrapper.appendChild(input);
  wrapper.appendChild(select);
  wrapper.appendChild(button);
  // wrapper.appendChild(textArea);
  wrapper.appendChild(result);
  wrapper.appendChild(createBodyRow());

  return wrapper;
};
