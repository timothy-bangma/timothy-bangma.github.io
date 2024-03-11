"use strict";

let count = 0;
const increment = () => {
    m.request({
        origin: "http://localhost:8080",
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        url: "//localhost:8000/",
        body: {count: count + 1},
    }).then((data) => {
        count = parseInt(data.count)
    })
};

const Hello = {
    view: () => m("main", [
        m("h1", {class: "title"}, "My first app"),
        m("button", {onclick: increment}, count + " clicks")
    ])
}

m.mount(document.body, Hello)
