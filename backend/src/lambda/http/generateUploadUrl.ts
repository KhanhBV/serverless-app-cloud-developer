import 'source-map-support/register'
import { generateUploadUrl, updateTodoAttachmentUrl } from "../../businessLogic/todos";
import { getUserId } from "../utils";
import * as uuid from 'uuid'


export const handler = async (event) => {
  const id = event.pathParameters.todoId;
  if (!id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify('The todo item id is invalid')
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
      body: JSON.stringify('The user id invalid')
    };
  }

  const attachmentId = uuid.v4();

  const uploadUrl = await generateUploadUrl(attachmentId);

  await updateTodoAttachmentUrl(userId, id, attachmentId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: uploadUrl
    })
  }
};