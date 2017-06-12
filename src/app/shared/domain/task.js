"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = (function () {
    function Task(id, description, key, formKey, assignee, creationDate) {
        this.id = id;
        this.description = description;
        this.key = key;
        this.formKey = formKey;
        this.assignee = assignee;
        this.creationDate = creationDate;
    }
    return Task;
}());
exports.Task = Task;
