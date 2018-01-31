
import "core-js/es6/object"
import "core-js/es6/string"
import "core-js/es6/array"
import "core-js/es6/map"
import "core-js/es6/promise"
import "nodelist-foreach-polyfill"
import "requestanimationframe"
import requestIdleCallback from "request-idle-callback"
import objectFitImages from "object-fit-images"

window.requestIdleCallback = window.requestIdleCallback ? window.requestIdleCallback : requestIdleCallback
objectFitImages()