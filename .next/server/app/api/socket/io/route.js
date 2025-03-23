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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_alexlautin_Documents_GitHub_emoryhacks25_app_api_socket_io_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/socket/io/route.ts */ \"(rsc)/./app/api/socket/io/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/socket/io/route\",\n        pathname: \"/api/socket/io\",\n        filename: \"route\",\n        bundlePath: \"app/api/socket/io/route\"\n    },\n    resolvedPagePath: \"/Users/alexlautin/Documents/GitHub/emoryhacks25/app/api/socket/io/route.ts\",\n    nextConfigOutput,\n    userland: _Users_alexlautin_Documents_GitHub_emoryhacks25_app_api_socket_io_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/socket/io/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzb2NrZXQlMkZpbyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc29ja2V0JTJGaW8lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzb2NrZXQlMkZpbyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFsZXhsYXV0aW4lMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZlbW9yeWhhY2tzMjUlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYWxleGxhdXRpbiUyRkRvY3VtZW50cyUyRkdpdEh1YiUyRmVtb3J5aGFja3MyNSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMwQjtBQUN2RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbGxlcnlib2FyZC8/OGE5MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvYWxleGxhdXRpbi9Eb2N1bWVudHMvR2l0SHViL2Vtb3J5aGFja3MyNS9hcHAvYXBpL3NvY2tldC9pby9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc29ja2V0L2lvL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc29ja2V0L2lvXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zb2NrZXQvaW8vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvYWxleGxhdXRpbi9Eb2N1bWVudHMvR2l0SHViL2Vtb3J5aGFja3MyNS9hcHAvYXBpL3NvY2tldC9pby9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9zb2NrZXQvaW8vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0LCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/socket/io/route.ts":
/*!************************************!*\
  !*** ./app/api/socket/io/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"(rsc)/./node_modules/socket.io/wrapper.mjs\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst runtime = \"nodejs\";\nconst dynamic = \"force-dynamic\";\nconst classrooms = new Map();\nfunction generateClassCode() {\n    return Math.random().toString(36).substring(2, 8).toUpperCase();\n}\n// Create a map to store active connections\nconst connections = new Map();\n// Socket.IO handler\nconst ioHandler = (req, res)=>{\n    if (!res.socket.server.io) {\n        const httpServer = res.socket.server;\n        const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(httpServer, {\n            path: \"/api/socket/io\",\n            addTrailingSlash: false,\n            cors: {\n                origin: \"*\",\n                methods: [\n                    \"GET\",\n                    \"POST\"\n                ]\n            }\n        });\n        io.on(\"connection\", (socket)=>{\n            console.log(\"Client connected:\", socket.id);\n            connections.set(socket.id, socket);\n            socket.on(\"create-classroom\", (teacherId)=>{\n                let classCode;\n                do {\n                    classCode = generateClassCode();\n                }while (classrooms.has(classCode));\n                classrooms.set(classCode, {\n                    teacherId,\n                    students: new Map()\n                });\n                socket.join(classCode);\n                socket.emit(\"classroom-created\", {\n                    classCode,\n                    teacherId\n                });\n            });\n            socket.on(\"join-classroom\", (data)=>{\n                const { classCode, studentId, displayName } = data;\n                const classroom = classrooms.get(classCode);\n                if (!classroom) {\n                    socket.emit(\"error\", {\n                        message: \"Classroom not found\"\n                    });\n                    return;\n                }\n                // Add student to classroom\n                classroom.students.set(studentId, {\n                    displayName\n                });\n                socket.join(classCode);\n                // Notify all clients in the classroom about the new student\n                io.to(classCode).emit(\"student-joined\", {\n                    studentId,\n                    displayName,\n                    students: Array.from(classroom.students.entries()).map(([id, data])=>({\n                            id,\n                            displayName: data.displayName\n                        }))\n                });\n                // Confirm the display name to the joining student\n                socket.emit(\"name-assigned\", {\n                    displayName\n                });\n            });\n            socket.on(\"draw-update\", (data)=>{\n                const { classCode, studentId, drawData, canvasState } = data;\n                // Broadcast the drawing update to all clients in the classroom\n                socket.to(classCode).emit(\"draw-update-received\", {\n                    studentId,\n                    drawData,\n                    canvasState\n                });\n            });\n            socket.on(\"disconnecting\", ()=>{\n                console.log(\"Client disconnected:\", socket.id);\n                connections.delete(socket.id);\n                // Clean up classrooms data if needed\n                for (const [code, classroom] of classrooms.entries()){\n                    if (classroom.students.has(socket.id)) {\n                        classroom.students.delete(socket.id);\n                        io.to(code).emit(\"student-left\", {\n                            students: Array.from(classroom.students.entries()).map(([id, data])=>({\n                                    id,\n                                    displayName: data.displayName\n                                }))\n                        });\n                        // If no students left and teacher is gone, remove the classroom\n                        if (classroom.students.size === 0 && classroom.teacherId === socket.id) {\n                            classrooms.delete(code);\n                        }\n                    }\n                }\n            });\n        });\n        res.socket.server.io = io;\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n        success: true\n    });\n};\nasync function GET(req) {\n    if (!req.headers.get(\"upgrade\")?.includes(\"websocket\")) {\n        return new Response(\"Expected websocket\", {\n            status: 400\n        });\n    }\n    try {\n        const res = await fetch(req.url, {\n            method: req.method,\n            headers: req.headers\n        });\n        return new Response(null, {\n            status: 101,\n            headers: res.headers\n        });\n    } catch (e) {\n        return new Response(null, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    return ioHandler(req, req);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU87UUFDdEI7UUFDQSxPQUFPLElBQUlFLFNBQVMsTUFBTTtZQUN4QkMsUUFBUTtZQUNSSCxTQUFTeEMsSUFBSXdDLE9BQU87UUFDdEI7SUFDRixFQUFFLE9BQU9PLEdBQUc7UUFDVixPQUFPLElBQUlMLFNBQVMsTUFBTTtZQUFFQyxRQUFRO1FBQUk7SUFDMUM7QUFDRjtBQUVPLGVBQWVLLEtBQUtqRCxHQUFZO0lBQ3JDLE9BQU9ELFVBQVVDLEtBQUtBO0FBQ3hCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FsbGVyeWJvYXJkLy4vYXBwL2FwaS9zb2NrZXQvaW8vcm91dGUudHM/MjZhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCB7IFNlcnZlciB9IGZyb20gJ3NvY2tldC5pbyc7XG5pbXBvcnQgeyBOZXh0QXBpUmVzcG9uc2VTZXJ2ZXJJTyB9IGZyb20gJ0AvdHlwZXMvc29ja2V0JztcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcblxuZXhwb3J0IGNvbnN0IHJ1bnRpbWUgPSAnbm9kZWpzJztcbmV4cG9ydCBjb25zdCBkeW5hbWljID0gJ2ZvcmNlLWR5bmFtaWMnO1xuXG5jb25zdCBjbGFzc3Jvb21zID0gbmV3IE1hcDxzdHJpbmcsIHtcbiAgdGVhY2hlcklkOiBzdHJpbmc7XG4gIHN0dWRlbnRzOiBNYXA8c3RyaW5nLCB7IGRpc3BsYXlOYW1lOiBzdHJpbmcgfT47XG59PigpO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUNsYXNzQ29kZSgpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA4KS50b1VwcGVyQ2FzZSgpO1xufVxuXG4vLyBDcmVhdGUgYSBtYXAgdG8gc3RvcmUgYWN0aXZlIGNvbm5lY3Rpb25zXG5jb25zdCBjb25uZWN0aW9ucyA9IG5ldyBNYXAoKTtcblxuLy8gU29ja2V0LklPIGhhbmRsZXJcbmNvbnN0IGlvSGFuZGxlciA9IChyZXE6IFJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlU2VydmVySU8pID0+IHtcbiAgaWYgKCFyZXMuc29ja2V0LnNlcnZlci5pbykge1xuICAgIGNvbnN0IGh0dHBTZXJ2ZXIgPSByZXMuc29ja2V0LnNlcnZlciBhcyBhbnk7XG4gICAgY29uc3QgaW8gPSBuZXcgU2VydmVyKGh0dHBTZXJ2ZXIsIHtcbiAgICAgIHBhdGg6ICcvYXBpL3NvY2tldC9pbycsXG4gICAgICBhZGRUcmFpbGluZ1NsYXNoOiBmYWxzZSxcbiAgICAgIGNvcnM6IHtcbiAgICAgICAgb3JpZ2luOiAnKicsXG4gICAgICAgIG1ldGhvZHM6IFsnR0VUJywgJ1BPU1QnXSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdDbGllbnQgY29ubmVjdGVkOicsIHNvY2tldC5pZCk7XG4gICAgICBjb25uZWN0aW9ucy5zZXQoc29ja2V0LmlkLCBzb2NrZXQpO1xuXG4gICAgICBzb2NrZXQub24oJ2NyZWF0ZS1jbGFzc3Jvb20nLCAodGVhY2hlcklkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGNsYXNzQ29kZTogc3RyaW5nO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgY2xhc3NDb2RlID0gZ2VuZXJhdGVDbGFzc0NvZGUoKTtcbiAgICAgICAgfSB3aGlsZSAoY2xhc3Nyb29tcy5oYXMoY2xhc3NDb2RlKSk7XG5cbiAgICAgICAgY2xhc3Nyb29tcy5zZXQoY2xhc3NDb2RlLCB7XG4gICAgICAgICAgdGVhY2hlcklkLFxuICAgICAgICAgIHN0dWRlbnRzOiBuZXcgTWFwKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc29ja2V0LmpvaW4oY2xhc3NDb2RlKTtcbiAgICAgICAgc29ja2V0LmVtaXQoJ2NsYXNzcm9vbS1jcmVhdGVkJywgeyBjbGFzc0NvZGUsIHRlYWNoZXJJZCB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oJ2pvaW4tY2xhc3Nyb29tJywgKGRhdGE6IHsgY2xhc3NDb2RlOiBzdHJpbmc7IHN0dWRlbnRJZDogc3RyaW5nOyBkaXNwbGF5TmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgY29uc3QgeyBjbGFzc0NvZGUsIHN0dWRlbnRJZCwgZGlzcGxheU5hbWUgfSA9IGRhdGE7XG4gICAgICAgIGNvbnN0IGNsYXNzcm9vbSA9IGNsYXNzcm9vbXMuZ2V0KGNsYXNzQ29kZSk7XG5cbiAgICAgICAgaWYgKCFjbGFzc3Jvb20pIHtcbiAgICAgICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCB7IG1lc3NhZ2U6ICdDbGFzc3Jvb20gbm90IGZvdW5kJyB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgc3R1ZGVudCB0byBjbGFzc3Jvb21cbiAgICAgICAgY2xhc3Nyb29tLnN0dWRlbnRzLnNldChzdHVkZW50SWQsIHsgZGlzcGxheU5hbWUgfSk7XG4gICAgICAgIHNvY2tldC5qb2luKGNsYXNzQ29kZSk7XG5cbiAgICAgICAgLy8gTm90aWZ5IGFsbCBjbGllbnRzIGluIHRoZSBjbGFzc3Jvb20gYWJvdXQgdGhlIG5ldyBzdHVkZW50XG4gICAgICAgIGlvLnRvKGNsYXNzQ29kZSkuZW1pdCgnc3R1ZGVudC1qb2luZWQnLCB7XG4gICAgICAgICAgc3R1ZGVudElkLFxuICAgICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICAgIHN0dWRlbnRzOiBBcnJheS5mcm9tKGNsYXNzcm9vbS5zdHVkZW50cy5lbnRyaWVzKCkpLm1hcCgoW2lkLCBkYXRhXSkgPT4gKHtcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IGRhdGEuZGlzcGxheU5hbWVcbiAgICAgICAgICB9KSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29uZmlybSB0aGUgZGlzcGxheSBuYW1lIHRvIHRoZSBqb2luaW5nIHN0dWRlbnRcbiAgICAgICAgc29ja2V0LmVtaXQoJ25hbWUtYXNzaWduZWQnLCB7IGRpc3BsYXlOYW1lIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbignZHJhdy11cGRhdGUnLCAoZGF0YToge1xuICAgICAgICBjbGFzc0NvZGU6IHN0cmluZztcbiAgICAgICAgc3R1ZGVudElkOiBzdHJpbmc7XG4gICAgICAgIGRyYXdEYXRhOiBhbnk7XG4gICAgICAgIGNhbnZhc1N0YXRlOiBzdHJpbmc7XG4gICAgICB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NDb2RlLCBzdHVkZW50SWQsIGRyYXdEYXRhLCBjYW52YXNTdGF0ZSB9ID0gZGF0YTtcbiAgICAgICAgXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgZHJhd2luZyB1cGRhdGUgdG8gYWxsIGNsaWVudHMgaW4gdGhlIGNsYXNzcm9vbVxuICAgICAgICBzb2NrZXQudG8oY2xhc3NDb2RlKS5lbWl0KCdkcmF3LXVwZGF0ZS1yZWNlaXZlZCcsIHtcbiAgICAgICAgICBzdHVkZW50SWQsXG4gICAgICAgICAgZHJhd0RhdGEsXG4gICAgICAgICAgY2FudmFzU3RhdGVcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgc29ja2V0Lm9uKCdkaXNjb25uZWN0aW5nJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnQ2xpZW50IGRpc2Nvbm5lY3RlZDonLCBzb2NrZXQuaWQpO1xuICAgICAgICBjb25uZWN0aW9ucy5kZWxldGUoc29ja2V0LmlkKTtcbiAgICAgICAgXG4gICAgICAgIC8vIENsZWFuIHVwIGNsYXNzcm9vbXMgZGF0YSBpZiBuZWVkZWRcbiAgICAgICAgZm9yIChjb25zdCBbY29kZSwgY2xhc3Nyb29tXSBvZiBjbGFzc3Jvb21zLmVudHJpZXMoKSkge1xuICAgICAgICAgIGlmIChjbGFzc3Jvb20uc3R1ZGVudHMuaGFzKHNvY2tldC5pZCkpIHtcbiAgICAgICAgICAgIGNsYXNzcm9vbS5zdHVkZW50cy5kZWxldGUoc29ja2V0LmlkKTtcbiAgICAgICAgICAgIGlvLnRvKGNvZGUpLmVtaXQoJ3N0dWRlbnQtbGVmdCcsIHsgXG4gICAgICAgICAgICAgIHN0dWRlbnRzOiBBcnJheS5mcm9tKGNsYXNzcm9vbS5zdHVkZW50cy5lbnRyaWVzKCkpLm1hcCgoW2lkLCBkYXRhXSkgPT4gKHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogZGF0YS5kaXNwbGF5TmFtZVxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJZiBubyBzdHVkZW50cyBsZWZ0IGFuZCB0ZWFjaGVyIGlzIGdvbmUsIHJlbW92ZSB0aGUgY2xhc3Nyb29tXG4gICAgICAgICAgICBpZiAoY2xhc3Nyb29tLnN0dWRlbnRzLnNpemUgPT09IDAgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCA9PT0gc29ja2V0LmlkKSB7XG4gICAgICAgICAgICAgIGNsYXNzcm9vbXMuZGVsZXRlKGNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXMuc29ja2V0LnNlcnZlci5pbyA9IGlvO1xuICB9XG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcTogUmVxdWVzdCkge1xuICBpZiAoIXJlcS5oZWFkZXJzLmdldCgndXBncmFkZScpPy5pbmNsdWRlcygnd2Vic29ja2V0JykpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdFeHBlY3RlZCB3ZWJzb2NrZXQnLCB7IHN0YXR1czogNDAwIH0pO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2gocmVxLnVybCEsIHtcbiAgICAgIG1ldGhvZDogcmVxLm1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHJlcS5oZWFkZXJzLFxuICAgIH0pO1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge1xuICAgICAgc3RhdHVzOiAxMDEsXG4gICAgICBoZWFkZXJzOiByZXMuaGVhZGVycyxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgcmV0dXJuIGlvSGFuZGxlcihyZXEsIHJlcSBhcyBhbnkpO1xufSAiXSwibmFtZXMiOlsiU2VydmVyIiwiTmV4dFJlc3BvbnNlIiwicnVudGltZSIsImR5bmFtaWMiLCJjbGFzc3Jvb21zIiwiTWFwIiwiZ2VuZXJhdGVDbGFzc0NvZGUiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImNvbm5lY3Rpb25zIiwiaW9IYW5kbGVyIiwicmVxIiwicmVzIiwic29ja2V0Iiwic2VydmVyIiwiaW8iLCJodHRwU2VydmVyIiwicGF0aCIsImFkZFRyYWlsaW5nU2xhc2giLCJjb3JzIiwib3JpZ2luIiwibWV0aG9kcyIsIm9uIiwiY29uc29sZSIsImxvZyIsImlkIiwic2V0IiwidGVhY2hlcklkIiwiY2xhc3NDb2RlIiwiaGFzIiwic3R1ZGVudHMiLCJqb2luIiwiZW1pdCIsImRhdGEiLCJzdHVkZW50SWQiLCJkaXNwbGF5TmFtZSIsImNsYXNzcm9vbSIsImdldCIsIm1lc3NhZ2UiLCJ0byIsIkFycmF5IiwiZnJvbSIsImVudHJpZXMiLCJtYXAiLCJkcmF3RGF0YSIsImNhbnZhc1N0YXRlIiwiZGVsZXRlIiwiY29kZSIsInNpemUiLCJqc29uIiwic3VjY2VzcyIsIkdFVCIsImhlYWRlcnMiLCJpbmNsdWRlcyIsIlJlc3BvbnNlIiwic3RhdHVzIiwiZmV0Y2giLCJ1cmwiLCJtZXRob2QiLCJlIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/socket/io/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ws","vendor-chunks/socket.io-parser","vendor-chunks/engine.io-parser","vendor-chunks/@socket.io","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/engine.io","vendor-chunks/socket.io","vendor-chunks/socket.io-adapter","vendor-chunks/negotiator","vendor-chunks/mime-db","vendor-chunks/vary","vendor-chunks/object-assign","vendor-chunks/mime-types","vendor-chunks/cors","vendor-chunks/cookie","vendor-chunks/base64id","vendor-chunks/accepts"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Falexlautin%2FDocuments%2FGitHub%2Femoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();