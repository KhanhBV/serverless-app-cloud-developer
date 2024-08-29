import 'source-map-support/register'
import { getTodos } from "../../businessLogic/todos";
import { getUserId } from "../utils";


export const handler = async (event) => {
  const userId = getUserId(event);
  if (!userId) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify('The user id is invalid')
    };
  }

  const todoItems = await getTodos(userId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      items: todoItems
    })
  }
};