import 'source-map-support/register'
import { createTodo } from "../../businessLogic/todos";
import { getUserId } from "../utils";

export const handler = async (event) => {
  const newItem = JSON.parse(event.body);
  if (!newItem) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify('The request is invalid ')
    };
  }

  const userId = getUserId(event);
  if (!userId) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify('The UserId is invalid')
    };
  }

  const newTodoItem = await createTodo(userId, newItem);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newTodoItem
    })
  }
};