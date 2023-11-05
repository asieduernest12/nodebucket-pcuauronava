/**
 * Title: item.interface.ts
 * Author: Patrick C
 * Date: 08/16/2023
 * Description: Task Item schema
 */

export interface Category {
  categoryName: string;
  backgroundColor: string;
}

export interface Task {
  _id?: string;
  text?: string;
  category?: Category;
  content?: string;
  done?: boolean;
  empId: number;
  title: string;
}
