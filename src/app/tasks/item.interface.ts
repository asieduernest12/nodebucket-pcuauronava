/**
 * Title: item.interface.ts
 * Author: Patrick C
 * Date: 08/16/2023
 * Description: Task Item schema
 */

export interface Item {
  _id?: string;
  title: string;
}

export interface Task {
  _id?: string;
  text?: string;
  content?: string;
  done?: boolean;
  empId: number;
  title: string;
}
