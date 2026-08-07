export interface Task {
  id: string; 
  title: string; 
  description?: string; 
  completed: boolean;
  categoryId: string;  
  categoryColor?: string;
  createdAt: Date; 
  updatedAt: Date; 
}