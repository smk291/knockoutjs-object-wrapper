// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.kowrap', function () {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			let text = document.getText(selection);

			text = text.slice(text.indexOf("{")) // remove excess
					   .slice(0, text.lastIndexOf("}") + 1);
			text = stripComments(text); // strip comments
			text = text.replace(/\:\ \"/gm, ": ko.observable(\"") // strings
					   .replace(/(?<=ko\.observable\(\")(.*)\"\,(\r\n|\r|\n)/g, "$1\"\),\n")
					   .replace(/\:\ ([0-9])/gm, ": ko.observable($1") // numbers
					   .replace(/([0-9])\,/gm, "$1),")
					   .replace(/\: (false|true)/gm, ": ko.observable($1)") // booleans
					   .replace(/\: (null|undefined)/gm, ": ko.observable()") // null
					   .replace(/\: {/gm, ": ko.observable({") // objects
					   .replace(/}(,?)?(?!,?[\s]*[{\]])[^?]/gm, "})$1") 
					   .replace(/\:\s\[\]/gm, ": ko.observableArray()") // empty arrays
					   .replace(/\:\s\[/gm, ": ko.observableArray([") // arrays
					   .replace(/\]/gm, "])")
					   .replace(/\}\)$/, "};"); // eos cop out
			
			const startWith = document.getText(selection).slice(0, document.getText(selection).indexOf("{"));
			
			editor.edit(editBuilder => {
				editBuilder.replace(selection, document.getText(selection) + "\n" + startWith + text);
			});
		}
	});

	context.subscriptions.push(disposable);
}

function stripComments(text:string) {
	return text.replace(/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\S\s]|[^"\\])*"|'(?:\\[\S\s]|[^'\\])*'|(?:\r?\n|[\S\s])[^\/"'\\\s]*)/mg, "$2");
}

function replaceForStrings(text: string) {
	let tmpText = wrapObservable(": \"", ": ko.observable(\"");

	return tmpText;
}

function wrapObservable(regex: RegExp | string, s: string) {
	return s.replace(regex, s);
}