"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summariseCommit = void 0;
var generative_ai_1 = require("@google/generative-ai");
var genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
var model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash'
});
var summariseCommit = function (diff) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model.generateContent([
                    "You are an expert programmer, and you are trying to summarize a git diff.\n\nReminders about the git diff format:\n\nFor every file, there are a few metadata lines, like (for example):\n```\ndiff --git a/lib/index.js b/lib/index.js\n\nindex aadf691..bfef603 100644\n\n---a/lib/index.js\n\n+++ b/lib/index.js\n```\nThis means that `lib/index.js` was modified in this commit. Note that this is only an example.\n\nThen there is a specifier of the lines that were modified.\n\nA line starting with `+` means it was added.\n\nA line that starting with `-` means that line was deleted.\n\nA line that starts with neither `+` nor   `-` is code given for context and better understanding.\n\nIt is not part of the diff.\n\n[...]\n\nEXAMPLE SUMMARY COMMENTS:\n\n```\n* Raised the amount of returned recordings from `10` to `1001` [packages/server/recordings_api.ts], [packages/server/constants.ts]\n* Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]\n* Moved the `octokit` initialization to a separate file [src/octokit.ts], [src/index.ts]\n* Added an OpenAI API for completions [packages/utils/apis/openai.ts]\n* Lowered numeric tolerance for test files\n```\nMost commits will have less comments than this examples list.\n\nThe last comment does not include the file names,\n\nbecause there were more than two relevant files in the hypothetical commit.\n\nDo not include parts of the example in your summary.\n\nIt is given only as an example of appropriate comments.",
                    "Please summarise the following diff file: \n\n".concat(diff),
                ])];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.response.text()];
        }
    });
}); };
exports.summariseCommit = summariseCommit;
console.log(await (0, exports.summariseCommit)("diff --git a/packages/react-native-renderer/src/ReactNativeTypes.js b/packages/react-native-renderer/src/ReactNativeTypes.js\nindex 07030a6b7f6c7..8bce919d385e9 100644\n--- a/packages/react-native-renderer/src/ReactNativeTypes.js\n+++ b/packages/react-native-renderer/src/ReactNativeTypes.js\n@@ -10,6 +10,7 @@\n  */\n \n import type {ElementRef, ElementType, MixedElement} from 'react';\n+// $FlowFixMe[nonstrict-import] TODO(@rubennorte)\n import {type PublicRootInstance} from 'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface';\n \n export type MeasureOnSuccessCallback = ("));
