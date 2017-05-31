/**
 * Created by yduartep on 3/2/2017.
 */
module.exports = function () {
  var faker = require("faker");

  return {
    process: [
      {
        id: 1,
        executionId: "1",
        processInstanceId: "1",
        processKey: "testProcess1",
        processDefinitionId: "testProcess:1:15",
        diagramURL: "/image/1",
        tenantId: "",
        latestActivity: {
          id: "theTask1",
          name: "First Task",
          creationDate: 1495720272351
        },
        tasks: [
          {
            id: "34",
            description: "First Task",
            key: "theTask1",
            formKey: "TASK_ONE",
            assignee: null,
            creationDate: 1495720272351
          }
        ],
        processVariables: {
          _ACTIVITI_SKIP_EXPRESSION_ENABLED: false,
          VariableName1: null,
          theTask1_result: "\"NOT_OK\"",
          variableName2: false
        }
      },
      {
        id: 2,
        executionId: "2",
        processInstanceId: "2",
        processKey: "testProcess2",
        processDefinitionId: "testProcess:2:25",
        diagramURL: "/image/2",
        tenantId: "",
        latestActivity: {
          id: "theTask2",
          name: "First Task",
          creationDate: 1495720272351
        },
        tasks: [
          {
            id: "34",
            description: "First Task",
            key: "theTask1",
            formKey: "TASK_ONE",
            assignee: null,
            creationDate: 1495720272351
          }
        ],
        processVariables: {
          _ACTIVITI_SKIP_EXPRESSION_ENABLED: false,
          VariableName1: null,
          theTask1_result: "\"NOT_OK\"",
          variableName2: false
        }
      },
      {
        id: 3,
        executionId: "3",
        processInstanceId: "3",
        processKey: "testProcess3",
        processDefinitionId: "testProcess:3:35",
        diagramURL: "/image/3",
        tenantId: "",
        latestActivity: {
          id: "theTask3",
          name: "First Task",
          creationDate: 1495720272351
        },
        tasks: [
          {
            id: "34",
            description: "First Task",
            key: "theTask1",
            formKey: "TASK_ONE",
            assignee: null,
            creationDate: 1495720272351
          }
        ],
        processVariables: {
          _ACTIVITI_SKIP_EXPRESSION_ENABLED: false,
          VariableName1: null,
          theTask1_result: "\"NOT_OK\"",
          variableName2: false
        }
      },
      {
        id: 4,
        executionId: "4",
        processInstanceId: "4",
        processKey: "testProcess4",
        processDefinitionId: "testProcess:4:45",
        diagramURL: "/image/4",
        tenantId: "",
        latestActivity: {
          id: "theTask4",
          name: "First Task",
          creationDate: 1495720272351
        },
        tasks: [
          {
            id: "34",
            description: "First Task",
            key: "theTask1",
            formKey: "TASK_ONE",
            assignee: null,
            creationDate: 1495720272351
          }
        ],
        processVariables: {
          _ACTIVITI_SKIP_EXPRESSION_ENABLED: false,
          VariableName1: null,
          theTask1_result: "\"NOT_OK\"",
          variableName2: false
        }
      },
      {
        id: 5,
        executionId: "5",
        processInstanceId: "5",
        processKey: "testProcess5",
        processDefinitionId: "testProcess:5:55",
        diagramURL: "/image/5",
        tenantId: "",
        latestActivity: {
          id: "theTask5",
          name: "First Task",
          creationDate: 1495720272351
        },
        tasks: [
          {
            id: "34",
            description: "First Task",
            key: "theTask1",
            formKey: "TASK_ONE",
            assignee: null,
            creationDate: 1495720272351
          }
        ],
        processVariables: {
          _ACTIVITI_SKIP_EXPRESSION_ENABLED: false,
          VariableName1: null,
          theTask1_result: "\"NOT_OK\"",
          variableName2: false
        }
      }
    ],
    history: [
      {
        id: 1,
        processDefinitionId: 'testProcess:1:15',
        processInstanceId: '1',
        executionId: '1',
        activityId: 'startevent1',
        activityName: 'Start',
        activityType: 'startEvent',
        assignee: null,
        startDate: 149571262351,
        endDate: 149571262370,
        duration: 19
      },
      {
        id: 1,
        processDefinitionId: 'testProcess:1:15',
        processInstanceId: '1',
        executionId: '26',
        activityId: 'timerintermediatecatchevent1',
        activityName: 'TimerCatchEvent',
        activityType: 'intermediateTimer',
        assignee: null,
        startDate: 1495720262467,
        endDate: 1495720272342,
        duration: 9875
      },
      {
        id: 1,
        processDefinitionId: 'testProcess:1:15',
        processInstanceId: '1',
        executionId: '29',
        activityId: 'theTask1',
        activityName: 'First Task',
        activityType: 'userTask',
        assignee: null,
        startDate: 1495720272351,
        endDate: null,
        duration: null
      }
    ],
    token: [{
      "id": faker.random.uuid(),
      "access_token": "a61afd98-8e9e-4f16-9366-31abcc0bb522",
      "token_type": "bearer",
      "refresh_token": "2df39865-27c2-41f3-b676-69c9839b9d50",
      "expires_in": 43199,
      "scope": "openid"
    }]
  }
}
