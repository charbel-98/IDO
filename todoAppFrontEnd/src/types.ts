export type Id = string;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  title: string;
  category: string;
  dueDate: string;
  estimate: string;
  importance: string;
  progress: string;
};

export type TaskItem = {
  id: Id;
  columnId: Id;
  content: Task;
};
