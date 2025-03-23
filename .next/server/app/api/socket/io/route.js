"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/socket/io/route";
exports.ids = ["app/api/socket/io/route"];
exports.modules = {

/***/ "bufferutil":
/*!*****************************!*\
  !*** external "bufferutil" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("bufferutil");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "utf-8-validate":
/*!*********************************!*\
  !*** external "utf-8-validate" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("utf-8-validate");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_alexlautin_Documents_GitHub_emoryhacks25_app_api_socket_io_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/socket/io/route.ts */ \"(rsc)/./app/api/socket/io/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/socket/io/route\",\n        pathname: \"/api/socket/io\",\n        filename: \"route\",\n        bundlePath: \"app/api/socket/io/route\"\n    },\n    resolvedPagePath: \"/Users/alexlautin/Documents/GitHub/emoryhacks25/app/api/socket/io/route.ts\",\n    nextConfigOutput,\n    userland: _Users_alexlautin_Documents_GitHub_emoryhacks25_app_api_socket_io_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/socket/io/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzb2NrZXQlMkZpbyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc29ja2V0JTJGaW8lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzb2NrZXQlMkZpbyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFsZXhsYXV0aW4lMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZlbW9yeWhhY2tzMjUlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYWxleGxhdXRpbiUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRmVtb3J5aGFja3MyNSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD1zdGFuZGFsb25lJnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMEI7QUFDdkc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYWxsZXJ5Ym9hcmQvPzkxYjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2FsZXhsYXV0aW4vRG9jdW1lbnRzL0dpdEh1Yi9lbW9yeWhhY2tzMjUvYXBwL2FwaS9zb2NrZXQvaW8vcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwic3RhbmRhbG9uZVwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zb2NrZXQvaW8vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zb2NrZXQvaW9cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3NvY2tldC9pby9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9hbGV4bGF1dGluL0RvY3VtZW50cy9HaXRIdWIvZW1vcnloYWNrczI1L2FwcC9hcGkvc29ja2V0L2lvL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL3NvY2tldC9pby9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/socket/io/route.ts":
/*!************************************!*\
  !*** ./app/api/socket/io/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"(rsc)/./node_modules/socket.io/wrapper.mjs\");\n\nconst dynamic = \"force-dynamic\";\nconst runtime = \"nodejs\";\nconst classrooms = new Map();\nfunction generateClassCode() {\n    return Math.random().toString(36).substring(2, 8).toUpperCase();\n}\nif (!global.io) {\n    global.io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server({\n        cors: {\n            origin: \"*\",\n            methods: [\n                \"GET\",\n                \"POST\"\n            ],\n            credentials: true\n        },\n        path: \"/api/socket/io\"\n    });\n    global.io.on(\"connection\", (socket)=>{\n        console.log(\"Client connected:\", socket.id);\n        socket.on(\"create-classroom\", (teacherId)=>{\n            let classCode;\n            do {\n                classCode = generateClassCode();\n            }while (classrooms.has(classCode));\n            classrooms.set(classCode, {\n                teacherId,\n                students: new Map(),\n                canvasStates: new Map()\n            });\n            socket.join(classCode);\n            socket.emit(\"classroom-created\", {\n                classCode,\n                teacherId\n            });\n        });\n        socket.on(\"join-classroom\", (data)=>{\n            const { classCode, studentId, displayName } = data;\n            const classroom = classrooms.get(classCode);\n            if (!classroom) {\n                socket.emit(\"error\", {\n                    message: \"Classroom not found\"\n                });\n                return;\n            }\n            // Add student to classroom\n            classroom.students.set(studentId, {\n                displayName\n            });\n            socket.join(classCode);\n            // Notify all clients in the classroom about the new student\n            global.io.to(classCode).emit(\"student-joined\", {\n                studentId,\n                displayName,\n                students: Array.from(classroom.students.entries()).map(([id, data])=>({\n                        id,\n                        displayName: data.displayName\n                    }))\n            });\n            // Send existing canvas state to the new student if available\n            const canvasState = classroom.canvasStates.get(studentId);\n            if (canvasState) {\n                socket.emit(\"load-canvas\", {\n                    studentId,\n                    canvasData: canvasState\n                });\n            }\n            // Confirm the display name to the joining student\n            socket.emit(\"name-assigned\", {\n                displayName\n            });\n        });\n        socket.on(\"draw-update\", (data)=>{\n            const { classCode, studentId, drawData, canvasState } = data;\n            const classroom = classrooms.get(classCode);\n            if (classroom) {\n                // Store the canvas state\n                classroom.canvasStates.set(studentId, canvasState);\n                // Broadcast the drawing update to all clients in the classroom\n                global.io.to(classCode).emit(\"draw-update-received\", {\n                    studentId,\n                    drawData,\n                    canvasState\n                });\n            }\n        });\n        socket.on(\"request-canvas-state\", (data)=>{\n            const { classCode, studentId } = data;\n            const classroom = classrooms.get(classCode);\n            if (classroom) {\n                const canvasState = classroom.canvasStates.get(studentId);\n                if (canvasState) {\n                    socket.emit(\"canvas-state-update\", {\n                        studentId,\n                        canvasState\n                    });\n                }\n            }\n        });\n        socket.on(\"disconnecting\", ()=>{\n            console.log(\"Client disconnected:\", socket.id);\n            // Clean up classrooms data if needed\n            for (const [code, classroom] of classrooms.entries()){\n                if (classroom.students.has(socket.id)) {\n                    classroom.students.delete(socket.id);\n                    classroom.canvasStates.delete(socket.id);\n                    global.io.to(code).emit(\"student-left\", {\n                        students: Array.from(classroom.students.entries()).map(([id, data])=>({\n                                id,\n                                displayName: data.displayName\n                            }))\n                    });\n                    // If no students left and teacher is gone, remove the classroom\n                    if (classroom.students.size === 0 && classroom.teacherId === socket.id) {\n                        classrooms.delete(code);\n                    }\n                }\n            }\n        });\n    });\n}\nasync function GET(req) {\n    if (req.headers.get(\"upgrade\") !== \"websocket\") {\n        return new Response(\"Expected Upgrade: websocket\", {\n            status: 426\n        });\n    }\n    try {\n        const res = await fetch(req.url, {\n            headers: req.headers,\n            method: req.method\n        });\n        return new Response(null, {\n            status: 101,\n            headers: res.headers\n        });\n    } catch (e) {\n        return new Response(null, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RjtBQUNGO0FBRU8sZUFBZUcsSUFBSUMsR0FBWTtJQUNwQyxJQUFJQSxJQUFJQyxPQUFPLENBQUNmLEdBQUcsQ0FBQyxlQUFlLGFBQWE7UUFDOUMsT0FBTyxJQUFJZ0IsU0FBUywrQkFBK0I7WUFBRUMsUUFBUTtRQUFJO0lBQ25FO0lBRUEsSUFBSTtRQUNGLE1BQU1DLE1BQU0sTUFBTUMsTUFBTUwsSUFBSU0sR0FBRyxFQUFHO1lBQ2hDTCxTQUFTRCxJQUFJQyxPQUFPO1lBQ3BCTSxRQUFRUCxJQUFJTyxNQUFNO1FBQ3BCO1FBQ0EsT0FBTyxJQUFJTCxTQUFTLE1BQU07WUFDeEJDLFFBQVE7WUFDUkYsU0FBU0csSUFBSUgsT0FBTztRQUN0QjtJQUNGLEVBQUUsT0FBT08sR0FBRztRQUNWLE9BQU8sSUFBSU4sU0FBUyxNQUFNO1lBQUVDLFFBQVE7UUFBSTtJQUMxQztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FsbGVyeWJvYXJkLy4vYXBwL2FwaS9zb2NrZXQvaW8vcm91dGUudHM/MjZhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2ZXIgYXMgTmV0U2VydmVyIH0gZnJvbSAnaHR0cCdcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0IH0gZnJvbSAnbmV4dCdcbmltcG9ydCB7IFNlcnZlciBhcyBTZXJ2ZXJJTyB9IGZyb20gJ3NvY2tldC5pbydcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcbiAgdmFyIGlvOiBTZXJ2ZXJJTyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2UtZHluYW1pYyc7XG5leHBvcnQgY29uc3QgcnVudGltZSA9ICdub2RlanMnO1xuXG5jb25zdCBjbGFzc3Jvb21zID0gbmV3IE1hcDxzdHJpbmcsIHtcbiAgdGVhY2hlcklkOiBzdHJpbmc7XG4gIHN0dWRlbnRzOiBNYXA8c3RyaW5nLCB7IGRpc3BsYXlOYW1lOiBzdHJpbmcgfT47XG4gIGNhbnZhc1N0YXRlczogTWFwPHN0cmluZywgc3RyaW5nPjtcbn0+KCk7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQ2xhc3NDb2RlKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDgpLnRvVXBwZXJDYXNlKCk7XG59XG5cbmlmICghZ2xvYmFsLmlvKSB7XG4gIGdsb2JhbC5pbyA9IG5ldyBTZXJ2ZXJJTyh7XG4gICAgY29yczoge1xuICAgICAgb3JpZ2luOiAnKicsXG4gICAgICBtZXRob2RzOiBbJ0dFVCcsICdQT1NUJ10sXG4gICAgICBjcmVkZW50aWFsczogdHJ1ZSxcbiAgICB9LFxuICAgIHBhdGg6ICcvYXBpL3NvY2tldC9pbycsXG4gIH0pO1xuXG4gIGdsb2JhbC5pby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ2xpZW50IGNvbm5lY3RlZDonLCBzb2NrZXQuaWQpO1xuXG4gICAgc29ja2V0Lm9uKCdjcmVhdGUtY2xhc3Nyb29tJywgKHRlYWNoZXJJZDogc3RyaW5nKSA9PiB7XG4gICAgICBsZXQgY2xhc3NDb2RlOiBzdHJpbmc7XG4gICAgICBkbyB7XG4gICAgICAgIGNsYXNzQ29kZSA9IGdlbmVyYXRlQ2xhc3NDb2RlKCk7XG4gICAgICB9IHdoaWxlIChjbGFzc3Jvb21zLmhhcyhjbGFzc0NvZGUpKTtcblxuICAgICAgY2xhc3Nyb29tcy5zZXQoY2xhc3NDb2RlLCB7XG4gICAgICAgIHRlYWNoZXJJZCxcbiAgICAgICAgc3R1ZGVudHM6IG5ldyBNYXAoKSxcbiAgICAgICAgY2FudmFzU3RhdGVzOiBuZXcgTWFwKClcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQuam9pbihjbGFzc0NvZGUpO1xuICAgICAgc29ja2V0LmVtaXQoJ2NsYXNzcm9vbS1jcmVhdGVkJywgeyBjbGFzc0NvZGUsIHRlYWNoZXJJZCB9KTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbignam9pbi1jbGFzc3Jvb20nLCAoZGF0YTogeyBjbGFzc0NvZGU6IHN0cmluZzsgc3R1ZGVudElkOiBzdHJpbmc7IGRpc3BsYXlOYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgY29uc3QgeyBjbGFzc0NvZGUsIHN0dWRlbnRJZCwgZGlzcGxheU5hbWUgfSA9IGRhdGE7XG4gICAgICBjb25zdCBjbGFzc3Jvb20gPSBjbGFzc3Jvb21zLmdldChjbGFzc0NvZGUpO1xuXG4gICAgICBpZiAoIWNsYXNzcm9vbSkge1xuICAgICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCB7IG1lc3NhZ2U6ICdDbGFzc3Jvb20gbm90IGZvdW5kJyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgc3R1ZGVudCB0byBjbGFzc3Jvb21cbiAgICAgIGNsYXNzcm9vbS5zdHVkZW50cy5zZXQoc3R1ZGVudElkLCB7IGRpc3BsYXlOYW1lIH0pO1xuICAgICAgc29ja2V0LmpvaW4oY2xhc3NDb2RlKTtcblxuICAgICAgLy8gTm90aWZ5IGFsbCBjbGllbnRzIGluIHRoZSBjbGFzc3Jvb20gYWJvdXQgdGhlIG5ldyBzdHVkZW50XG4gICAgICBnbG9iYWwuaW8hLnRvKGNsYXNzQ29kZSkuZW1pdCgnc3R1ZGVudC1qb2luZWQnLCB7XG4gICAgICAgIHN0dWRlbnRJZCxcbiAgICAgICAgZGlzcGxheU5hbWUsXG4gICAgICAgIHN0dWRlbnRzOiBBcnJheS5mcm9tKGNsYXNzcm9vbS5zdHVkZW50cy5lbnRyaWVzKCkpLm1hcCgoW2lkLCBkYXRhXSkgPT4gKHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBkaXNwbGF5TmFtZTogZGF0YS5kaXNwbGF5TmFtZVxuICAgICAgICB9KSlcbiAgICAgIH0pO1xuXG4gICAgICAvLyBTZW5kIGV4aXN0aW5nIGNhbnZhcyBzdGF0ZSB0byB0aGUgbmV3IHN0dWRlbnQgaWYgYXZhaWxhYmxlXG4gICAgICBjb25zdCBjYW52YXNTdGF0ZSA9IGNsYXNzcm9vbS5jYW52YXNTdGF0ZXMuZ2V0KHN0dWRlbnRJZCk7XG4gICAgICBpZiAoY2FudmFzU3RhdGUpIHtcbiAgICAgICAgc29ja2V0LmVtaXQoJ2xvYWQtY2FudmFzJywge1xuICAgICAgICAgIHN0dWRlbnRJZCxcbiAgICAgICAgICBjYW52YXNEYXRhOiBjYW52YXNTdGF0ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29uZmlybSB0aGUgZGlzcGxheSBuYW1lIHRvIHRoZSBqb2luaW5nIHN0dWRlbnRcbiAgICAgIHNvY2tldC5lbWl0KCduYW1lLWFzc2lnbmVkJywgeyBkaXNwbGF5TmFtZSB9KTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbignZHJhdy11cGRhdGUnLCAoZGF0YToge1xuICAgICAgY2xhc3NDb2RlOiBzdHJpbmc7XG4gICAgICBzdHVkZW50SWQ6IHN0cmluZztcbiAgICAgIGRyYXdEYXRhOiBhbnk7XG4gICAgICBjYW52YXNTdGF0ZTogc3RyaW5nO1xuICAgIH0pID0+IHtcbiAgICAgIGNvbnN0IHsgY2xhc3NDb2RlLCBzdHVkZW50SWQsIGRyYXdEYXRhLCBjYW52YXNTdGF0ZSB9ID0gZGF0YTtcbiAgICAgIGNvbnN0IGNsYXNzcm9vbSA9IGNsYXNzcm9vbXMuZ2V0KGNsYXNzQ29kZSk7XG4gICAgICBcbiAgICAgIGlmIChjbGFzc3Jvb20pIHtcbiAgICAgICAgLy8gU3RvcmUgdGhlIGNhbnZhcyBzdGF0ZVxuICAgICAgICBjbGFzc3Jvb20uY2FudmFzU3RhdGVzLnNldChzdHVkZW50SWQsIGNhbnZhc1N0YXRlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgZHJhd2luZyB1cGRhdGUgdG8gYWxsIGNsaWVudHMgaW4gdGhlIGNsYXNzcm9vbVxuICAgICAgICBnbG9iYWwuaW8hLnRvKGNsYXNzQ29kZSkuZW1pdCgnZHJhdy11cGRhdGUtcmVjZWl2ZWQnLCB7XG4gICAgICAgICAgc3R1ZGVudElkLFxuICAgICAgICAgIGRyYXdEYXRhLFxuICAgICAgICAgIGNhbnZhc1N0YXRlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uKCdyZXF1ZXN0LWNhbnZhcy1zdGF0ZScsIChkYXRhOiB7IGNsYXNzQ29kZTogc3RyaW5nOyBzdHVkZW50SWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgICBjb25zdCB7IGNsYXNzQ29kZSwgc3R1ZGVudElkIH0gPSBkYXRhO1xuICAgICAgY29uc3QgY2xhc3Nyb29tID0gY2xhc3Nyb29tcy5nZXQoY2xhc3NDb2RlKTtcbiAgICAgIFxuICAgICAgaWYgKGNsYXNzcm9vbSkge1xuICAgICAgICBjb25zdCBjYW52YXNTdGF0ZSA9IGNsYXNzcm9vbS5jYW52YXNTdGF0ZXMuZ2V0KHN0dWRlbnRJZCk7XG4gICAgICAgIGlmIChjYW52YXNTdGF0ZSkge1xuICAgICAgICAgIHNvY2tldC5lbWl0KCdjYW52YXMtc3RhdGUtdXBkYXRlJywge1xuICAgICAgICAgICAgc3R1ZGVudElkLFxuICAgICAgICAgICAgY2FudmFzU3RhdGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0aW5nJywgKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ0NsaWVudCBkaXNjb25uZWN0ZWQ6Jywgc29ja2V0LmlkKTtcbiAgICAgIC8vIENsZWFuIHVwIGNsYXNzcm9vbXMgZGF0YSBpZiBuZWVkZWRcbiAgICAgIGZvciAoY29uc3QgW2NvZGUsIGNsYXNzcm9vbV0gb2YgY2xhc3Nyb29tcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgaWYgKGNsYXNzcm9vbS5zdHVkZW50cy5oYXMoc29ja2V0LmlkKSkge1xuICAgICAgICAgIGNsYXNzcm9vbS5zdHVkZW50cy5kZWxldGUoc29ja2V0LmlkKTtcbiAgICAgICAgICBjbGFzc3Jvb20uY2FudmFzU3RhdGVzLmRlbGV0ZShzb2NrZXQuaWQpO1xuICAgICAgICAgIGdsb2JhbC5pbyEudG8oY29kZSkuZW1pdCgnc3R1ZGVudC1sZWZ0JywgeyBcbiAgICAgICAgICAgIHN0dWRlbnRzOiBBcnJheS5mcm9tKGNsYXNzcm9vbS5zdHVkZW50cy5lbnRyaWVzKCkpLm1hcCgoW2lkLCBkYXRhXSkgPT4gKHtcbiAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBkYXRhLmRpc3BsYXlOYW1lXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIElmIG5vIHN0dWRlbnRzIGxlZnQgYW5kIHRlYWNoZXIgaXMgZ29uZSwgcmVtb3ZlIHRoZSBjbGFzc3Jvb21cbiAgICAgICAgICBpZiAoY2xhc3Nyb29tLnN0dWRlbnRzLnNpemUgPT09IDAgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCA9PT0gc29ja2V0LmlkKSB7XG4gICAgICAgICAgICBjbGFzc3Jvb21zLmRlbGV0ZShjb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBSZXF1ZXN0KSB7XG4gIGlmIChyZXEuaGVhZGVycy5nZXQoJ3VwZ3JhZGUnKSAhPT0gJ3dlYnNvY2tldCcpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdFeHBlY3RlZCBVcGdyYWRlOiB3ZWJzb2NrZXQnLCB7IHN0YXR1czogNDI2IH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChyZXEudXJsISwge1xuICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgICBtZXRob2Q6IHJlcS5tZXRob2QsXG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7XG4gICAgICBzdGF0dXM6IDEwMSxcbiAgICAgIGhlYWRlcnM6IHJlcy5oZWFkZXJzLFxuICAgIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIlNlcnZlciIsIlNlcnZlcklPIiwiZHluYW1pYyIsInJ1bnRpbWUiLCJjbGFzc3Jvb21zIiwiTWFwIiwiZ2VuZXJhdGVDbGFzc0NvZGUiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImdsb2JhbCIsImlvIiwiY29ycyIsIm9yaWdpbiIsIm1ldGhvZHMiLCJjcmVkZW50aWFscyIsInBhdGgiLCJvbiIsInNvY2tldCIsImNvbnNvbGUiLCJsb2ciLCJpZCIsInRlYWNoZXJJZCIsImNsYXNzQ29kZSIsImhhcyIsInNldCIsInN0dWRlbnRzIiwiY2FudmFzU3RhdGVzIiwiam9pbiIsImVtaXQiLCJkYXRhIiwic3R1ZGVudElkIiwiZGlzcGxheU5hbWUiLCJjbGFzc3Jvb20iLCJnZXQiLCJtZXNzYWdlIiwidG8iLCJBcnJheSIsImZyb20iLCJlbnRyaWVzIiwibWFwIiwiY2FudmFzU3RhdGUiLCJjYW52YXNEYXRhIiwiZHJhd0RhdGEiLCJjb2RlIiwiZGVsZXRlIiwic2l6ZSIsIkdFVCIsInJlcSIsImhlYWRlcnMiLCJSZXNwb25zZSIsInN0YXR1cyIsInJlcyIsImZldGNoIiwidXJsIiwibWV0aG9kIiwiZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/socket/io/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ws","vendor-chunks/socket.io-parser","vendor-chunks/engine.io-parser","vendor-chunks/@socket.io","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/engine.io","vendor-chunks/socket.io","vendor-chunks/socket.io-adapter","vendor-chunks/accepts","vendor-chunks/mime-db","vendor-chunks/vary","vendor-chunks/object-assign","vendor-chunks/mime-types","vendor-chunks/cors","vendor-chunks/cookie","vendor-chunks/base64id"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();