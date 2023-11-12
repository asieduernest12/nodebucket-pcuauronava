/**
 * Title: item.interface.ts
 * Author: Patrick Cuauro
 * Modified by: 
 * Date: 11/11/2023
 * Description: 
 */

export interface Item {
  _id?: string;
  title: string;
}

export interface Task {
  _id?: string;
  content?: string;
  done?: boolean;
  empId: number | undefined;
  title: string;
}
