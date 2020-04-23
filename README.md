# knockout-js-object-wrapper README

If you're using TypeScript, remove TypeScript annotation from the object you want to wrap. Next, select a JavaScript object, making sure not to select code that surrounds the object -- other than its declaration and its terminating semicolon/newline. Finally, execute the command "Wrap Javascript object in Knockout.js". If you'd like to add functionality, feel free to create a pull request.

The extension will wrap every value in the appropriate Knockout.js observable and paste the result below the object you selected. If you execute the extension on this code:

```JavaScript
const obj = {
    key: "string",
    key2: 0,
    key3: [
        "1"
    ],
    key4: {
      innerKey: "value",
    },
    key5: [
      {
        innerKey: true,
      },
    ],
}
```

the result will be

```JavaScript
const obj = {
    key: "string",
    key2: 0,
    key3: [
        "1"
    ],
    key4: {
      innerKey: "value",
    },
    key5: [
      {
        innerKey: true,
      },
    ],
}
const obj = const obj = {
    key: ko.observable("string"),
    key2: ko.observable(0),
    key3: ko.observableArray([
        "1"
    ]),
    key4: ko.observable({
      innerKey: ko.observable("value"),
    }),
    key5: ko.observableArray([
      {
        innerKey: ko.observable(true),
      },
    ]),
}
```
