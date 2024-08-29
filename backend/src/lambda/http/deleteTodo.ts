import 'source-map-support/register'
import { deleteTodoItem } from "../../businessLogic/todos";
import { getUserId } from "../utils";

export const handler = async (event) => {

  const id = event.pathParameters.todoId;
  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify('The todo item is invalid')
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
      body: JSON.stringify('The userId is invalid')
    };
  }

  await deleteTodoItem(userId, id);

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify('')
  }
};