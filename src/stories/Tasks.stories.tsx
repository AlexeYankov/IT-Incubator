import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions';

import { Tasks } from '../components/TasksForTodolist';
import {store} from "../state/store";
import {Provider} from "react-redux";

const baseArgs = {
  task: action('tasksReducer'),
  todolistID: action('todolistReducer'),
}


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'AddTasks/NewTask',
  component: Tasks,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    ...baseArgs,
  },
} as ComponentMeta<typeof Tasks>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tasks> = (args) => <Provider store={store}/><Tasks {...args} /><Provider/>;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
  ...baseArgs,
  task: {id: '1', isDone: true, title: 'ssss'},
  todolistID: 'todolistID1',
}

export const TaskNotIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskNotIsDoneStory.args = {
  ...baseArgs,
  task: {id: '1', isDone: false, title: 'ssss'},
  todolistID: 'todolistID1',
}


