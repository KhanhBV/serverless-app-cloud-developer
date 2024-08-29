import 'source-map-support/register'
import * as uuid from 'uuid'
import { createTodoItem, deleteTodo, getTodoItem, getTodoItems, updateAttachmentUrl, updateTodoItem } from '../dataLayer/todosAccess';
import { getAttachmentUrl, getUploadUrl } from '../fileStorage/attachmentUtils';

export const getTodos = async (userId) => {
    return await getTodoItems(userId);
}

export const createTodo = async (userId, todoRequest) => {
    const todoId = uuid.v4();

    const newItem = {
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        done: false,
        attachmentUrl: null,
        ...todoRequest
    }

    await createTodoItem(newItem);

    return newItem;
}

export const updateTodo = async (userId, todoId, updateTodoRequest) => {
    const todoItem = await getTodoItem(todoId, userId);
    if (!todoItem) {
        throw new Error('Can not find todo item');
    }
    if (todoItem.userId !== userId) {
        throw new Error('User does not have permission');
    }
    await updateTodoItem(todoId, updateTodoRequest);
}

export const deleteTodoItem = async (userId, todoId) => {
    const todoItem = await getTodoItem(todoId, userId);
    if (!todoItem) {
        throw new Error('Can not find todo item');
    }
    if (todoItem.userId !== userId) {
        throw new Error('User does not have permission');
    }

    await deleteTodo(todoId, userId);
}

export const updateTodoAttachmentUrl = async (userId, todoId, attachmentId) => {
    const attachmentUrl = await getAttachmentUrl(attachmentId);

    const todoItem = await getTodoItem(todoId, userId);
    if (!todoItem) {
        throw new Error('Can not find todo item');
    }
    if (todoItem.userId !== userId) {
        throw new Error('User does not have permission');
    }

    await updateAttachmentUrl(userId, todoId, attachmentUrl);
}

export const generateUploadUrl = async (attachmentId) => {
    return await getUploadUrl(attachmentId);
}