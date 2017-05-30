/**
 * Created by Jan Koszela on 26.05.2017.
 */

// Module to require whole directories
var requireDir = require("require-dir");

// Pulling in all tasks from the task folder
requireDir('./gulp/tasks', {recurse: true});