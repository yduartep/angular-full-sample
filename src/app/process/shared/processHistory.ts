export class ProcessHistory {

  processDefinitionId: string;
  processInstanceId: number;
  executionId: number;
  activityId: string;
  activityName: string;
  activityType: string;
  assignee: null;
  startDate: Date;
  endDate: Date;
  duration: number;

  constructor(processDefinitionId: string, processInstanceId: number, executionId: number, activityId: string,
              activityName: string, activityType: string, assignee: any, startDate: Date, endDate: Date,
              duration: number) {
    this.processDefinitionId = processDefinitionId;
    this.processInstanceId = processInstanceId;
    this.executionId = executionId;
    this.activityId = activityId;
    this.activityName = activityName;
    this.activityType = activityType;
    this.assignee = assignee;
    this.startDate = startDate;
    this.endDate = endDate;
    this.duration = duration;
  }

}
