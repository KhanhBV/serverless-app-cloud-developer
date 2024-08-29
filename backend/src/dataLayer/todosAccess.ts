import 'source-map-support/register'
import * as AWS from 'aws-sdk'

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
const todosTable = process.env.TODOS_TABLE;
const todosByUserIndex = process.env.TODOS_BY_USER_INDEX;

const createDynamodbClient = () => {
    return new XAWS.DynamoDB.DocumentClient();
};

export const getTodoItems = async (userId) => {
    const client = createDynamodbClient();
    const result = await client.query({
        TableName: todosTable,
        IndexName: todosByUserIndex,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    }).promise();

    const items = result.Items;

    return items;
};

export const getTodoItem = async (todoId, userId) => {
    const client = createDynamodbClient();
    const result = await client.query({
        TableName: todosTable,
        KeyConditionExpression: 'userId = :userId and todoId = :todoId',
        ExpressionAttributeValues: {
            ':userId': userId,
            ':todoId': todoId
        }
    }).promise();
    const item = result.Items[0];

    return item;
};

export const createTodoItem = async (todoItem) => {
    const client = createDynamodbClient();
    await client.put({
        TableName: todosTable,
        Item: todoItem,
    }).promise();
};

export const updateTodoItem = async (todoId, todoUpdate) => {
    const client = createDynamodbClient();
    await client.update({
        TableName: todosTable,
        Key: { todoId },
        UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ExpressionAttributeValues: {
            ":name": todoUpdate.name,
            ":dueDate": todoUpdate.dueDate,
            ":done": todoUpdate.done
        }
    }).promise();
};

export const deleteTodo = async (todoId, userId) => {
    const client = createDynamodbClient();
    await client.delete({
        TableName: todosTable,
        Key: { userId, todoId }
    }).promise();
};

export const updateAttachmentUrl = async (userId, todoId, attachmentUrl) => {
    const client = createDynamodbClient();
    await client.update({
        TableName: todosTable,
        Key: {
            userId: userId,
            todoId: todoId
        },
        UpdateExpression: 'set #attachmentUrl = :attachmentUrl',
        ExpressionAttributeNames: {
            '#attachmentUrl': 'attachmentUrl'
        },
        ExpressionAttributeValues: {
            ':attachmentUrl': attachmentUrl
        },
        ReturnValues: 'ALL_NEW'
    }).promise();
};