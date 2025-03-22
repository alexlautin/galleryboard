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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_s3cur_Downloads_projects_eduquest_emoryhacks25_app_api_socket_io_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/socket/io/route.ts */ \"(rsc)/./app/api/socket/io/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/socket/io/route\",\n        pathname: \"/api/socket/io\",\n        filename: \"route\",\n        bundlePath: \"app/api/socket/io/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\s3cur\\\\Downloads\\\\projects\\\\eduquest\\\\emoryhacks25\\\\app\\\\api\\\\socket\\\\io\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_s3cur_Downloads_projects_eduquest_emoryhacks25_app_api_socket_io_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/socket/io/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzb2NrZXQlMkZpbyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc29ja2V0JTJGaW8lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzb2NrZXQlMkZpbyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNzM2N1ciU1Q0Rvd25sb2FkcyU1Q3Byb2plY3RzJTVDZWR1cXVlc3QlNUNlbW9yeWhhY2tzMjUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q3MzY3VyJTVDRG93bmxvYWRzJTVDcHJvamVjdHMlNUNlZHVxdWVzdCU1Q2Vtb3J5aGFja3MyNSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM2QztBQUMxSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzZKOztBQUU3SiIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbGxlcnlib2FyZC8/MDQ4MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxzM2N1clxcXFxEb3dubG9hZHNcXFxccHJvamVjdHNcXFxcZWR1cXVlc3RcXFxcZW1vcnloYWNrczI1XFxcXGFwcFxcXFxhcGlcXFxcc29ja2V0XFxcXGlvXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9zb2NrZXQvaW8vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zb2NrZXQvaW9cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3NvY2tldC9pby9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHMzY3VyXFxcXERvd25sb2Fkc1xcXFxwcm9qZWN0c1xcXFxlZHVxdWVzdFxcXFxlbW9yeWhhY2tzMjVcXFxcYXBwXFxcXGFwaVxcXFxzb2NrZXRcXFxcaW9cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvc29ja2V0L2lvL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCwgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/socket/io/route.ts":
/*!************************************!*\
  !*** ./app/api/socket/io/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"(rsc)/./node_modules/socket.io/wrapper.mjs\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst runtime = \"nodejs\";\nconst dynamic = \"force-dynamic\";\nconst classrooms = new Map();\nfunction generateClassCode() {\n    return Math.random().toString(36).substring(2, 8).toUpperCase();\n}\n// Create a map to store active connections\nconst connections = new Map();\n// Socket.IO handler\nconst ioHandler = (req, res)=>{\n    if (!res.socket.server.io) {\n        const httpServer = res.socket.server;\n        const io = new socket_io__WEBPACK_IMPORTED_MODULE_0__.Server(httpServer, {\n            path: \"/api/socket/io\",\n            addTrailingSlash: false,\n            cors: {\n                origin: \"*\",\n                methods: [\n                    \"GET\",\n                    \"POST\"\n                ]\n            }\n        });\n        io.on(\"connection\", (socket)=>{\n            console.log(\"Client connected:\", socket.id);\n            connections.set(socket.id, socket);\n            socket.on(\"create-classroom\", (teacherId)=>{\n                let classCode;\n                do {\n                    classCode = generateClassCode();\n                }while (classrooms.has(classCode));\n                classrooms.set(classCode, {\n                    teacherId,\n                    students: new Map()\n                });\n                socket.join(classCode);\n                socket.emit(\"classroom-created\", {\n                    classCode,\n                    teacherId\n                });\n            });\n            socket.on(\"join-classroom\", (data)=>{\n                const { classCode, studentId, displayName } = data;\n                const classroom = classrooms.get(classCode);\n                if (!classroom) {\n                    socket.emit(\"error\", {\n                        message: \"Classroom not found\"\n                    });\n                    return;\n                }\n                // Add student to classroom\n                classroom.students.set(studentId, {\n                    displayName\n                });\n                socket.join(classCode);\n                // Notify all clients in the classroom about the new student\n                io.to(classCode).emit(\"student-joined\", {\n                    studentId,\n                    displayName,\n                    students: Array.from(classroom.students.entries()).map(([id, data])=>({\n                            id,\n                            displayName: data.displayName\n                        }))\n                });\n                // Confirm the display name to the joining student\n                socket.emit(\"name-assigned\", {\n                    displayName\n                });\n            });\n            socket.on(\"draw-update\", (data)=>{\n                const { classCode, studentId, drawData, canvasState } = data;\n                // Broadcast the drawing update to all clients in the classroom\n                socket.to(classCode).emit(\"draw-update-received\", {\n                    studentId,\n                    drawData,\n                    canvasState\n                });\n            });\n            socket.on(\"disconnecting\", ()=>{\n                console.log(\"Client disconnected:\", socket.id);\n                connections.delete(socket.id);\n                // Clean up classrooms data if needed\n                for (const [code, classroom] of classrooms.entries()){\n                    if (classroom.students.has(socket.id)) {\n                        classroom.students.delete(socket.id);\n                        io.to(code).emit(\"student-left\", {\n                            students: Array.from(classroom.students.entries()).map(([id, data])=>({\n                                    id,\n                                    displayName: data.displayName\n                                }))\n                        });\n                        // If no students left and teacher is gone, remove the classroom\n                        if (classroom.students.size === 0 && classroom.teacherId === socket.id) {\n                            classrooms.delete(code);\n                        }\n                    }\n                }\n            });\n        });\n        res.socket.server.io = io;\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n        success: true\n    });\n};\nasync function GET(req) {\n    if (!req.headers.get(\"upgrade\")?.includes(\"websocket\")) {\n        return new Response(\"Expected websocket\", {\n            status: 400\n        });\n    }\n    try {\n        const res = await fetch(req.url, {\n            method: req.method,\n            headers: req.headers\n        });\n        return new Response(null, {\n            status: 101,\n            headers: res.headers\n        });\n    } catch (e) {\n        return new Response(null, {\n            status: 500\n        });\n    }\n}\nasync function POST(req) {\n    return ioHandler(req, req);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU87UUFDdEI7UUFDQSxPQUFPLElBQUlFLFNBQVMsTUFBTTtZQUN4QkMsUUFBUTtZQUNSSCxTQUFTeEMsSUFBSXdDLE9BQU87UUFDdEI7SUFDRixFQUFFLE9BQU9PLEdBQUc7UUFDVixPQUFPLElBQUlMLFNBQVMsTUFBTTtZQUFFQyxRQUFRO1FBQUk7SUFDMUM7QUFDRjtBQUVPLGVBQWVLLEtBQUtqRCxHQUFZO0lBQ3JDLE9BQU9ELFVBQVVDLEtBQUtBO0FBQ3hCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FsbGVyeWJvYXJkLy4vYXBwL2FwaS9zb2NrZXQvaW8vcm91dGUudHM/MjZhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdodHRwJztcclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnc29ja2V0LmlvJztcclxuaW1wb3J0IHsgTmV4dEFwaVJlc3BvbnNlU2VydmVySU8gfSBmcm9tICdAL3R5cGVzL3NvY2tldCc7XHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBydW50aW1lID0gJ25vZGVqcyc7XHJcbmV4cG9ydCBjb25zdCBkeW5hbWljID0gJ2ZvcmNlLWR5bmFtaWMnO1xyXG5cclxuY29uc3QgY2xhc3Nyb29tcyA9IG5ldyBNYXA8c3RyaW5nLCB7XHJcbiAgdGVhY2hlcklkOiBzdHJpbmc7XHJcbiAgc3R1ZGVudHM6IE1hcDxzdHJpbmcsIHsgZGlzcGxheU5hbWU6IHN0cmluZyB9PjtcclxufT4oKTtcclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ2xhc3NDb2RlKCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOCkudG9VcHBlckNhc2UoKTtcclxufVxyXG5cclxuLy8gQ3JlYXRlIGEgbWFwIHRvIHN0b3JlIGFjdGl2ZSBjb25uZWN0aW9uc1xyXG5jb25zdCBjb25uZWN0aW9ucyA9IG5ldyBNYXAoKTtcclxuXHJcbi8vIFNvY2tldC5JTyBoYW5kbGVyXHJcbmNvbnN0IGlvSGFuZGxlciA9IChyZXE6IFJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlU2VydmVySU8pID0+IHtcclxuICBpZiAoIXJlcy5zb2NrZXQuc2VydmVyLmlvKSB7XHJcbiAgICBjb25zdCBodHRwU2VydmVyID0gcmVzLnNvY2tldC5zZXJ2ZXIgYXMgYW55O1xyXG4gICAgY29uc3QgaW8gPSBuZXcgU2VydmVyKGh0dHBTZXJ2ZXIsIHtcclxuICAgICAgcGF0aDogJy9hcGkvc29ja2V0L2lvJyxcclxuICAgICAgYWRkVHJhaWxpbmdTbGFzaDogZmFsc2UsXHJcbiAgICAgIGNvcnM6IHtcclxuICAgICAgICBvcmlnaW46ICcqJyxcclxuICAgICAgICBtZXRob2RzOiBbJ0dFVCcsICdQT1NUJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpby5vbignY29ubmVjdGlvbicsIChzb2NrZXQpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0NsaWVudCBjb25uZWN0ZWQ6Jywgc29ja2V0LmlkKTtcclxuICAgICAgY29ubmVjdGlvbnMuc2V0KHNvY2tldC5pZCwgc29ja2V0KTtcclxuXHJcbiAgICAgIHNvY2tldC5vbignY3JlYXRlLWNsYXNzcm9vbScsICh0ZWFjaGVySWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGxldCBjbGFzc0NvZGU6IHN0cmluZztcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICBjbGFzc0NvZGUgPSBnZW5lcmF0ZUNsYXNzQ29kZSgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGNsYXNzcm9vbXMuaGFzKGNsYXNzQ29kZSkpO1xyXG5cclxuICAgICAgICBjbGFzc3Jvb21zLnNldChjbGFzc0NvZGUsIHtcclxuICAgICAgICAgIHRlYWNoZXJJZCxcclxuICAgICAgICAgIHN0dWRlbnRzOiBuZXcgTWFwKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc29ja2V0LmpvaW4oY2xhc3NDb2RlKTtcclxuICAgICAgICBzb2NrZXQuZW1pdCgnY2xhc3Nyb29tLWNyZWF0ZWQnLCB7IGNsYXNzQ29kZSwgdGVhY2hlcklkIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNvY2tldC5vbignam9pbi1jbGFzc3Jvb20nLCAoZGF0YTogeyBjbGFzc0NvZGU6IHN0cmluZzsgc3R1ZGVudElkOiBzdHJpbmc7IGRpc3BsYXlOYW1lOiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY2xhc3NDb2RlLCBzdHVkZW50SWQsIGRpc3BsYXlOYW1lIH0gPSBkYXRhO1xyXG4gICAgICAgIGNvbnN0IGNsYXNzcm9vbSA9IGNsYXNzcm9vbXMuZ2V0KGNsYXNzQ29kZSk7XHJcblxyXG4gICAgICAgIGlmICghY2xhc3Nyb29tKSB7XHJcbiAgICAgICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCB7IG1lc3NhZ2U6ICdDbGFzc3Jvb20gbm90IGZvdW5kJyB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBzdHVkZW50IHRvIGNsYXNzcm9vbVxyXG4gICAgICAgIGNsYXNzcm9vbS5zdHVkZW50cy5zZXQoc3R1ZGVudElkLCB7IGRpc3BsYXlOYW1lIH0pO1xyXG4gICAgICAgIHNvY2tldC5qb2luKGNsYXNzQ29kZSk7XHJcblxyXG4gICAgICAgIC8vIE5vdGlmeSBhbGwgY2xpZW50cyBpbiB0aGUgY2xhc3Nyb29tIGFib3V0IHRoZSBuZXcgc3R1ZGVudFxyXG4gICAgICAgIGlvLnRvKGNsYXNzQ29kZSkuZW1pdCgnc3R1ZGVudC1qb2luZWQnLCB7XHJcbiAgICAgICAgICBzdHVkZW50SWQsXHJcbiAgICAgICAgICBkaXNwbGF5TmFtZSxcclxuICAgICAgICAgIHN0dWRlbnRzOiBBcnJheS5mcm9tKGNsYXNzcm9vbS5zdHVkZW50cy5lbnRyaWVzKCkpLm1hcCgoW2lkLCBkYXRhXSkgPT4gKHtcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBkYXRhLmRpc3BsYXlOYW1lXHJcbiAgICAgICAgICB9KSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ29uZmlybSB0aGUgZGlzcGxheSBuYW1lIHRvIHRoZSBqb2luaW5nIHN0dWRlbnRcclxuICAgICAgICBzb2NrZXQuZW1pdCgnbmFtZS1hc3NpZ25lZCcsIHsgZGlzcGxheU5hbWUgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc29ja2V0Lm9uKCdkcmF3LXVwZGF0ZScsIChkYXRhOiB7XHJcbiAgICAgICAgY2xhc3NDb2RlOiBzdHJpbmc7XHJcbiAgICAgICAgc3R1ZGVudElkOiBzdHJpbmc7XHJcbiAgICAgICAgZHJhd0RhdGE6IGFueTtcclxuICAgICAgICBjYW52YXNTdGF0ZTogc3RyaW5nO1xyXG4gICAgICB9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBjbGFzc0NvZGUsIHN0dWRlbnRJZCwgZHJhd0RhdGEsIGNhbnZhc1N0YXRlIH0gPSBkYXRhO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEJyb2FkY2FzdCB0aGUgZHJhd2luZyB1cGRhdGUgdG8gYWxsIGNsaWVudHMgaW4gdGhlIGNsYXNzcm9vbVxyXG4gICAgICAgIHNvY2tldC50byhjbGFzc0NvZGUpLmVtaXQoJ2RyYXctdXBkYXRlLXJlY2VpdmVkJywge1xyXG4gICAgICAgICAgc3R1ZGVudElkLFxyXG4gICAgICAgICAgZHJhd0RhdGEsXHJcbiAgICAgICAgICBjYW52YXNTdGF0ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNvY2tldC5vbignZGlzY29ubmVjdGluZycsICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ2xpZW50IGRpc2Nvbm5lY3RlZDonLCBzb2NrZXQuaWQpO1xyXG4gICAgICAgIGNvbm5lY3Rpb25zLmRlbGV0ZShzb2NrZXQuaWQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsZWFuIHVwIGNsYXNzcm9vbXMgZGF0YSBpZiBuZWVkZWRcclxuICAgICAgICBmb3IgKGNvbnN0IFtjb2RlLCBjbGFzc3Jvb21dIG9mIGNsYXNzcm9vbXMuZW50cmllcygpKSB7XHJcbiAgICAgICAgICBpZiAoY2xhc3Nyb29tLnN0dWRlbnRzLmhhcyhzb2NrZXQuaWQpKSB7XHJcbiAgICAgICAgICAgIGNsYXNzcm9vbS5zdHVkZW50cy5kZWxldGUoc29ja2V0LmlkKTtcclxuICAgICAgICAgICAgaW8udG8oY29kZSkuZW1pdCgnc3R1ZGVudC1sZWZ0JywgeyBcclxuICAgICAgICAgICAgICBzdHVkZW50czogQXJyYXkuZnJvbShjbGFzc3Jvb20uc3R1ZGVudHMuZW50cmllcygpKS5tYXAoKFtpZCwgZGF0YV0pID0+ICh7XHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBkYXRhLmRpc3BsYXlOYW1lXHJcbiAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgbm8gc3R1ZGVudHMgbGVmdCBhbmQgdGVhY2hlciBpcyBnb25lLCByZW1vdmUgdGhlIGNsYXNzcm9vbVxyXG4gICAgICAgICAgICBpZiAoY2xhc3Nyb29tLnN0dWRlbnRzLnNpemUgPT09IDAgJiYgY2xhc3Nyb29tLnRlYWNoZXJJZCA9PT0gc29ja2V0LmlkKSB7XHJcbiAgICAgICAgICAgICAgY2xhc3Nyb29tcy5kZWxldGUoY29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVzLnNvY2tldC5zZXJ2ZXIuaW8gPSBpbztcclxuICB9XHJcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBSZXF1ZXN0KSB7XHJcbiAgaWYgKCFyZXEuaGVhZGVycy5nZXQoJ3VwZ3JhZGUnKT8uaW5jbHVkZXMoJ3dlYnNvY2tldCcpKSB7XHJcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdFeHBlY3RlZCB3ZWJzb2NrZXQnLCB7IHN0YXR1czogNDAwIH0pO1xyXG4gIH1cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2gocmVxLnVybCEsIHtcclxuICAgICAgbWV0aG9kOiByZXEubWV0aG9kLFxyXG4gICAgICBoZWFkZXJzOiByZXEuaGVhZGVycyxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7XHJcbiAgICAgIHN0YXR1czogMTAxLFxyXG4gICAgICBoZWFkZXJzOiByZXMuaGVhZGVycyxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHJldHVybiBpb0hhbmRsZXIocmVxLCByZXEgYXMgYW55KTtcclxufSAiXSwibmFtZXMiOlsiU2VydmVyIiwiTmV4dFJlc3BvbnNlIiwicnVudGltZSIsImR5bmFtaWMiLCJjbGFzc3Jvb21zIiwiTWFwIiwiZ2VuZXJhdGVDbGFzc0NvZGUiLCJNYXRoIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsImNvbm5lY3Rpb25zIiwiaW9IYW5kbGVyIiwicmVxIiwicmVzIiwic29ja2V0Iiwic2VydmVyIiwiaW8iLCJodHRwU2VydmVyIiwicGF0aCIsImFkZFRyYWlsaW5nU2xhc2giLCJjb3JzIiwib3JpZ2luIiwibWV0aG9kcyIsIm9uIiwiY29uc29sZSIsImxvZyIsImlkIiwic2V0IiwidGVhY2hlcklkIiwiY2xhc3NDb2RlIiwiaGFzIiwic3R1ZGVudHMiLCJqb2luIiwiZW1pdCIsImRhdGEiLCJzdHVkZW50SWQiLCJkaXNwbGF5TmFtZSIsImNsYXNzcm9vbSIsImdldCIsIm1lc3NhZ2UiLCJ0byIsIkFycmF5IiwiZnJvbSIsImVudHJpZXMiLCJtYXAiLCJkcmF3RGF0YSIsImNhbnZhc1N0YXRlIiwiZGVsZXRlIiwiY29kZSIsInNpemUiLCJqc29uIiwic3VjY2VzcyIsIkdFVCIsImhlYWRlcnMiLCJpbmNsdWRlcyIsIlJlc3BvbnNlIiwic3RhdHVzIiwiZmV0Y2giLCJ1cmwiLCJtZXRob2QiLCJlIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/socket/io/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ws","vendor-chunks/socket.io-parser","vendor-chunks/engine.io-parser","vendor-chunks/@socket.io","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/has-flag","vendor-chunks/engine.io","vendor-chunks/socket.io","vendor-chunks/socket.io-adapter","vendor-chunks/negotiator","vendor-chunks/mime-db","vendor-chunks/vary","vendor-chunks/object-assign","vendor-chunks/mime-types","vendor-chunks/cors","vendor-chunks/cookie","vendor-chunks/base64id","vendor-chunks/accepts"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsocket%2Fio%2Froute&page=%2Fapi%2Fsocket%2Fio%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsocket%2Fio%2Froute.ts&appDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cs3cur%5CDownloads%5Cprojects%5Ceduquest%5Cemoryhacks25&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();