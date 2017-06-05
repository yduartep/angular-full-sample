"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var process_component_1 = require("./process.component");
var process_list_component_1 = require("./process-list/process-list.component");
var process_definition_image_component_1 = require("./process-definition/process-definition-image.component");
var process_detail_component_1 = require("./process-detail/process-detail.component");
var process_detail_variables_component_1 = require("./process-detail/process-detail-variables.component");
var process_detail_tasks_component_1 = require("./process-detail/process-detail-tasks.component");
var process_detail_image_component_1 = require("./process-detail/process-detail-image.component");
exports.processRoutes = [{
        path: '',
        component: process_component_1.ProcessComponent,
        children: [
            {
                path: '',
                component: process_list_component_1.ProcessListComponent,
                children: [
                    { path: 'definition/:id', component: process_definition_image_component_1.ProcessDefinitionImageComponent },
                ]
            },
            {
                path: 'detail/:id',
                component: process_detail_component_1.ProcessDetailComponent,
                children: [
                    { path: 'variables', component: process_detail_variables_component_1.ProcessDetailVariablesComponent },
                    { path: 'tasks', component: process_detail_tasks_component_1.ProcessDetailTasksComponent },
                    { path: 'image', component: process_detail_image_component_1.ProcessDetailImageComponent }
                ]
            }
        ]
    }];
var ProcessRoutingModule = (function () {
    function ProcessRoutingModule() {
    }
    return ProcessRoutingModule;
}());
ProcessRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(exports.processRoutes)],
        exports: [router_1.RouterModule]
    })
], ProcessRoutingModule);
exports.ProcessRoutingModule = ProcessRoutingModule;
exports.processRoutedComponents = [process_component_1.ProcessComponent, process_definition_image_component_1.ProcessDefinitionImageComponent, process_list_component_1.ProcessListComponent, process_detail_component_1.ProcessDetailComponent,
    process_detail_variables_component_1.ProcessDetailVariablesComponent, process_detail_image_component_1.ProcessDetailImageComponent, process_detail_tasks_component_1.ProcessDetailTasksComponent];
