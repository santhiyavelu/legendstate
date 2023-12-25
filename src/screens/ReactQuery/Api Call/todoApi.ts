import {useQuery} from 'react-query';

export type Todo = {
  todo: string;
};

export const FetchTodos = async () => {
  const res = await fetch('https://dummyjson.com/todos/');

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await res.json();

  const todos: Todo[] = data?.todos || [];
  return todos;
};

export const Usetodos = () => {
  return useQuery(['todos'], FetchTodos);
};
